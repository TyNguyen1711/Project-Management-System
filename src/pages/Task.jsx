import React, { useState, useMemo } from "react";
import { Plus, X } from "lucide-react";
import TaskTable from "../components/TaskTable";
import DatePickerFilter from "../components/DatePickerFilter";
import FilterDropdown from "../components/FilterDropdown";
import CreateTaskModal from "../components/CreateTaskModal";
const MyTasksPage = () => {
  const [activeTab, setActiveTab] = useState("Table");
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedDueDate, setSelectedDueDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projects = [
    {
      id: 1,
      name: "Mobile App Development",
      initial: "M",
      color: "bg-blue-600",
    },
    { id: 2, name: "Website Redesign", initial: "W", color: "bg-purple-600" },
  ];

  const people = [
    { id: 1, name: "Antonio", email: "antonio@mail.com", initial: "A" },
    { id: 2, name: "John", email: "john@mail.com", initial: "J" },
  ];

  const statuses = [
    { id: 1, name: "Backlog" },
    { id: 2, name: "Todo" },
    { id: 3, name: "In Progress" },
    { id: 4, name: "In Review" },
    { id: 5, name: "Done" },
  ];

  const allTasks = [
    {
      id: 1,
      name: "Conduct usability testing",
      project: "Mobile App Development",
      projectId: 1,
      projectIcon: "M",
      projectColor: "bg-blue-600",
      assignee: "John",
      assigneeId: 2,
      assigneeInitial: "J",
      dueDate: "October 15th, 2024",
      dueDateObj: new Date("2024-10-15"),
      status: "Backlog",
    },
    {
      id: 2,
      name: "Implement offline mode",
      project: "Mobile App Development",
      projectId: 1,
      projectIcon: "M",
      projectColor: "bg-blue-600",
      assignee: "Antonio",
      assigneeId: 1,
      assigneeInitial: "A",
      dueDate: "October 14th, 2024",
      dueDateObj: new Date("2024-10-14"),
      status: "Todo",
    },
    {
      id: 3,
      name: "Integrate push notifications",
      project: "Mobile App Development",
      projectId: 1,
      projectIcon: "M",
      projectColor: "bg-blue-600",
      assignee: "John",
      assigneeId: 2,
      assigneeInitial: "J",
      dueDate: "October 13th, 2024",
      dueDateObj: new Date("2024-10-13"),
      status: "Backlog",
    },
    {
      id: 4,
      name: "Develop login screen",
      project: "Mobile App Development",
      projectId: 1,
      projectIcon: "M",
      projectColor: "bg-blue-600",
      assignee: "Antonio",
      assigneeId: 1,
      assigneeInitial: "A",
      dueDate: "October 12th, 2024",
      dueDateObj: new Date("2024-10-12"),
      status: "In Review",
    },
    {
      id: 5,
      name: "Implement navigation flow",
      project: "Mobile App Development",
      projectId: 1,
      projectIcon: "M",
      projectColor: "bg-blue-600",
      assignee: "John",
      assigneeId: 2,
      assigneeInitial: "J",
      dueDate: "October 11th, 2024",
      dueDateObj: new Date("2024-10-11"),
      status: "Todo",
    },
    {
      id: 6,
      name: "Design UI components",
      project: "Mobile App Development",
      projectId: 1,
      projectIcon: "M",
      projectColor: "bg-blue-600",
      assignee: "Antonio",
      assigneeId: 1,
      assigneeInitial: "A",
      dueDate: "October 10th, 2024",
      dueDateObj: new Date("2024-10-10"),
      status: "In Progress",
    },
    {
      id: 7,
      name: "Create app wireframes",
      project: "Mobile App Development",
      projectId: 1,
      projectIcon: "M",
      projectColor: "bg-blue-600",
      assignee: "John",
      assigneeId: 2,
      assigneeInitial: "J",
      dueDate: "October 9th, 2024",
      dueDateObj: new Date("2024-10-09"),
      status: "Done",
    },
    {
      id: 8,
      name: "Write content for main pages",
      project: "Website Redesign",
      projectId: 2,
      projectIcon: "W",
      projectColor: "bg-purple-600",
      assignee: "Antonio",
      assigneeId: 1,
      assigneeInitial: "A",
      dueDate: "October 8th, 2024",
      dueDateObj: new Date("2024-10-08"),
      status: "In Review",
    },
    {
      id: 9,
      name: "Implement user authentication",
      project: "Website Redesign",
      projectId: 2,
      projectIcon: "W",
      projectColor: "bg-purple-600",
      assignee: "John",
      assigneeId: 2,
      assigneeInitial: "J",
      dueDate: "October 7th, 2024",
      dueDateObj: new Date("2024-10-07"),
      status: "In Progress",
    },
    {
      id: 10,
      name: "Integrate CMS",
      project: "Website Redesign",
      projectId: 2,
      projectIcon: "W",
      projectColor: "bg-purple-600",
      assignee: "Antonio",
      assigneeId: 1,
      assigneeInitial: "A",
      dueDate: "October 6th, 2024",
      dueDateObj: new Date("2024-10-06"),
      status: "Todo",
    },
  ];

  const toggleFilter = (array, setArray, id) => {
    if (array.includes(id)) {
      setArray(array.filter((item) => item !== id));
    } else {
      setArray([...array, id]);
    }
  };

  // Filter tasks
  const filteredTasks = allTasks.filter((task) => {
    if (selectedStatuses.length > 0) {
      const statusNames = selectedStatuses.map(
        (id) => statuses.find((s) => s.id === id)?.name
      );
      if (!statusNames.includes(task.status)) return false;
    }
    if (
      selectedAssignees.length > 0 &&
      !selectedAssignees.includes(task.assigneeId)
    ) {
      return false;
    }
    if (
      selectedProjects.length > 0 &&
      !selectedProjects.includes(task.projectId)
    ) {
      return false;
    }
    if (selectedDueDate) {
      const taskDate = new Date(task.dueDateObj.toDateString());
      const filterDate = new Date(selectedDueDate.toDateString());
      if (taskDate.getTime() !== filterDate.getTime()) {
        return false;
      }
    }
    return true;
  });

  const activeFilters =
    selectedStatuses.length +
    selectedAssignees.length +
    selectedProjects.length +
    (selectedDueDate ? 1 : 0);

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-semibold text-gray-900">My Tasks</h1>
            <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-200">
              A
            </button>
          </div>
          <p className="text-sm text-gray-600">View all of your tasks here</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray-200">
          {["Table", "Kanban", "Calendar"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                activeTab === tab
                  ? "bg-white text-gray-900 border border-b-0 border-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-3 flex-wrap">
            <FilterDropdown
              label={
                selectedStatuses.length > 0
                  ? `Status (${selectedStatuses.length})`
                  : "All statuses"
              }
              icon="☰"
              options={statuses}
              selected={selectedStatuses}
              onSelect={(id) =>
                toggleFilter(selectedStatuses, setSelectedStatuses, id)
              }
              onClear={() => setSelectedStatuses([])}
            />

            <FilterDropdown
              label={
                selectedAssignees.length > 0
                  ? `Assignee (${selectedAssignees.length})`
                  : "All assignees"
              }
              icon="👤"
              options={people}
              selected={selectedAssignees}
              onSelect={(id) =>
                toggleFilter(selectedAssignees, setSelectedAssignees, id)
              }
              onClear={() => setSelectedAssignees([])}
            />

            <FilterDropdown
              label={
                selectedProjects.length > 0
                  ? `Projects (${selectedProjects.length})`
                  : "All projects"
              }
              icon="📁"
              options={projects}
              selected={selectedProjects}
              onSelect={(id) =>
                toggleFilter(selectedProjects, setSelectedProjects, id)
              }
              onClear={() => setSelectedProjects([])}
            />

            <DatePickerFilter
              label="Due date"
              icon="📅"
              selectedDate={selectedDueDate}
              onDateChange={setSelectedDueDate}
              onClear={() => setSelectedDueDate(null)}
            />

            {activeFilters > 0 && (
              <button
                onClick={() => {
                  setSelectedStatuses([]);
                  setSelectedAssignees([]);
                  setSelectedProjects([]);
                  setSelectedDueDate(null);
                }}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            )}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>
        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projects={projects}
          people={people}
        />
        {/* Task Table Component */}
        <TaskTable tasks={filteredTasks} showProjectColumn={true} />
      </div>
    </div>
  );
};

export default MyTasksPage;
