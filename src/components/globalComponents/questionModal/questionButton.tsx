import { useState } from "react"
import QuestionModal from "./questionModal";


export default function QuestionButton():JSX.Element {

const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => {setIsModalOpen(true)}} className="question__button">
        <span >?</span>
      </button>
      {isModalOpen && (
        <QuestionModal onClose={() => setIsModalOpen(false)}/>
      )}
    </>
  );
}