import { useMemo, useState } from "react";
import { findWordByText } from "../utils/customWords";
import { capitalizeWord } from "../utils/text";

const cleanLookupText = (value = "") =>
  value
    .trim()
    .replace(/[.,!?;:"“”'()]/g, "")
    .replace(/\s+/g, " ");

const createVideoExample = (word) => ({
  example: `I heard the word "${word}" in the video.`,
  exampleTranslation: `Я услышал слово "${word}" в видео.`,
  workExample: `I want to remember the word "${word}" after listening practice.`,
  workExampleTranslation: `Я хочу запомнить слово "${word}" после практики аудирования.`,
  mnemonic: `Это слово добавлено из видео. Свяжи "${word}" с моментом, где ты услышал его в ролике.`,
});

const VideoWordTranslator = ({
  addCustomWord,
  addWordToTodayLearning,
  wordsProgress,
}) => {
  const [query, setQuery] = useState("");
  const [manualTranslation, setManualTranslation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const lookupQuery = cleanLookupText(query);
  const foundWord = useMemo(
    () => findWordByText(wordsProgress, lookupQuery),
    [lookupQuery, wordsProgress],
  );
  const canCreate = lookupQuery && !foundWord && manualTranslation.trim();

  const resetMessages = () => {
    setMessage("");
    setError("");
  };

  const handleAddFoundWord = () => {
    if (!foundWord) {
      return;
    }

    addWordToTodayLearning(foundWord.id);
    setMessage("Слово добавлено в сегодняшние новые слова.");
    setError("");
  };

  const handleCreateWord = () => {
    if (!lookupQuery || !manualTranslation.trim()) {
      setError("Введи слово и перевод.");
      setMessage("");
      return;
    }

    const duplicate = findWordByText(wordsProgress, lookupQuery);
    if (duplicate) {
      addWordToTodayLearning(duplicate.id);
      setMessage("Слово уже есть в базе и добавлено на сегодня.");
      setError("");
      return;
    }

    const examples = createVideoExample(lookupQuery);
    addCustomWord({
      word: lookupQuery,
      translation: manualTranslation.trim(),
      category: "Custom",
      level: "A1",
      ...examples,
    });
    setMessage("Слово создано и добавлено в новые слова на сегодня.");
    setError("");
    setManualTranslation("");
  };

  return (
    <div className="video-translator">
      <div className="video-translator-head">
        <strong>Переводчик по видео</strong>
        <span>Услышал незнакомое слово - введи его здесь.</span>
      </div>

      <div className="video-translator-form">
        <input
          className="text-input video-translator-input"
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            resetMessages();
          }}
          placeholder="Например: ticket"
          autoCapitalize="none"
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      {lookupQuery ? (
        <div className="video-translator-result">
          {foundWord ? (
            <>
              <div>
                <span className="muted">Перевод:</span>
                <strong>
                  {capitalizeWord(foundWord.word)} - {foundWord.translation}
                </strong>
                <span className="transcription-text">{foundWord.transcription}</span>
              </div>
              <button
                type="button"
                className="button button-secondary"
                onClick={handleAddFoundWord}
              >
                Учить сегодня
              </button>
            </>
          ) : (
            <>
              <div className="video-translator-manual">
                <span className="muted">В словаре пока нет. Введи перевод:</span>
                <input
                  className="text-input video-translator-input"
                  type="text"
                  value={manualTranslation}
                  onChange={(event) => {
                    setManualTranslation(event.target.value);
                    resetMessages();
                  }}
                  placeholder="перевод на русский"
                />
              </div>
              <button
                type="button"
                className="button button-secondary"
                onClick={handleCreateWord}
                disabled={!canCreate}
              >
                Добавить в словарь
              </button>
            </>
          )}
        </div>
      ) : null}

      {message ? <p className="success-text">{message}</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
};

export default VideoWordTranslator;
