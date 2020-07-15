export const getStorageItem = key => {
  const storageItem = localStorage.getItem(key);
  return storageItem ? JSON.parse(storageItem) : [];
};

export const setStorageItem = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item))
};

const generateId = () => `#${Date.now().toString(16)}`;

export const createItem = (name) => {
  return {
    id: generateId(),
    name,
    comments: []
  }
};

export const createComments = (text, color) => {
  return {
    id: generateId(),
    text,
    color
  }
};
