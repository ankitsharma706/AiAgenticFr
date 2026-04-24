import { useState } from 'react';
import { predictUser } from '../services/api';

export const usePrediction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const runPrediction = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await predictUser(userData);
      setResult(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get prediction');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { runPrediction, loading, error, result };
};
