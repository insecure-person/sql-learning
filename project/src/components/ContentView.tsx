import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Circle } from 'lucide-react';
import { Session } from '../types';

interface ContentViewProps {
  sessions: Session[];
}

const ContentView: React.FC<ContentViewProps> = ({ sessions }) => {
  const [expandedSessions, setExpandedSessions] = useState<number[]>([]);

  const toggleSession = (sessionId: number) => {
    setExpandedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const isSessionCompleted = (sessionDate: string) => {
    const sessionDateObj = new Date(sessionDate);
    const today = new Date();
    return sessionDateObj <= today;
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            Course Content
          </h1>
          <p className="text-gray-400">Complete SQL curriculum across 4 comprehensive sessions</p>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => {
            const isExpanded = expandedSessions.includes(session.id);
            const isCompleted = isSessionCompleted(session.date);

            return (
              <div
                key={session.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleSession(session.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white">{session.title}</h3>
                      <p className="text-sm text-gray-400">{session.date}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-white/10">
                    <div className="pt-4 space-y-3">
                      {session.topics.map((topic, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300 text-sm leading-relaxed">{topic}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Progress Summary</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-white/10 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-teal-400 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(sessions.filter(s => isSessionCompleted(s.date)).length / sessions.length) * 100}%`
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-400">
              {sessions.filter(s => isSessionCompleted(s.date)).length} of {sessions.length} sessions completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentView;