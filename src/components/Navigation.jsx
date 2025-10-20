import React, { useState } from "react";
import {
  Home,
  CheckSquare,
  Settings,
  Users,
  ChevronDown,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SidebarNavigation = () => {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,
      name: "Acme Corp",
      projects: [
        { id: 1, name: "Mobile App Development" },
        { id: 2, name: "Website Redesign" },
      ],
    },
    {
      id: 2,
      name: "Tech Startup",
      projects: [
        { id: 3, name: "Product Launch" },
        { id: 4, name: "Marketing Campaign" },
      ],
    },
  ]);

  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");

  const menuItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "tasks", icon: CheckSquare, label: "My Tasks", path: "/tasks" },
    { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
    { id: "members", icon: Users, label: "Members", path: "/members" },
  ];

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="font-semibold text-gray-900">Logoipsum</span>
        </div>
      </div>

      {/* Workspace Selector */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2 px-2">
          <span>WORKSPACES</span>
          <button className="w-5 h-5 rounded hover:bg-gray-200 flex items-center justify-center">
            <Plus size={14} />
          </button>
        </div>

        <button
          onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-semibold text-xs">
                {getInitial(selectedWorkspace.name)}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {selectedWorkspace.name}
            </span>
          </div>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${
              isWorkspaceOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Workspace Dropdown */}
        {isWorkspaceOpen && (
          <div className="mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
            {workspaces.map((workspace, index) => (
              <button
                key={workspace.id}
                onClick={() => {
                  setSelectedWorkspace(workspace);
                  setIsWorkspaceOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {getInitial(workspace.name)}
                  </span>
                </div>
                <span className="text-sm text-gray-700">{workspace.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  setActiveMenu(item.id);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                  activeMenu === item.id
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Projects Section */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2 px-2">
            <span>PROJECTS</span>
            <button className="w-5 h-5 rounded hover:bg-gray-200 flex items-center justify-center">
              <Plus size={14} />
            </button>
          </div>

          <div className="space-y-1">
            {selectedWorkspace.projects.map((project, index) => (
              <button
                key={project.id}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-xs">
                    {getInitial(project.name)}
                  </span>
                </div>
                <span className="text-sm text-gray-700 truncate">
                  {project.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
