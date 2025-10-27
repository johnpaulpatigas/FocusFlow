const AuthCard = ({ title, children }) => {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800/50 p-8 shadow-lg backdrop-blur-sm">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-wider text-slate-100 uppercase">
        {title}
      </h1>
      {children}
    </div>
  );
};

export default AuthCard;
