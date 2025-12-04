// src/components/GoogleButton.jsx
import { Capacitor } from "@capacitor/core";
import { SocialLogin } from "@capgo/capacitor-social-login";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import GoogleIcon from "../assets/google-icon.svg";
import { supabase } from "../context/AuthContext";

const GoogleButton = ({ text }) => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        const result = await SocialLogin.login({ provider: "google" });

        const idToken = result.result.idToken;
        if (!idToken) throw new Error("No ID token returned from plugin");

        const { data } = await apiClient.post("/auth/google/native", {
          idToken,
        });

        if (data.session) {
          const { error } = await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          });

          if (error) throw error;

          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Native Google login failed", error);
      }
    } else {
      try {
        const { data } = await apiClient.get("/auth/google");
        if (data.url) {
          window.location.href = data.url;
        }
      } catch (error) {
        console.error("Web Google login failed:", error);
      }
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-3 rounded-lg bg-slate-700 py-3 font-semibold text-slate-300 transition-colors duration-300 hover:bg-slate-600"
    >
      <img src={GoogleIcon} alt="Google" className="h-5 w-5" />
      {text}
    </button>
  );
};

export default GoogleButton;
