import { createContext, useContext } from 'react';
import { useLocalStorageFavorites } from '../hooks/useLocalStorageFavorites';

interface FavoritesContextValue {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { favorites, toggleFavorite } = useLocalStorageFavorites();
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('FavoritesProvider not found');
  return ctx;
}
