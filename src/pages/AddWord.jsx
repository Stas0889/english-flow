import { useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import AudioButton from "../components/AudioButton";
import { findWordByText } from "../utils/customWords";
import { capitalizeWord } from "../utils/text";

const CATEGORY_OPTIONS = [
  "Custom",
  "Basic A1",
  "Client Communication",
  "Webflow",
  "Design",
];

const LEVEL_OPTIONS = ["A1", "A2", "B1", "B2", "C1"];

const createInitialForm = (word = "") => ({
  word,
  translation: "",
  transcription: "",
  category: "Custom",
  level: "A1",
  example: "",
  exampleTranslation: "",
  workExample: "",
  workExampleTranslation: "",
  mnemonic: "",
});

const AddWord = () => {
  const {
    addCustomWord,
    addWordToTodayLearning,
    settings,
    wordsProgress,
  } = useOutletContext();
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(createInitialForm());
  const [createdWord, setCreatedWord] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const foundWord = useMemo(
    () => findWordByText(wordsProgress, query),
    [query, wordsProgress],
  );

  const normalizedQuery = query.trim();
  const canCreate = normalizedQuery && !foundWord;

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
    setMessage("");
  };

  const startManualCreate = () => {
    setForm((current) => ({
      ...createInitialForm(normalizedQuery),
      translation: current.translation,
      category: current.category || "Custom",
      level: current.level || "A1",
    }));
    setCreatedWord(null);
    setError("");
    setMessage("");
  };

  const handleReviewNow = (wordId) => {
    addWordToTodayLearning(wordId);
    setMessage("Слово добавлено в новые слова на сегодня.");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const wordText = form.word.trim();
    const translation = form.translation.trim();
    const duplicate = findWordByText(wordsProgress, wordText);

    if (!wordText || !translation) {
      setError("Заполни слово и перевод.");
      return;
    }

    if (duplicate) {
      setError("Такое слово уже есть в словаре. Добавь его в новые слова кнопкой выше.");
      setQuery(wordText);
      return;
    }

    const nextWord = addCustomWord({
      ...form,
      word: wordText,
      translation,
    });

    setCreatedWord(nextWord);
    setQuery(wordText);
    setForm(createInitialForm());
    setMessage("Слово создано и добавлено в новые слова на сегодня.");
  };

  return (
    <section className="stack">
      <div className="page-hero page-hero-compact">
        <div>
          <p className="page-kicker">Свой словарь</p>
          <h2>Добавить слово</h2>
          <p className="page-hero-text">
            Сначала проверь, есть ли слово в базе. Если есть, можно сразу
            отправить его в повторение. Если нет, добавь свою карточку вручную.
          </p>
        </div>
      </div>

      <div className="add-word-layout">
        <article className="card">
          <div className="section-head">
            <div>
              <h3>Проверка слова</h3>
              <p className="muted">Введи английское слово или русский перевод.</p>
            </div>
          </div>

          <label className="field-label" htmlFor="word-search">
            Слово
          </label>
          <input
            id="word-search"
            className="text-input"
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCreatedWord(null);
              setMessage("");
              setError("");
            }}
            placeholder="Например: invoice или счёт"
          />

          {foundWord ? (
            <div className="found-word-card">
              <div className="card-head">
                <div>
                  <div className="chip-row">
                    <span className="chip chip-accent">{foundWord.category}</span>
                    <span className="chip">
                      {foundWord.source === "custom" ? "Твоё слово" : "Есть в базе"}
                    </span>
                  </div>
                  <h3>{capitalizeWord(foundWord.word)}</h3>
                  <p className="muted">{foundWord.translation}</p>
                  <p className="transcription-text">{foundWord.transcription}</p>
                </div>
                <AudioButton
                  text={foundWord.audioText || foundWord.word}
                  accent={settings.voiceAccent}
                />
              </div>

              <div className="button-row">
                <button
                  type="button"
                  className="button"
                  onClick={() => handleReviewNow(foundWord.id)}
                >
                  Учить сегодня
                </button>
                <Link to="/learn" className="button button-secondary">
                  К новым словам
                </Link>
              </div>
            </div>
          ) : normalizedQuery ? (
            <div className="empty-inline">
              <strong>Слова нет в базе</strong>
              <p className="muted">
                Можно создать свою карточку. Позже сюда можно подключить GPT/Gemini,
                чтобы поля заполнялись автоматически.
              </p>
              <button
                type="button"
                className="button button-secondary"
                onClick={startManualCreate}
              >
                Создать карточку
              </button>
            </div>
          ) : null}

          {message ? <p className="success-text">{message}</p> : null}
          {error ? <p className="error-text">{error}</p> : null}
        </article>

        <article className="card">
          <div className="section-head">
            <div>
              <h3>Новая карточка</h3>
              <p className="muted">
                Минимум: слово и перевод. Остальные поля можно заполнить сразу
                или оставить как простую заготовку.
              </p>
            </div>
          </div>

          <form className="custom-word-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label className="field-label">
                Английское слово
                <input
                  className="text-input"
                  type="text"
                  value={form.word}
                  onChange={(event) => updateForm("word", event.target.value)}
                  placeholder="negotiate"
                />
              </label>

              <label className="field-label">
                Перевод
                <input
                  className="text-input"
                  type="text"
                  value={form.translation}
                  onChange={(event) =>
                    updateForm("translation", event.target.value)
                  }
                  placeholder="вести переговоры"
                />
              </label>

              <label className="field-label">
                Транскрипция
                <input
                  className="text-input"
                  type="text"
                  value={form.transcription}
                  onChange={(event) =>
                    updateForm("transcription", event.target.value)
                  }
                  placeholder="/nɪˈɡoʊʃieɪt/"
                />
              </label>

              <label className="field-label">
                Категория
                <select
                  className="text-input"
                  value={form.category}
                  onChange={(event) => updateForm("category", event.target.value)}
                >
                  {CATEGORY_OPTIONS.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field-label">
                Уровень
                <select
                  className="text-input"
                  value={form.level}
                  onChange={(event) => updateForm("level", event.target.value)}
                >
                  {LEVEL_OPTIONS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="field-label">
              Простое предложение
              <input
                className="text-input"
                type="text"
                value={form.example}
                onChange={(event) => updateForm("example", event.target.value)}
                placeholder='I need to negotiate today.'
              />
            </label>

            <label className="field-label">
              Перевод простого предложения
              <input
                className="text-input"
                type="text"
                value={form.exampleTranslation}
                onChange={(event) =>
                  updateForm("exampleTranslation", event.target.value)
                }
                placeholder="Мне нужно вести переговоры сегодня."
              />
            </label>

            <label className="field-label">
              Рабочий пример
              <input
                className="text-input"
                type="text"
                value={form.workExample}
                onChange={(event) =>
                  updateForm("workExample", event.target.value)
                }
                placeholder="I will negotiate the final scope with the client."
              />
            </label>

            <label className="field-label">
              Перевод рабочего примера
              <input
                className="text-input"
                type="text"
                value={form.workExampleTranslation}
                onChange={(event) =>
                  updateForm("workExampleTranslation", event.target.value)
                }
                placeholder="Я обсужу финальный объём работ с клиентом."
              />
            </label>

            <label className="field-label">
              Мнемотехника
              <textarea
                className="text-input"
                rows="4"
                value={form.mnemonic}
                onChange={(event) => updateForm("mnemonic", event.target.value)}
                placeholder="Короткая ассоциация для запоминания слова."
              />
            </label>

            <div className="button-row">
              <button type="submit" className="button">
                Добавить и учить сегодня
              </button>
              {createdWord ? (
                <Link to="/learn" className="button button-secondary">
                  Открыть новые слова
                </Link>
              ) : null}
            </div>
          </form>
        </article>
      </div>
    </section>
  );
};

export default AddWord;
