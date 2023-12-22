export const addToLocalStorage = (key, value) => {
  if (key && value !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFromLocalStorage = key => {
  if (key) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }
  return null;
};

export const removeFromLocalStorage = key => {
  if (key) {
    localStorage.removeItem(key);
  }
};
