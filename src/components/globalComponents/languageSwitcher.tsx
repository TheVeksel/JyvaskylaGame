import { useDispatch } from "react-redux";
import { Language, setLanguage } from "../../store/features/languageSlice";

export default function LanguageSwitcher():JSX.Element {
  const dispatch = useDispatch();

  const changeLanguage = (lang: Language) => {
    dispatch(setLanguage(lang));
  }
  
  return(
    <div className="language__box">
      <button onClick={() => changeLanguage("fi")} className="language__box-switch"><img src="/images/languageIcons/fi.png" alt="fi" /></button>
      <button onClick={() => changeLanguage("ru")} className="language__box-switch"><img src="/images/languageIcons/ru.png" alt="ru" /></button>
      <button onClick={() => changeLanguage("uk")} className="language__box-switch"><img src="/images/languageIcons/ua.png" alt="uk" /></button>
      <button onClick={() => changeLanguage("en")} className="language__box-switch"><img src="/images/languageIcons/eng.png" alt="en" /></button>
    </div>
  )
}