import React, { useState } from 'react';
import { X, Lock, User } from 'lucide-react';

interface LoginModalProps {
  onLogin: (id: string, password: string) => boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id.trim() || !password.trim()) {
      setError('Both ID and password are required');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    const success = onLogin(id, password);
    if (!success) {
      setError('Invalid credentials');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 w-full max-w-md mx-4 ${
        isShaking ? 'animate-pulse' : ''
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Login
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Admin ID</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  setError('');
                }}
                className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                  error && !id.trim() ? 'border-red-500' : 'border-white/20'
                } rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400`}
                placeholder="Enter admin ID"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                  error && !password.trim() ? 'border-red-500' : 'border-white/20'
                } rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400`}
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
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
              className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;