import {
  Category,
  PlanCardData,
  PlanDetail,
  SliderItem,
  FilterParams,
  InteractionResponse,
} from "../types/types";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api";

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export async function fetchQuickSuggestPlans(params: FilterParams): Promise<PlanCardData[]> {
  const res = await fetch(`${BASE_URL}/plans/quick-suggest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch quick suggest plans");
  }
  return res.json();
}

export async function interactWithPlan(
  planId: string,
  action: "like" | "dislike" | "favorite"
): Promise<InteractionResponse> {
  const res = await fetch(`${BASE_URL}/plans/${planId}/interact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, userId: "anonymous" }),
  });
  if (!res.ok) {
    throw new Error("Failed to interact with plan");
  }
  return res.json();
}

export async function fetchSliderItems(): Promise<SliderItem[]> {
  const res = await fetch(`${BASE_URL}/slider-items`);
  if (!res.ok) {
    throw new Error("Failed to fetch slider items");
  }
  return res.json();
}

export async function fetchPlanDetail(planId: string): Promise<PlanDetail> {
  const res = await fetch(`${BASE_URL}/plans/${planId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch plan detail");
  }
  return res.json();
}

export async function postPlanAction(
  planId: string,
  actionType: "view" | "like" | "dislike" | "booking"
): Promise<{ likeCount?: number; dislikeCount?: number }> {
  const res = await fetch(`${BASE_URL}/plans/${planId}/action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ actionType, userId: "anonymous" }),
  });
  if (!res.ok) {
    throw new Error("Failed to post plan action");
  }
  return res.json();
}
