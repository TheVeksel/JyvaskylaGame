import { useEffect, useState } from "react";
import { getQuizContent, Quiz } from "../../services/quizService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function QuizScreen(): JSX.Element {
  const messages = {
    en: {
      good: "Good job!",
      bad: "You can do better!",
      Score: "Your score is:",
      tryAgain: "Try again",
      happyImage: "/images/quizImages/Happykid.png",
      sadImage: "/images/quizImages/Sadkid.png",
    },
    ru: {
      good: "Хорошая работа!",
      bad: "Ты можешь лучше!",
      Score: "Твой результат:",
      tryAgain: "Попробуй снова",
      happyImage: "/images/quizImages/Happykid.png",
      sadImage: "/images/quizImages/Sadkid.png",
    },
    fi: {
      good: "Hyvä työ!",
      bad: "Voit tehdä paremmin!",
      Score: "Pisteesi on:",
      tryAgain: "Yritä uudelleen",
      happyImage: "/images/quizImages/Happykid.png",
      sadImage: "/images/quizImages/Sadkid.png",
    },
    uk: {
      good: "Добра робота!",
      bad: "Ти можеш краще!",
      Score: "Твiй результат:",
      tryAgain: "Спробуй ще раз",
      happyImage: "/images/quizImages/Happykid.png",
      sadImage: "/images/quizImages/Sadkid.png",
    },
  };

  const [questions, setQuestions] = useState<Quiz[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | "none">("none");

  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const correctSound = new Audio("/audio/right.mp3");
  const incorrectSound = new Audio("/audio/wrong.mp3");

  correctSound.volume = 0.08;
  incorrectSound.volume = 0.08;

  useEffect(() => {
    getQuizContent(currentLanguage).then((data) => {
      setQuestions(data);
    });
  }, [currentLanguage]);

  if (!questions || questions.length === 0) {
    return <></>;
  }

  const currentQuiz = questions[currentQuestion];
  const { question, options, title, type } = currentQuiz;

  const handleAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAnswerStatus("correct");
      correctSound.play();
    } else {
      setAnswerStatus("incorrect");
      incorrectSound.play();
    }

    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 1750);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    const isGoodJob = score >= questions.length / 2;
    const resultMessage = isGoodJob
      ? messages[currentLanguage].good
      : messages[currentLanguage].bad;

    const image = isGoodJob
      ? messages[currentLanguage].happyImage
      : messages[currentLanguage].sadImage;

    return (
      <div className="quiz__result">
        <h2 className="quiz__result-title">{resultMessage}</h2>
        <img
          className="quiz__result-img"
          src={image}
          alt={isGoodJob ? "Happy child" : "Sad child"}
        />
        <h2 className="quiz__result-text">
          {messages[currentLanguage].Score} {score}
        </h2>
        <button onClick={restart} className="quiz__result-button">
          {messages[currentLanguage].tryAgain}
        </button>
      </div>
    );
  }

  return (
    <div className="quiz">
      {showOverlay && (
        <div className={`quiz__overlay ${showOverlay ? "show" : ""}`}>
          <div className={`icon ${answerStatus}`}>
            {answerStatus === "correct" ? (
              <img
                className={`${showOverlay ? "show" : ""}`}
                src="/images/quizImages/right.png"
                alt="Correct"
              />
            ) : (
              <img
                className={`${showOverlay ? "show" : ""}`}
                src="/images/quizImages/wrong.png"
                alt="Incorrect"
              />
            )}
          </div>
        </div>
      )}

      <div className="quiz__content">
        <h2 className="quiz__content-title">{title}</h2>
        <div className="quiz__content-question">
          <img
            className="quiz__content-question-kid"
            src="/images/quizImages/Kid.png"
            alt="Kid"
          />
          <p>{question}</p>
        </div>
        {type === "true_false" && (
        <div className="quiz__options">
          <button
            onClick={() => handleAnswer(options[1])}
            className="quiz__button-true"
          >
            {options[1]}
          </button>
          <button
            onClick={() => handleAnswer(options[0])}
            className="quiz__button-false"
          >
            {options[0]}
          </button>
        </div>
        )}
        {type === "choose_right_answer" && (
          <div className="quiz__options-choose">
          <button
            onClick={() => handleAnswer(options[0])}
            className="quiz__button-choose"
          >
            {options[0]}
          </button>
          <button
            onClick={() => handleAnswer(options[1])}
            className="quiz__button-choose"
          >
            {options[1]}
          </button>
          <button
            onClick={() => handleAnswer(options[2])}
            className="quiz__button-choose"
          >
            {options[2]}
          </button>
        </div>
        )}
      </div>
    </div>
  );
}