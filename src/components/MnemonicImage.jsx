import { useEffect, useMemo, useState } from "react";
import { capitalizeWord } from "../utils/text";

const resolveAssetUrl = (path = "") => {
  if (!path) {
    return "";
  }

  if (/^(https?:|data:|blob:)/.test(path)) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
};

const MnemonicImage = ({ word }) => {
  const [isOpen, setIsOpen] = useState(false);
  const imageSrc = useMemo(
    () => resolveAssetUrl(word.mnemonicImage),
    [word.mnemonicImage],
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!imageSrc) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="mnemonic-image-button"
        onClick={() => setIsOpen(true)}
        aria-label={`Открыть мнемокартинку для слова ${word.word}`}
      >
        <img
          src={imageSrc}
          alt={word.mnemonicImageAlt || `Мнемокартинка ${word.word}`}
          loading="lazy"
        />
        <span>Картинка-визуализация</span>
      </button>

      {isOpen ? (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="modal-card mnemonic-image-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`mnemonic-image-title-${word.id}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-head">
              <div className="modal-title-block">
                <span className="chip chip-accent">Мнемокартинка</span>
                <h3 id={`mnemonic-image-title-${word.id}`}>
                  {capitalizeWord(word.word)} - {word.translation}
                </h3>
              </div>
              <button
                type="button"
                className="icon-button modal-close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Закрыть окно"
              >
                ×
              </button>
            </div>

            <div className="modal-body mnemonic-image-modal-body">
              <img
                src={imageSrc}
                alt={word.mnemonicImageAlt || `Мнемокартинка ${word.word}`}
              />
              <p>{word.mnemonicImageDescription || word.mnemonic}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MnemonicImage;
