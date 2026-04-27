export const capitalizeWord = (value) => {
  if (!value) {
    return "";
  }

  return `${String(value).charAt(0).toUpperCase()}${String(value).slice(1)}`;
};

export default capitalizeWord;
