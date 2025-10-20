const StatsOverview = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 grid grid-cols-5">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 ${
            index < stats.length - 1
              ? "border-r border-dashed border-gray-300"
              : ""
          }`}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>{stat.label}</span>
            <span
              className={`flex items-center gap-1 text-xs ${
                stat.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>{stat.isPositive ? "▲" : "▼"}</span>
              <span>{stat.change}</span>
            </span>
          </div>
          <div className="text-3xl font-semibold text-gray-900">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};
export default StatsOverview;
