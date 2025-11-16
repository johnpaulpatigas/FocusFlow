// src/pages/SignupPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import GoogleButton from "../components/GoogleButton";
import InputField from "../components/InputField";
import PageWrapper from "../components/PageWrapper";
import { useAuth } from "../context/AuthContext";
import useApi from "../hooks/useApi";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { post, loading, error: apiError } = useApi();

  const handleChange = (e) => {
    if (error) setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await post("/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (response.session) {
        login(response.session);
        navigate("/dashboard");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch {
      setError(apiError || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <PageWrapper>
      <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
        <AuthCard title="Sign Up">
          <form className="space-y-5" onSubmit={handleSignup}>
            <InputField
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputField
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <InputField
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            {error && (
              <p className="text-center text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-cyan-500 py-3 font-bold text-white transition-colors duration-300 hover:bg-cyan-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-400">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-cyan-400 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-800 px-2 text-slate-500">OR</span>
            </div>
          </div>
          <GoogleButton text="Sign up with Google" />
        </AuthCard>
      </div>
    </PageWrapper>
  );
};

export default SignupPage;
