import React from 'react';
import { Category } from '../types/types';

interface Props {
  category: Category;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const DestinationTile: React.FC<Props> = ({ category, isSelected, onSelect }) => (
  <button
    onClick={() => onSelect(category.id)}
    className={`rounded-2xl overflow-hidden shadow-md transform hover:scale-105 transition-all ${
      isSelected ? 'ring-2 ring-blue-500' : ''
    }`}
  >
    <img src={category.imageUrl} alt={category.label} className="w-full h-32 object-cover" />
    <div className="p-2 text-left">
      <p className="font-semibold">{category.label}</p>
      <p className="text-sm text-gray-500">{category.description}</p>
    </div>
  </button>
);
