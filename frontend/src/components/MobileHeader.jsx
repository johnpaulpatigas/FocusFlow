// src/components/MobileHeader.jsx
import MenuIcon from "../assets/icons/menu.svg?react";

const MobileHeader = ({ onMenuClick }) => {
  return (
    <header className="relative flex items-center justify-between bg-slate-800 p-4 text-white md:hidden">
      <div className="text-xl font-bold">
        Focus<span className="text-cyan-400">Flow</span>
      </div>

      <button onClick={onMenuClick} className="-mr-2 p-2">
        <MenuIcon className="h-6 w-6" />
      </button>
    </header>
  );
};

export default MobileHeader;
