import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getIntroText } from "../../services/introService";
import { setScreen } from "../../store/features/screenSlice";

type IntroText = { title: string; buttonText: string };

export default function Intro(): JSX.Element {
  const [content, setContent] = useState<IntroText | null>(null);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const dispatch = useDispatch();

  const startGame = () => {
    dispatch(setScreen("facts"));
  };

  useEffect(() => {
    getIntroText(1, currentLanguage)
      .then((data) => setContent(data))
      .catch((err) => console.error("Failed to load", err));
  }, [currentLanguage]);

  return (
    <section className="intro">
      <div className="intro__1row">
        <div className="intro__kid-img">
          <img src="/images/introImages/boy.png" alt="boy" />
        </div>
        <h1 className="intro__title">{content?.title}</h1>
        <div className="intro__kid-img">
          <img src="/images/introImages/girl.png" alt="girl" />
        </div>
      </div>
      <div className="intro__2row">
        <img
          className="intro__2row-townimg"
          src="/images/introImages/town.png"
          alt="town"
        />
      </div>
      <div className="intro__3row">
        <button onClick={startGame} className="intro__3row-button">
          {content?.buttonText}
        </button>
      </div>
    </section>
  );
}
