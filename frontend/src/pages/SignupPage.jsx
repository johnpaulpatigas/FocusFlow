import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import GoogleButton from "../components/GoogleButton";
import InputField from "../components/InputField";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <AuthCard title="Sign Up">
        <form className="space-y-5">
          <InputField type="text" placeholder="First Name" />
          <InputField type="text" placeholder="Last Name" />
          <InputField type="email" placeholder="Email" />
          <InputField type="password" placeholder="Password" />
          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-500 py-3 font-bold text-white transition-colors duration-300 hover:bg-cyan-600"
          >
            Sign up
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
  );
};

export default SignupPage;
