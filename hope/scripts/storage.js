const KEYS = {
  PREF_LOCATION: 'hope_pref_location',
  FAVORITES: 'hope_favorites'
};

export const getPreferredLocation = () => localStorage.getItem(KEYS.PREF_LOCATION) || '';
export const setPreferredLocation = (id) => localStorage.setItem(KEYS.PREF_LOCATION, id);

export function getFavorites() {
  const raw = localStorage.getItem(KEYS.FAVORITES);
  return raw ? JSON.parse(raw) : [];
}
export function toggleFavorite(doctorName) {
  const favs = getFavorites();
  const exists = favs.includes(doctorName);
  const next = exists ? favs.filter(n => n !== doctorName) : [...favs, doctorName];
  localStorage.setItem(KEYS.FAVORITES, JSON.stringify(next));
  return next;
}
