import React, { useState, useMemo } from "react";
import {
  Plus,
  ChevronDown,
  MoreHorizontal,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// Component chính cho TaskTable - có thể tái sử dụng
const TaskTable = ({ tasks, showProjectColumn = true }) => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const getStatusColor = (status) => {
    const colors = {
      Backlog: "bg-purple-100 text-purple-700",
      Todo: "bg-red-100 text-red-700",
      "In Progress": "bg-yellow-100 text-yellow-700",
      "In Review": "bg-blue-100 text-blue-700",
      Done: "bg-green-100 text-green-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const toggleTask = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
        key = null;
      }
    }
    setSortConfig({ key, direction });
  };

  const sortedTasks = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return tasks;

    return [...tasks].sort((a, b) => {
      let aValue, bValue;

      if (sortConfig.key === "dueDate") {
        aValue = a.dueDateObj.getTime();
        bValue = b.dueDateObj.getTime();
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [tasks, sortConfig]);

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="inline w-4 h-4 ml-1 text-gray-400" />;
    }
    if (sortConfig.direction === "asc") {
      return <ArrowUp className="inline w-4 h-4 ml-1 text-blue-600" />;
    }
    if (sortConfig.direction === "desc") {
      return <ArrowDown className="inline w-4 h-4 ml-1 text-blue-600" />;
    }
    return <ArrowUpDown className="inline w-4 h-4 ml-1 text-gray-400" />;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTasks(sortedTasks.map((t) => t.id));
                    } else {
                      setSelectedTasks([]);
                    }
                  }}
                />
              </th>
              <th
                className="text-left px-4 py-3 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("name")}
              >
                Task Name <SortIcon columnKey="name" />
              </th>
              {showProjectColumn && (
                <th
                  className="text-left px-4 py-3 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("project")}
                >
                  Project <SortIcon columnKey="project" />
                </th>
              )}
              <th
                className="text-left px-4 py-3 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("assignee")}
              >
                Assignee <SortIcon columnKey="assignee" />
              </th>
              <th
                className="text-left px-4 py-3 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("dueDate")}
              >
                Due Date <SortIcon columnKey="dueDate" />
              </th>
              <th
                className="text-left px-4 py-3 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                Status <SortIcon columnKey="status" />
              </th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => toggleTask(task.id)}
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{task.name}</td>
                {showProjectColumn && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs font-semibold ${task.projectColor}`}
                      >
                        {task.projectIcon}
                      </div>
                      <span className="text-sm text-gray-700">
                        {task.project}
                      </span>
                    </div>
                  </td>
                )}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                      {task.assigneeInitial}
                    </div>
                    <span className="text-sm text-gray-700">
                      {task.assignee}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-yellow-600">
                  {task.dueDate}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {selectedTasks.length} of {sortedTasks.length} row(s) selected.
        </span>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default TaskTable;
