// Project Card Component
const ProjectCard = ({ name, initial, color = "bg-blue-600" }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
      <div
        className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}
      >
        <span className="text-white font-semibold text-lg">{initial}</span>
      </div>
      <span className="font-medium text-gray-900 text-base">{name}</span>
    </div>
  );
};

export default ProjectCard;
