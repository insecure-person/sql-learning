import React from 'react';
import { LogOut, LogIn, Database } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogout }) => {
  return (
    <header className="relative z-30 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-lg flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
              SQL Mastery
            </h1>
            <p className="text-sm text-gray-400">Interactive Learning Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user.isAdmin && (
            <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-medium">
              Admin
            </span>
          )}
          
          {user.isAdmin ? (
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              <LogIn className="w-4 h-4" />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;