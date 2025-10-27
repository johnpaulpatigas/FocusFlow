import { Link } from "react-router-dom";
import illustration from "../assets/illustration.png";
import trackerIcon from "../assets/progress-tracker-icon.svg";
import taskIcon from "../assets/task-manager-icon.svg";
import timerIcon from "../assets/timer-icon.svg";
import FeatureCard from "../components/FeatureCard";
import Header from "../components/Header";

const LandingPage = () => {
  const features = [
    {
      title: "Task Manager",
      description: "Organize & prioritize your tasks easily.",
      bgColor: "bg-green-300/80",
      iconSrc: taskIcon,
    },
    {
      title: "Focus Timer",
      description: "Stay focused with Pomodoro sessions.",
      bgColor: "bg-slate-200/80",
      iconSrc: timerIcon,
    },
    {
      title: "Progress Tracker",
      description: "Visualize your productivity over time.",
      bgColor: "bg-purple-300/80",
      iconSrc: trackerIcon,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4 text-slate-100">
      <div className="w-full max-w-7xl">
        <div className="rounded-3xl bg-[#0F4C5C] p-6 sm:p-10">
          <Header />
          <main className="mt-8 grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                Mabuhay!
              </h1>
              <p className="text-4xl font-bold text-cyan-300 md:text-5xl lg:text-6xl">
                Boost your focus, manage your tasks.
              </p>
              <Link
                to="/signup"
                className="inline-block rounded-lg bg-cyan-500 px-10 py-4 text-lg font-bold text-white transition-colors duration-300 hover:bg-cyan-600"
              >
                Sign up
              </Link>
            </div>
            <div>
              <img
                src={illustration}
                alt="Person studying at a desk"
                className="h-auto w-full rounded-lg"
              />
            </div>
          </main>

          <section className="mt-16">
            <h2 className="mb-6 text-lg font-semibold text-slate-300">
              Key features:
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
