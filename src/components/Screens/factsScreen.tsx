import { useEffect, useState } from "react";
import { getFactsContent } from "../../services/factsService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Facts } from "../../services/factsService";
import { setScreen } from "../../store/features/screenSlice";

export default function FactsScreen(): JSX.Element {
  const buttonText = {
    en: {
      textNext: "Next",
      textPrev: "Prev",
      StartTest:"Start Test",
    },
    ru: {
      textNext: "Вперед",
      textPrev: "Назад",
      StartTest:"Начать тест",
    },
    fi: {
      textNext: "Eteenpäin",
      textPrev: "Taaksepäin",
      StartTest:"Aloita testi",
    },
    uk: {
      textNext: "Вперед",
      textPrev: "Назад",
      StartTest:"Розпочати тест",
    },
  }

  const [facts, setFacts] = useState<Facts[]>([]);
  const [currentFact, setCurrentFact] = useState<number>(0);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const dispatch = useDispatch();

  const startTest = () => {
      dispatch(setScreen("quiz"));
    };

  useEffect(() => {
    getFactsContent(currentLanguage).then((data) => {
      setFacts(data);
    });
  }, [currentLanguage]);

  const handleNext = () => {
    if (currentFact < facts.length - 1) {
      setCurrentFact((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentFact > 0) {
      setCurrentFact((prev) => prev - 1);
    }
  };

  const currentSlide = facts[currentFact];
  if (!currentSlide) {
    return <></>;
  }

  const { title, text, imgURL } = currentSlide;

  return (
    <div className="facts">
      <div className="facts__content">
        <div className="facts__content-title">{title}</div>
        <div className="facts__content-text">{text}</div>
        <div className="facts__content-img">
          <img src={imgURL} alt="img" />
        </div>
      </div>
      <div className="facts__button-box">
        {currentFact !== 0 && (
          <button className="prev" onClick={handlePrev}>
            <p className="btn-text">{buttonText[currentLanguage].textPrev}</p>
          </button>
        )}
        {currentFact < facts.length - 1 && (
          <button className="next" onClick={handleNext}>
            <p className="btn-text">{buttonText[currentLanguage].textNext}</p>
          </button>
        )}
        {currentFact === facts.length - 1 && (
          <button className="next" onClick={startTest}>
            <p className="btn-text-test">{buttonText[currentLanguage].StartTest}</p>
          </button>
        )}
      </div>
    </div>
  );
}
