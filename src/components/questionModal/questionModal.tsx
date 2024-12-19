import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getLocalizedDescription } from "../../services/descriptionService";

type QuestionModalProps = { onClose: () => void;};
type LocalizedContent = { title: string; content: string };

export default function QuestionModal({
  onClose,
}: QuestionModalProps): JSX.Element {
  const [content, setContent] = useState<LocalizedContent | null>(null);
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getLocalizedDescription(1, currentLanguage)
    .then((data) => setContent(data))
    .catch((err) => console.error("Failed to load", err));
  }, [currentLanguage]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  if (!content) return <></>;

  return (
    <div className="modal" ref={modalRef}>
      <button className="modal__closebutton" onClick={onClose}>
        x
      </button>
      <div className="modal__content">
        <h2
          style={{
            marginBottom: "20px",
            textAlign: "center",
            fontSize: "36px",
          }}
        >
          {content.title}
        </h2>
        <p style={{marginBottom: "120px"}}>{content.content}</p>
        <div style={{color: "black"}}>
          <p>Icons by https://www.flaticon.com/</p>
          <p>Images by DALL·E</p>
        </div>
      </div>
    </div>
  );
}
