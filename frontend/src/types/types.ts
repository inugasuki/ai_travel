export interface Category {
  id: string;
  label: string;
  imageUrl: string;
  description: string;
}

export interface PlanCardData {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  budgetRange: {
    min: number;
    max: number;
  };
  duration: string;
  persons: {
    adult: number;
    child: number;
  };
  availability: 'available' | 'low' | 'sold_out';
  rating: number;
  reviewCount: number;
  likeCount: number;
  dislikeCount: number;
}

export interface PlanDetail extends PlanCardData {
  catchphrase: string;
  description: string;
  imageUrls: string[];
  videoUrl?: string;
  styles: string[];
}

export interface SliderItem {
  planId: string;
  title: string;
  catchphrase: string;
  imageUrl: string;
  videoUrl?: string;
}

export interface FilterParams {
  category: string;
  budgetMin: number;
  budgetMax: number;
  duration: string;
  adultCount: number;
  childCount: number;
  styles: string[];
}

export interface InteractionResponse {
  planId: string;
  likeCount: number;
  dislikeCount: number;
  isFavorite: boolean;
}
