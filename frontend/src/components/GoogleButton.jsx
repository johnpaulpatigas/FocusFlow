import GoogleIcon from "../assets/google-icon.svg";

const GoogleButton = ({ text }) => {
  return (
    <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-slate-700 py-3 font-semibold text-slate-300 transition-colors duration-300 hover:bg-slate-600">
      <img src={GoogleIcon} alt="Google" className="h-5 w-5" />
      {text}
    </button>
  );
};

export default GoogleButton;
