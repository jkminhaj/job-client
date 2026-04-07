const companies = [
  { rank: 1, name: "Gainsight", rating: 4.7, logo: "https://media.glassdoor.com/sql/711880/gainsight-squarelogo-1430508525120.png", color: "#4F46E5" },
  { rank: 2, name: "Box", rating: 4.5, logo: "https://media.glassdoor.com/sql/254092/box-squarelogo-1519691716421.png", color: "#0EA5E9" },
  { rank: 3, name: "Bain & Co.", rating: 4.7, logo: "https://media.glassdoor.com/sql/3752/bain-and-company-squareLogo-1688144456047.png", color: "#EF4444" },
  { rank: 4, name: "McKinsey", rating: 3.7, logo: "https://media.glassdoor.com/sql/2893/mckinsey-and-company-squarelogo-1552607395804.png", color: "#1D4ED8" },
  { rank: 5, name: "NVIDIA", rating: 4.9, logo: "https://media.glassdoor.com/sql/7633/nvidia-squareLogo-1672943582283.png", color: "#16A34A" },
];

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < full ? "text-amber-400" : i === full && half ? "text-amber-300" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs font-semibold text-amber-600 ml-1">{rating}</span>
    </div>
  );
};

const BestPlaces = () => {
  return (
    <section className="py-12">
      <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left headline */}
          <div className="lg:w-80 p-8 lg:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-100 bg-white">
            <p className="section-label">Recognition</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
              Best Places to Work 2024
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Employees have spoken. These are the companies where culture, growth, and fulfillment come together.
            </p>
            <button className="btn-outline self-start text-sm py-2 px-4">See full list →</button>
          </div>

          {/* Right — company list */}
          <div className="flex-1 p-6 lg:p-8">
            <div className="space-y-3">
              {companies.map(({ rank, name, rating, logo, color }, i) => (
                <div
                  key={name}
                  className={`flex items-center gap-4 p-3 sm:p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer group animate-fade-up`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {/* Rank */}
                  <span className="w-7 text-center font-display text-lg font-bold text-slate-300 shrink-0">
                    {rank}
                  </span>

                  {/* Logo */}
                  <div className="w-10 h-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:shadow transition">
                    <img src={logo} alt={name} className="w-8 h-8 object-contain" />
                  </div>

                  {/* Name + stars */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{name}</p>
                    <StarRating rating={rating} />
                  </div>

                  {/* Bar */}
                  <div className="hidden sm:block w-28">
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(rating / 5) * 100}%`, background: color }}
                      />
                    </div>
                  </div>

                  <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestPlaces;
