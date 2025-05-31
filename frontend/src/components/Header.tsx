import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { favorites } = useFavorites();
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <Link to="/" className="text-xl font-bold">
        Travel Concierge
      </Link>
      <Link to="/favorites" className="relative">
        <span>💖</span>
        <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
          {favorites.length}
        </span>
      </Link>
    </header>
  );
};
