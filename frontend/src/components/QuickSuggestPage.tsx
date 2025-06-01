import React, { useEffect, useState } from 'react';
import { fetchCategories, interactWithPlan } from '../services/api';
import { Category, FilterParams } from '../types/types';
import { DestinationTile } from './DestinationTile';
import { PlanCard } from './PlanCard';
import { LoadingSpinner } from './LoadingSpinner';
import { useFetchPlans } from '../hooks/useFetchPlans';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNavigate } from 'react-router-dom';

export const QuickSuggestPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { plans, loading, error, fetchPlans } = useFetchPlans();
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    const params: FilterParams = {
      category: selectedCategory,
      budgetMin: 10000,
      budgetMax: 100000,
      duration: '1泊2日',
      adultCount: 2,
      childCount: 0,
      styles: [],
    };
    fetchPlans(params);
  }, [selectedCategory, fetchPlans]);

  const handleLike = async (id: string) => {
    await interactWithPlan(id, 'like');
  };

  const handleDislike = async (id: string) => {
    await interactWithPlan(id, 'dislike');
  };

  const handleFavorite = async (id: string) => {
    toggleFavorite(id);
    await interactWithPlan(id, 'favorite');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
        {categories.map((c) => (
          <DestinationTile
            key={c.id}
            category={c}
            isSelected={c.id === selectedCategory}
            onSelect={setSelectedCategory}
          />
        ))}
      </div>

      {loading && <LoadingSpinner />}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {plans.map((p) => (
          <PlanCard
            key={p.id}
            plan={{ ...p, isFavorite: favorites.includes(p.id) }}
            onLike={() => handleLike(p.id)}
            onDislike={() => handleDislike(p.id)}
            onFavorite={() => handleFavorite(p.id)}
            onViewDetail={() => navigate(`/detail?planId=${p.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
