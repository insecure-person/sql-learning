import React from 'react';
import { Home, BookOpen } from 'lucide-react';

interface SidebarProps {
  currentView: 'learner' | 'content' | 'group';
  onViewChange: (view: 'learner' | 'content') => void;
  onBackToLearner?: () => void;
  isVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isVisible }) => {
  if (!isVisible) return null;

  const menuItems = [
    {
      id: 'learner' as const,
      label: 'Groups',
      icon: Home,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'content' as const,
      label: 'Content',
      icon: BookOpen,
      gradient: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black/40 backdrop-blur-sm border-r border-white/10 z-20">
      <div className="pt-24 p-6">
        <nav className="space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;