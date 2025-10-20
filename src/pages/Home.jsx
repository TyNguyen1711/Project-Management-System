import { Settings2 } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import StatsOverview from "../components/StatsOverview";
import TaskItem from "../components/TaskItem";
import PersonCard from "../components/PersonCard";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  // Temporary data
  const stats = [
    { label: "Total Projects", value: "2", change: "2", isPositive: true },
    { label: "Total Tasks", value: "14", change: "14", isPositive: true },
    { label: "Assigned Tasks", value: "7", change: "7", isPositive: true },
    { label: "Completed Tasks", value: "2", change: "2", isPositive: true },
    { label: "Overdue Tasks", value: "0", change: "0", isPositive: false },
  ];

  const assignedTasks = [
    {
      id: 1,
      title: "Conduct usability testing",
      project: "Mobile App Development",
      daysLeft: 14,
    },
    {
      id: 2,
      title: "Implement offline mode",
      project: "Mobile App Development",
      daysLeft: 13,
    },
    {
      id: 3,
      title: "Integrate push notifications",
      project: "Mobile App Development",
      daysLeft: 12,
    },
  ];

  const projects = [
    {
      id: 1,
      name: "Mobile App Development",
      initial: "M",
      color: "bg-blue-600",
    },
    { id: 2, name: "Website Redesign", initial: "W", color: "bg-blue-600" },
  ];

  const people = [
    { id: 1, name: "Antonio", email: "antonio@mail.com", initial: "A" },
    { id: 2, name: "John", email: "john@mail.com", initial: "J" },
  ];

  return (
    <div className="min-h-screen mb-10">
      {/* Header */}
      <div className="bg-white px-8 py-6 mb-1">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Home</h1>
            <p className="text-sm text-gray-500">
              Monitor all of your projects and tasks here
            </p>
          </div>
          <button className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
            <span className="text-gray-700 font-medium">A</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8">
        {/* Stats Overview */}
        <div className="mb-8">
          <StatsOverview stats={stats} />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Assigned Tasks Section */}
            <div className="bg-gray-100 rounded-xl p-6">
              <SectionHeader
                title="Assigned Tasks"
                count={14}
                onAdd={() => console.log("Add task")}
              />
              <div className="space-y-3 mb-4">
                {assignedTasks.map((task) => (
                  <TaskItem key={task.id} {...task} />
                ))}
              </div>
              <button className="w-full py-3 bg-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-300 transition-colors">
                Show All
              </button>
            </div>

            {/* People Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <SectionHeader
                title="People"
                count={2}
                onAdd={() => console.log("Settings")}
                settingsIcon={true}
              />
              <div className="grid grid-cols-3 gap-4">
                {people.map((person) => (
                  <PersonCard key={person.id} {...person} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Projects Section */}
            <div className="bg-gray-100 rounded-xl p-6">
              <SectionHeader
                title="Projects"
                count={2}
                onAdd={() => console.log("Add project")}
              />
              <div className="space-y-4">
                {projects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
