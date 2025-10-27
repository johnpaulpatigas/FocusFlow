const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-200 placeholder-slate-400 transition-all duration-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
    />
  );
};

export default InputField;
