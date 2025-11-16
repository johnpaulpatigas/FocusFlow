// src/components/FeatureCard.jsx
const FeatureCard = ({ title, description, bgColor, iconSrc }) => {
  return (
    <div className="flex cursor-pointer flex-col gap-4 rounded-xl bg-[#1B5E6F]/70 p-6 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-400/20">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-100">{title}</h3>
          <p className="mt-1 text-slate-300">{description}</p>
        </div>
        <div
          className={`h-16 w-16 ${bgColor} ml-4 flex shrink-0 items-center justify-center rounded-full`}
        >
          <img src={iconSrc} alt={`${title} icon`} className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
