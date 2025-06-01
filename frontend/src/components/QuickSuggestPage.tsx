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
  const [budgetMin, setBudgetMin] = useState(10000);
  const [budgetMax, setBudgetMax] = useState(100000);
  const [duration, setDuration] = useState('1泊2日');
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [styles, setStyles] = useState<string[]>([]);
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
      budgetMin,
      budgetMax,
      duration,
      adultCount,
      childCount,
      styles,
    };
    fetchPlans(params);
  }, [selectedCategory]);

  const handleSearch = () => {
    if (!selectedCategory) return;
    const params: FilterParams = {
      category: selectedCategory,
      budgetMin,
      budgetMax,
      duration,
      adultCount,
      childCount,
      styles,
    };
    fetchPlans(params);
  };

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

      {selectedCategory && (
        <div className="bg-white shadow-md rounded-lg mx-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">最低予算</label>
              <input
                type="number"
                value={budgetMin}
                onChange={(e) => setBudgetMin(Number(e.target.value))}
                className="mt-1 w-full border rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">最高予算</label>
              <input
                type="number"
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                className="mt-1 w-full border rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">日数</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-1 w-full border rounded-md px-2 py-1"
              >
                <option value="1泊2日">1泊2日</option>
                <option value="2泊3日">2泊3日</option>
                <option value="3泊4日">3泊4日</option>
                <option value="それ以上">それ以上</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">大人</label>
              <select
                value={adultCount}
                onChange={(e) => setAdultCount(Number(e.target.value))}
                className="mt-1 w-full border rounded-md px-2 py-1"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n}名</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">子ども</label>
              <select
                value={childCount}
                onChange={(e) => setChildCount(Number(e.target.value))}
                className="mt-1 w-full border rounded-md px-2 py-1"
              >
                {[0, 1, 2].map((n) => (
                  <option key={n} value={n}>{n}名</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-3">
              <p className="text-sm font-medium">旅行スタイル</p>
              <div className="flex flex-wrap gap-3 mt-1">
                {['のんびり', 'アクティブ', '家族向け', 'グルメ', '女子旅'].map((s) => (
                  <label key={s} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={s}
                      checked={styles.includes(s)}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStyles((prev) =>
                          prev.includes(val)
                            ? prev.filter((v) => v !== val)
                            : [...prev, val],
                        );
                      }}
                    />
                    <span className="ml-1 text-sm">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              検索
            </button>
          </div>
        </div>
      )}

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

      {!loading && plans.length === 0 && (
        <p className="text-center text-gray-500 py-8">該当するプランが見つかりませんでした。</p>
      )}
    </div>
  );
};
