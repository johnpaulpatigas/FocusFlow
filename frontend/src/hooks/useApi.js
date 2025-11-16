// src/hooks/useApi.js
import axios from "axios";
import { useState } from "react";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  const post = async (url, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(url, data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || err.message);
      throw err;
    }
  };

  return { post, loading, error };
};

export default useApi;
