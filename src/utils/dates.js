export const getTodayDateKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const parseDateKey = (dateKey) => {
  if (!dateKey) {
    return new Date();
  }

  const [year, month, day] = String(dateKey).split("-").map(Number);
  return new Date(year, (month || 1) - 1, day || 1, 12, 0, 0, 0);
};

export const addDays = (dateInput, days) => {
  const date =
    typeof dateInput === "string" ? parseDateKey(dateInput) : new Date(dateInput);

  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const isDueTodayOrPast = (dateKey, referenceDate = getTodayDateKey()) => {
  if (!dateKey) {
    return false;
  }

  return parseDateKey(dateKey).getTime() <= parseDateKey(referenceDate).getTime();
};

export const formatDisplayDate = (dateKey) => {
  if (!dateKey) {
    return "—";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(parseDateKey(dateKey));
};
