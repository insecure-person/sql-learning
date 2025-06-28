import React from 'react';
import { Group } from '../types';
import Character3D from './Character3D';
import LocalCharacter3D from './LocalCharacter3D';
import { Trophy, Users } from 'lucide-react';

interface LearnerViewProps {
  groups: Group[];
  onGroupClick: (group: Group) => void;
  isSleepingTime: boolean;
  isAdmin: boolean;
}

const LearnerView: React.FC<LearnerViewProps> = ({ 
  groups, 
  onGroupClick, 
  isSleepingTime, 
  isAdmin 
}) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
          SQL Learning Groups
        </h1>
        <p className="text-gray-400">Track your team's progress and compete with others</p>
        {isAdmin && (
          <p className="text-sm text-purple-400 mt-2">Admin Mode: Click on groups to manage them</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group, index) => (
          <div
            key={group.id}
            onClick={() => onGroupClick(group)}
            className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:from-white/15 hover:to-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer hover:scale-105"
          >
            {/* Rank Badge */}
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-black">
              {index + 1}
            </div>

            {/* Character or 3D Model */}
            <div className="flex justify-center mb-4">
              {group.id === '1' ? (
                <LocalCharacter3D
                  character={group.character}
                  isSleeping={isSleepingTime}
                  size="large"
                />
              ) : (
                <Character3D
                  character={group.character}
                  isSleeping={isSleepingTime}
                  size="large"
                />
              )}
            </div>

            {/* Group Info */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {group.name}
              </h3>
              
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Trophy className="w-4 h-4" />
                  <span className="font-bold">{group.points}</span>
                </div>
                <div className="flex items-center space-x-1 text-blue-400">
                  <Users className="w-4 h-4" />
                  <span>{group.members.length}</span>
                </div>
              </div>

              {/* Members Preview */}
              <div className="text-sm text-gray-400">
                <p>{group.members.slice(0, 2).join(', ')}</p>
                {group.members.length > 2 && (
                  <p>+{group.members.length - 2} more</p>
                )}
              </div>
            </div>

            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-transparent to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Admin Credentials Info */}
      {!isAdmin && (
        <div className="mt-12 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-md mx-auto">
          <h3 className="text-lg font-bold text-white mb-3">Admin Access</h3>
          <div className="text-sm text-gray-300 space-y-1">
            <p><span className="text-purple-400">ID:</span> admin</p>
            <p><span className="text-purple-400">Password:</span> sql2025</p>
          </div>
          <p className="text-xs text-gray-400 mt-3">Use these credentials to access admin features</p>
        </div>
      )}
    </div>
  );
};

export default LearnerView;