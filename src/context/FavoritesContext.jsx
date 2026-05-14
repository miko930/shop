import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('kiosk_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('kiosk_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const isFavorited = prev.some(p => p.id === product.id);
      if (isFavorited) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isFavorite = (productId) => {
    return favorites.some(p => p.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
