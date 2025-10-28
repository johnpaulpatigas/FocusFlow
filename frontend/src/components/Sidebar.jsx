import { Link } from "react-router-dom";
import DashboardIcon from "../assets/icons/dashboard.svg?react";
import FocusIcon from "../assets/icons/focus.svg?react";
import ProfileIcon from "../assets/icons/profile.svg?react";
import ProgressIcon from "../assets/icons/progress.svg?react";
import TaskIcon from "../assets/icons/task.svg?react";

const navItems = [
  { icon: DashboardIcon, name: "Dashboard", path: "/dashboard" },
  { icon: TaskIcon, name: "Task", path: "/tasks" },
  { icon: FocusIcon, name: "Focus", path: "/focus" },
  { icon: ProgressIcon, name: "Progress", path: "/progress" },
  { icon: ProfileIcon, name: "Profile", path: "/profile" },
];

const NavLink = ({ icon, name, path, isActive }) => {
  const IconComponent = icon;

  return (
    <Link
      to={path}
      className={`group flex items-center rounded-lg p-3 transition-colors ${
        isActive ? "bg-slate-700" : "hover:bg-slate-700"
      }`}
    >
      <IconComponent
        className={`mr-4 h-6 w-6 transition-colors ${
          isActive
            ? "text-cyan-400"
            : "text-slate-400 group-hover:text-slate-200"
        }`}
      />
      <span
        className={`font-medium transition-colors ${
          isActive
            ? "text-cyan-400"
            : "text-slate-300 group-hover:text-slate-100"
        }`}
      >
        {name}
      </span>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-800 p-6">
      <div className="mb-10 text-2xl font-bold text-slate-100">
        Focus<span className="text-cyan-400">Flow</span>
      </div>
      <nav className="grow">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink {...item} isActive={item.name === "Dashboard"} />
            </li>
          ))}
        </ul>
      </nav>
      <div className="text-xs text-slate-500">
        <p>© 2025 Grp. 5 HCI/FocusFlow. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
