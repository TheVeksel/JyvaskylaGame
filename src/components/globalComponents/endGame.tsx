import { useDispatch } from "react-redux";
import { setScreen } from "../../store/features/screenSlice";

export default function EndGame():JSX.Element {

  const dispatch = useDispatch();

  const endGame = () => {
    dispatch(setScreen("intro"))
  }

  return (
    <>
    <div className="endgame-cross"><button onClick={endGame}>x</button></div>
    </>
  )
}