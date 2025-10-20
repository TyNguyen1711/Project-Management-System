import { Plus, Calendar, Settings2 } from "lucide-react";

// Section Header Component
const SectionHeader = ({ title, count, onAdd, settingsIcon }) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-lg font-semibold text-gray-900">
        {title} {count !== undefined && `(${count})`}
      </h2>
      {settingsIcon ? (
        <button
          onClick={onAdd}
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <Settings2 size={18} className="text-gray-600" />
        </button>
      ) : (
        onAdd && (
          <button
            onClick={onAdd}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <Plus size={18} className="text-gray-600" />
          </button>
        )
      )}
    </div>
  );
};
export default SectionHeader;
