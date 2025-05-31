import { useState, useCallback } from 'react';
import { fetchQuickSuggestPlans } from '../services/api';
import { FilterParams, PlanCardData } from '../types/types';

export function useFetchPlans() {
  const [plans, setPlans] = useState<PlanCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async (params: FilterParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchQuickSuggestPlans(params);
      setPlans(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { plans, loading, error, fetchPlans };
}
