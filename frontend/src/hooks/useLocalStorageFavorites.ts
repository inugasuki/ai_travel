import { useState } from 'react';

export function useLocalStorageFavorites(key = 'favorites') {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  };

  return { favorites, toggleFavorite };
}
