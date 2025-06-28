import React from 'react';
import { Group } from '../types';

interface Character3DProps {
  character: Group['character'];
  isSleeping: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Character3D: React.FC<Character3DProps> = ({ character, isSleeping, size = 'medium' }) => {
  const getCharacterGradient = () => {
    switch (character.type) {
      case 'athletic-woman':
        return 'from-pink-400 via-purple-400 to-indigo-400';
      case 'athletic-men':
        return 'from-blue-400 via-cyan-400 to-teal-400';
      case 'scholar':
        return 'from-amber-400 via-orange-400 to-red-400';
      case 'trainer':
        return 'from-green-400 via-emerald-400 to-teal-400';
      case 'student':
        return 'from-violet-400 via-purple-400 to-fuchsia-400';
      case 'mentor':
        return 'from-slate-400 via-gray-400 to-zinc-400';
      default:
        return 'from-blue-400 via-purple-400 to-pink-400';
    }
  };

  const getExpression = () => {
    if (isSleeping) return 'sleeping';
    return character.expression;
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-16 h-20';
      case 'large':
        return 'w-32 h-40';
      default:
        return 'w-24 h-28';
    }
  };

  const getAnimationClass = () => {
    const expression = getExpression();
    switch (expression) {
      case 'sleeping':
        return 'animate-pulse';
      case 'breathing':
        return 'animate-pulse';
      case 'excited':
        return 'animate-pulse';
      case 'happy':
        return 'hover:scale-105 transition-transform duration-300';
      default:
        return 'hover:scale-105 transition-transform duration-300';
    }
  };

  const getFaceExpression = () => {
    const expression = getExpression();
    switch (expression) {
      case 'sleeping':
        return '😴';
      case 'happy':
        return '😊';
      case 'focused':
        return '🧐';
      case 'excited':
        return '🤩';
      case 'thinking':
        return '🤔';
      case 'breathing':
        return '😌';
      default:
        return '😊';
    }
  };

  return (
    <div className={`relative ${getSizeClasses()} ${getAnimationClass()}`}>
      {/* Character Body */}
      <div className={`w-full h-full bg-gradient-to-br ${getCharacterGradient()} rounded-2xl shadow-lg relative overflow-hidden`}>
        {/* Character Face */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-2xl">
          {getFaceExpression()}
        </div>
        
        {/* Character Body Details */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white bg-opacity-30 rounded-full"></div>
        
        {/* Shadow/Depth Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black from-0% to-transparent to-50% opacity-10 rounded-2xl"></div>
        
        {/* Highlight Effect */}
        <div className="absolute top-1 left-1 w-3 h-3 bg-white bg-opacity-40 rounded-full blur-sm"></div>
      </div>
      
      {/* Character Shadow */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-black bg-opacity-20 rounded-full blur-sm"></div>
    </div>
  );
};

export default Character3D;