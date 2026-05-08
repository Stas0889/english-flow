import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import VIDEOS_DATA from "../data/videos";
import { getTodayDateKey } from "../utils/dates";

const allFilter = "all";

const getProgressMap = (progress) =>
  progress && typeof progress === "object" && !Array.isArray(progress)
    ? progress
    : {};

const Videos = () => {
  const { videoProgress, setVideoProgress } = useOutletContext();
  const [levelFilter, setLevelFilter] = useState(allFilter);
  const [topicFilter, setTopicFilter] = useState(allFilter);
  const [showHidden, setShowHidden] = useState(false);

  const progressMap = useMemo(
    () => getProgressMap(videoProgress),
    [videoProgress],
  );

  const levels = useMemo(
    () => Array.from(new Set(VIDEOS_DATA.map((video) => video.level))),
    [],
  );
  const topics = useMemo(
    () => Array.from(new Set(VIDEOS_DATA.map((video) => video.topic))),
    [],
  );

  const visibleVideos = useMemo(
    () =>
      VIDEOS_DATA.filter((video) => {
        const state = progressMap[video.id] ?? {};

        if (!showHidden && state.hidden) {
          return false;
        }

        return (
          (levelFilter === allFilter || video.level === levelFilter) &&
          (topicFilter === allFilter || video.topic === topicFilter)
        );
      }),
    [levelFilter, progressMap, showHidden, topicFilter],
  );

  const watchedCount = VIDEOS_DATA.filter(
    (video) => progressMap[video.id]?.watched,
  ).length;
  const hiddenCount = VIDEOS_DATA.filter(
    (video) => progressMap[video.id]?.hidden,
  ).length;

  const updateVideo = (videoId, patch) => {
    setVideoProgress((current) => {
      const currentMap = getProgressMap(current);

      return {
        ...currentMap,
        [videoId]: {
          ...(currentMap[videoId] ?? {}),
          ...patch,
        },
      };
    });
  };

  const markWatched = (videoId, shouldHide = false) => {
    updateVideo(videoId, {
      watched: true,
      watchedAt: getTodayDateKey(),
      hidden: shouldHide,
    });
  };

  return (
    <section className="stack">
      <div className="page-hero page-hero-compact">
        <div>
          <p className="page-kicker">Listening practice</p>
          <h2>Видео для начинающих</h2>
          <p className="page-hero-text">
            Подборка медленных историй и простых ситуаций на английском. Смотри
            короткими сессиями: сначала без паузы, потом второй раз с повтором
            вслух.
          </p>
        </div>

        <div className="hero-inline-metrics">
          <div className="hero-summary-item">
            <span>Всего</span>
            <strong>{VIDEOS_DATA.length}</strong>
          </div>
          <div className="hero-summary-item">
            <span>Посмотрено</span>
            <strong>{watchedCount}</strong>
          </div>
          <div className="hero-summary-item">
            <span>Скрыто</span>
            <strong>{hiddenCount}</strong>
          </div>
        </div>
      </div>

      <div className="card video-toolbar">
        <div className="video-filter-row">
          <label>
            Уровень
            <select
              value={levelFilter}
              onChange={(event) => setLevelFilter(event.target.value)}
            >
              <option value={allFilter}>Все уровни</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <label>
            Тема
            <select
              value={topicFilter}
              onChange={(event) => setTopicFilter(event.target.value)}
            >
              <option value={allFilter}>Все темы</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={showHidden}
              onChange={(event) => setShowHidden(event.target.checked)}
            />
            Показывать скрытые
          </label>
        </div>
      </div>

      {visibleVideos.length ? (
        <div className="video-grid">
          {visibleVideos.map((video) => {
            const state = progressMap[video.id] ?? {};

            return (
              <article
                className={`card video-card ${state.watched ? "video-card-watched" : ""}`}
                key={video.id}
              >
                <div className="video-frame">
                  <iframe
                    title={video.title}
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                <div className="video-content">
                  <div className="video-meta">
                    <span className="chip">{video.level}</span>
                    <span className="chip chip-muted">{video.topic}</span>
                    {state.watched ? (
                      <span className="chip chip-success">Посмотрено</span>
                    ) : null}
                  </div>

                  <h3>{video.title}</h3>
                  <p className="muted-text">{video.description}</p>

                  <dl className="video-details">
                    <div>
                      <dt>Формат</dt>
                      <dd>{video.type}</dd>
                    </div>
                    <div>
                      <dt>Источник</dt>
                      <dd>{video.source}</dd>
                    </div>
                  </dl>

                  <div className="video-actions">
                    <button
                      className="button button-success"
                      type="button"
                      onClick={() => markWatched(video.id)}
                    >
                      Посмотрел
                    </button>
                    <button
                      className="button button-secondary"
                      type="button"
                      onClick={() => markWatched(video.id, true)}
                    >
                      Посмотрел и скрыть
                    </button>
                    {state.hidden ? (
                      <button
                        className="button button-light"
                        type="button"
                        onClick={() => updateVideo(video.id, { hidden: false })}
                      >
                        Вернуть
                      </button>
                    ) : (
                      <button
                        className="button button-light"
                        type="button"
                        onClick={() => updateVideo(video.id, { hidden: true })}
                      >
                        Скрыть
                      </button>
                    )}
                    <a
                      className="button button-light"
                      href={video.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="Роликов по фильтрам нет"
          description="Сбрось фильтры или включи показ скрытых роликов."
        />
      )}
    </section>
  );
};

export default Videos;
