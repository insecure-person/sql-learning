import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Edit3, Save, X, Users, Trophy, Calendar } from 'lucide-react';
import { Group, Transaction } from '../types';
import Character3D from './Character3D';
import LocalCharacter3D from './LocalCharacter3D';
import { useTimeBasedExpression } from '../hooks/useTimeBasedExpression';
import AddPointsModal from './AddPointsModal';

interface GroupDetailViewProps {
  group: Group;
  onBackToLearner: () => void;
  onUpdateGroup: (group: Group) => void;
  isAdmin: boolean;
}

const GroupDetailView: React.FC<GroupDetailViewProps> = ({
  group,
  onBackToLearner,
  onUpdateGroup,
  isAdmin
}) => {
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(group.name);
  const [showAddPoints, setShowAddPoints] = useState(false);
  const [newMember, setNewMember] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);
  const isSleepingTime = useTimeBasedExpression();

  const handleNameUpdate = () => {
    if (newName.trim() && newName !== group.name) {
      onUpdateGroup({ ...group, name: newName.trim() });
    }
    setEditingName(false);
  };

  const handleRemoveMember = (memberIndex: number) => {
    const updatedMembers = group.members.filter((_, index) => index !== memberIndex);
    onUpdateGroup({ ...group, members: updatedMembers });
  };

  const handleAddMember = () => {
    if (newMember.trim() && !group.members.includes(newMember.trim())) {
      const updatedMembers = [...group.members, newMember.trim()];
      onUpdateGroup({ ...group, members: updatedMembers });
      setNewMember('');
      setShowAddMember(false);
    }
  };

  const handleAddPoints = (points: number, reason: string, type: 'add' | 'deduct') => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      points,
      reason,
      timestamp: new Date(),
      type
    };

    const pointsChange = type === 'add' ? points : -points;
    const updatedGroup = {
      ...group,
      points: Math.max(0, group.points + pointsChange),
      transactions: [newTransaction, ...group.transactions]
    };

    onUpdateGroup(updatedGroup);
    setShowAddPoints(false);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBackToLearner}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Groups</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Group Header */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-8">
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
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                {editingName && isAdmin ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="text-3xl font-bold bg-transparent border-b-2 border-purple-400 outline-none text-white"
                      onKeyPress={(e) => e.key === 'Enter' && handleNameUpdate()}
                    />
                    <button
                      onClick={handleNameUpdate}
                      className="p-2 text-green-400 hover:text-green-300"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingName(false);
                        setNewName(group.name);
                      }}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                      {group.name}
                    </h1>
                    {isAdmin && (
                      <button
                        onClick={() => setEditingName(true)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-yellow-400">
                  <Trophy className="w-5 h-5" />
                  <span className="text-2xl font-bold">{group.points}</span>
                  <span className="text-sm text-gray-400">points</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-400">
                  <Users className="w-5 h-5" />
                  <span className="text-lg font-semibold">{group.members.length}</span>
                  <span className="text-sm text-gray-400">members</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Members */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Team Members</h2>
              {isAdmin && (
                <button
                  onClick={() => setShowAddMember(true)}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  + Add Member
                </button>
              )}
            </div>

            <div className="space-y-3">
              {group.members.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white">{member}</span>
                  {isAdmin && (
                    <button
                      onClick={() => handleRemoveMember(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              {showAddMember && isAdmin && (
                <div className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg">
                  <input
                    type="text"
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    placeholder="Enter member name"
                    className="flex-1 bg-transparent border-b border-purple-400 outline-none text-white placeholder-gray-400"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
                  />
                  <button
                    onClick={handleAddMember}
                    className="text-green-400 hover:text-green-300"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMember(false);
                      setNewMember('');
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Transaction History</h2>
              {isAdmin && (
                <button
                  onClick={() => setShowAddPoints(true)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Points</span>
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {group.transactions.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No transactions yet</p>
              ) : (
                group.transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white text-sm">{transaction.reason}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">
                          {transaction.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className={`font-bold ${
                      transaction.type === 'add' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'add' ? '+' : '-'}{transaction.points}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showAddPoints && (
        <AddPointsModal
          onAddPoints={handleAddPoints}
          onClose={() => setShowAddPoints(false)}
        />
      )}
    </div>
  );
};

export default GroupDetailView;