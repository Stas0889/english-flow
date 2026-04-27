import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const readValue = () => {
    const fallbackValue =
      typeof initialValue === "function" ? initialValue() : initialValue;

    if (typeof window === "undefined") {
      return fallbackValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : fallbackValue;
    } catch (error) {
      console.warn(`Cannot read localStorage key "${key}"`, error);
      return fallbackValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Cannot write localStorage key "${key}"`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
