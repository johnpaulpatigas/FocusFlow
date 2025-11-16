// src/components/Header.jsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="mb-12 flex items-center justify-between">
      <Link to="/">
        <span className="text-2xl font-bold text-slate-100">FocusFlow</span>
      </Link>
      <Link
        to="/login"
        className="rounded-lg bg-slate-700 px-6 py-2 text-slate-200 transition-colors duration-300 hover:bg-slate-600"
      >
        Log in
      </Link>
    </header>
  );
};

export default Header;
