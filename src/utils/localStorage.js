// Save to localStorage
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Get from localStorage
export const getFromLocalStorage = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

// Add to recent searches (max 5)
export const addToRecentSearches = (city) => {
  const recent = getFromLocalStorage('recentSearches', []);
  const filtered = recent.filter(item => item.toLowerCase() !== city.toLowerCase());
  const updated = [city, ...filtered].slice(0, 5);
  saveToLocalStorage('recentSearches', updated);
  return updated;
};

// Toggle favorite
export const toggleFavorite = (city) => {
  const favorites = getFromLocalStorage('favorites', []);
  const exists = favorites.some(item => item.toLowerCase() === city.toLowerCase());
  
  let updated;
  if (exists) {
    updated = favorites.filter(item => item.toLowerCase() !== city.toLowerCase());
  } else {
    updated = [...favorites, city];
  }
  saveToLocalStorage('favorites', updated);
  return updated;
};

// Check if city is favorite
export const isFavorite = (city) => {
  const favorites = getFromLocalStorage('favorites', []);
  return favorites.some(item => item.toLowerCase() === city.toLowerCase());
};

// Get all favorites
export const getFavorites = () => {
  return getFromLocalStorage('favorites', []);
};

// Get recent searches
export const getRecentSearches = () => {
  return getFromLocalStorage('recentSearches', []);
};