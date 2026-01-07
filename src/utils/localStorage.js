/**
 * Utilitaires pour gérer localStorage de manière sécurisée
 */

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${key} depuis localStorage:`, error);
    return defaultValue;
  }
};

export const setToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Erreur lors de l'écriture de ${key} dans localStorage:`, error);
    return false;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression de ${key} depuis localStorage:`, error);
    return false;
  }
};
