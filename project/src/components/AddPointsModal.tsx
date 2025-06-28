import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

interface AddPointsModalProps {
  onAddPoints: (points: number, reason: string, type: 'add' | 'deduct') => void;
  onClose: () => void;
}

const AddPointsModal: React.FC<AddPointsModalProps> = ({ onAddPoints, onClose }) => {
  const [points, setPoints] = useState('');
  const [reason, setReason] = useState('');
  const [type, setType] = useState<'add' | 'deduct'>('add');
  const [errors, setErrors] = useState<{ points?: boolean; reason?: boolean }>({});
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { points?: boolean; reason?: boolean } = {};
    
    if (!points.trim() || isNaN(Number(points)) || Number(points) <= 0) {
      newErrors.points = true;
    }
    
    if (!reason.trim()) {
      newErrors.reason = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    onAddPoints(Number(points), reason, type);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 w-full max-w-md mx-4 ${
        isShaking ? 'animate-pulse' : ''
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Manage Points
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selection */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setType('add')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                type === 'add'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                  : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Points</span>
            </button>
            <button
              type="button"
              onClick={() => setType('deduct')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                type === 'deduct'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
                  : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Minus className="w-4 h-4" />
              <span>Deduct Points</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Points</label>
            <input
              type="number"
              value={points}
              onChange={(e) => {
                setPoints(e.target.value);
                setErrors(prev => ({ ...prev, points: false }));
              }}
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.points ? 'border-red-500' : 'border-white/20'
              } rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400`}
              placeholder="Enter points amount"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setErrors(prev => ({ ...prev, reason: false }));
              }}
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.reason ? 'border-red-500' : 'border-white/20'
              } rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400 resize-none`}
              placeholder="Enter reason for points change"
              rows={3}
            />
          </div>

          {(errors.points || errors.reason) && (
            <p className="text-red-400 text-sm text-center">
              Please fill in all required fields
            </p>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 py-3 px-4 rounded-lg text-white transition-all duration-200 ${
                type === 'add'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700'
              }`}
            >
              {type === 'add' ? 'Add Points' : 'Deduct Points'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPointsModal;