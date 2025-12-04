// src/context/AuthContext.jsx
/* eslint-disable react-refresh/only-export-components */
import { createClient } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import apiClient from "../api/axios";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await apiClient.get("/profile");
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile in context:", error);
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${session.access_token}`;
      fetchProfile();
    } else {
      localStorage.removeItem("session");
      delete apiClient.defaults.headers.common["Authorization"];
      setProfile(null);
    }
  }, [session, fetchProfile]);

  const login = (sessionData) => setSession(sessionData);

  const logout = () => {
    supabase.auth.signOut();
  };

  const value = useMemo(
    () => ({
      session,
      profile,
      loading,
      login,
      logout,
    }),
    [session, profile, loading],
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
