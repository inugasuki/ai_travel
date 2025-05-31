import React from 'react';
import { PlanCardData } from '../types/types';

interface Props {
  plan: PlanCardData;
  onLike: () => void;
  onDislike: () => void;
  onFavorite: () => void;
  onViewDetail: () => void;
}

export const PlanCard: React.FC<Props> = ({ plan, onLike, onDislike, onFavorite, onViewDetail }) => (
  <div className="border rounded-2xl shadow-md p-4 hover:shadow-xl hover:-translate-y-1 transition-transform">
    <img src={plan.thumbnailUrl} alt={plan.title} className="w-full h-40 object-cover rounded-lg" />
    <h3 className="text-lg font-semibold mt-2">{plan.title}</h3>
    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
      {plan.category}
    </span>
    <p className="text-sm text-gray-600">予算：¥{plan.budgetRange.min}～¥{plan.budgetRange.max}</p>
    <p className="text-sm text-gray-600">日数：{plan.duration}／大人{plan.persons.adult}名・子ども{plan.persons.child}名</p>
    <div className="flex items-center space-x-2 mt-2">
      <button onClick={onLike} className="text-sm">👍 {plan.likeCount}</button>
      <button onClick={onDislike} className="text-sm">👎 {plan.dislikeCount}</button>
      <button onClick={onFavorite} className="text-sm">
        {plan.isFavorite ? '💖' : '🤍'}
      </button>
      <button onClick={onViewDetail} className="ml-auto bg-blue-600 text-white px-3 py-1 rounded text-sm">詳細を見る</button>
    </div>
  </div>
);
