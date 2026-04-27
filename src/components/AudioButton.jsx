import useSpeech from "../hooks/useSpeech";

const AudioButton = ({ text, accent }) => {
  const { speak, isSupported } = useSpeech();

  return (
    <button
      type="button"
      className="icon-button"
      onClick={() => speak(text, accent)}
      disabled={!isSupported || !text}
      title={isSupported ? "Озвучить" : "Озвучка недоступна"}
      aria-label="Озвучить"
    >
      🔊
    </button>
  );
};

export default AudioButton;
