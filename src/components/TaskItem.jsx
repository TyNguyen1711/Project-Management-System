import React from "react";
import { Plus, Calendar, Settings2 } from "lucide-react";
const TaskItem = ({ title, project, daysLeft }) => {
  return (
    <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
      <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{project}</span>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{daysLeft} days</span>
        </div>
      </div>
    </div>
  );
};
export default TaskItem;
