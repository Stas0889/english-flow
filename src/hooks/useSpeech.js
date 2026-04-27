import { useCallback } from "react";

export const useSpeech = () => {
  const isSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const speak = useCallback((text, accent = "en-US") => {
    if (!isSupported || !text) {
      return false;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = accent;

      const voices = window.speechSynthesis.getVoices?.() ?? [];
      const matchedVoice = voices.find((voice) => voice.lang === accent);

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (error) {
      console.warn("Speech synthesis failed", error);
      return false;
    }
  }, [isSupported]);

  return { speak, isSupported };
};

export default useSpeech;
