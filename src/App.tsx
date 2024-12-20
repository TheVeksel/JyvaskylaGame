import QuestionButton from "./components/globalComponents/questionModal/questionButton";
import Intro from "./components/Screens/introScreen";
import LanguageSwitcher from "./components/globalComponents/languageSwitcher";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import EndGame from "./components/globalComponents/endGame";
import FactsScreen from "./components/Screens/factsScreen";
import QuizScreen from "./components/Screens/quizScreen";

function App() {
  const currentScreen = useSelector(
    (state: RootState) => state.screen.currentScreen
  );

  return (
    <>
      <main className="content">
        <div className="app">
          <LanguageSwitcher />
          <QuestionButton />
          <EndGame />
          {currentScreen === "intro" && <Intro />}
          {currentScreen === "facts" && <FactsScreen />}
          {currentScreen === "quiz" && <QuizScreen />}
        </div>
      </main>
    </>
  );
}

export default App;
