import { useEffect, useMemo, useState } from "react";
import { capitalizeWord } from "../utils/text";

const splitMnemonicParagraphs = (value = "") =>
  String(value)
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);

const isRichMnemonicDetails = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const renderList = (items = []) => (
  <ul className="mnemonic-rich-list">
    {items.map((item) => (
      <li key={`${item.label}-${item.text}`}>
        <span>
          <strong>{item.label}:</strong> {item.text}
        </span>
        {item.note ? <div className="mnemonic-rich-note">{item.note}</div> : null}
      </li>
    ))}
  </ul>
);

const MnemonicPanel = ({ word }) => {
  const [isOpen, setIsOpen] = useState(false);

  const richDetails = isRichMnemonicDetails(word.mnemonicDetails)
    ? word.mnemonicDetails
    : null;

  const hasExpandedDetails =
    Boolean(richDetails) ||
    (typeof word.mnemonicDetails === "string" &&
      word.mnemonicDetails !== word.mnemonic);

  const detailParagraphs = useMemo(
    () =>
      splitMnemonicParagraphs(
        typeof word.mnemonicDetails === "string"
          ? word.mnemonicDetails || word.mnemonic
          : word.mnemonic,
      ),
    [word.mnemonic, word.mnemonicDetails],
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

  return (
    <>
      <div className="detail-block mnemonic-block">
        <div className="mnemonic-block-head">
          <strong>Мнемотехника:</strong>
          <button
            type="button"
            className="mnemonic-more-button"
            onClick={() => setIsOpen(true)}
          >
            {richDetails ? "Полная версия" : "Подробнее"}
          </button>
        </div>
        <p>{word.mnemonic}</p>
      </div>

      {isOpen ? (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="modal-card mnemonic-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`mnemonic-title-${word.id}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-head">
              <div className="modal-title-block">
                <span className="chip chip-accent">Мнемотехника</span>
                <h3 id={`mnemonic-title-${word.id}`}>
                  {capitalizeWord(word.word)}
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

            <div className="modal-body mnemonic-modal-body">
              {richDetails ? (
                <>
                  {richDetails.lead || richDetails.intro ? (
                    <p className="mnemonic-rich-intro">
                      {richDetails.lead || richDetails.intro}
                    </p>
                  ) : null}

                  {richDetails.phonetic?.length ? (
                    <div className="mnemonic-modal-section">
                      <strong>
                        {richDetails.phoneticTitle || "Фонетическая привязка"}
                      </strong>
                      {renderList(richDetails.phonetic)}
                    </div>
                  ) : null}

                  {richDetails.story ? (
                    <div className="mnemonic-modal-section">
                      <strong>{richDetails.storyTitle || "Сюжет / Фраза"}</strong>
                      <div className="mnemonic-paragraphs">
                        {Array.isArray(richDetails.story) ? (
                          richDetails.story.map((part) => <p key={part}>{part}</p>)
                        ) : (
                          <p>{richDetails.story}</p>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {richDetails.hooks?.length ? (
                    <div className="mnemonic-modal-section">
                      <strong>{richDetails.hooksTitle || "Ассоциации"}</strong>
                      {renderList(richDetails.hooks)}
                    </div>
                  ) : null}

                  {richDetails.visual ? (
                    <div className="mnemonic-modal-section">
                      <strong>
                        {richDetails.visualTitle || "Визуальный образ"}
                      </strong>
                      <p>{richDetails.visual}</p>
                    </div>
                  ) : null}

                  {richDetails.reinforceText || richDetails.linkText ? (
                    <div className="mnemonic-modal-section">
                      <strong>
                        {richDetails.linkText
                          ? richDetails.linkTitle || "Связка"
                          : richDetails.reinforceTitle || "Закрепление"}
                      </strong>
                      <div className="mnemonic-rich-card">
                        {richDetails.linkLabel || richDetails.reinforceLabel ? (
                          <strong>
                            {richDetails.linkLabel || richDetails.reinforceLabel}
                          </strong>
                        ) : null}
                        <p>{richDetails.linkText || richDetails.reinforceText}</p>
                      </div>
                    </div>
                  ) : null}

                  {richDetails.note ? (
                    <div className="mnemonic-modal-section">
                      <strong>{richDetails.noteTitle || "Контекст"}</strong>
                      <p>{richDetails.note}</p>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="mnemonic-modal-section">
                    <strong>Короткая версия</strong>
                    <p>{word.mnemonic}</p>
                  </div>

                  <div className="mnemonic-modal-section">
                    <strong>
                      {hasExpandedDetails ? "Развёрнутая версия" : "Подробности"}
                    </strong>
                    <div className="mnemonic-paragraphs">
                      {detailParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MnemonicPanel;
