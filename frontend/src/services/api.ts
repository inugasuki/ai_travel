import { Category, PlanCardData, FilterParams, InteractionResponse } from "../types/types";

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
