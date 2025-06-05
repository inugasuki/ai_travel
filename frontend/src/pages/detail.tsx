import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchPlanDetail } from '../services/api';
import { PlanDetail } from '../types/types';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function DetailPage() {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('planId');
  const [plan, setPlan] = useState<PlanDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!planId) return;
    fetchPlanDetail(planId)
      .then((data) => setPlan(data))
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [planId]);

  if (!planId) return <p className="p-4">No plan specified.</p>;
  if (loading) return <LoadingSpinner />;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!plan) return <p className="p-4">Plan not found.</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{plan.title}</h1>
      <img
        src={plan.imageUrls[0] || plan.thumbnailUrl}
        alt={plan.title}
        className="w-full h-60 object-cover rounded-lg"
      />
      <p className="text-lg text-gray-700">{plan.catchphrase}</p>
      <p className="text-gray-600">{plan.description}</p>
    </div>
  );
}
