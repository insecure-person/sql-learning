import React, { useState } from 'react';
import { mockGroups, sessions, adminCredentials } from './data/mockData';
import { Group, Session, User } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTimeBasedExpression } from './hooks/useTimeBasedExpression';
import LearnerView from './components/LearnerView';
import GroupDetailView from './components/GroupDetailView';
import ContentView from './components/ContentView';
import Sidebar from './components/Sidebar';
import LoginModal from './components/LoginModal';
import Header from './components/Header';

function App() {
  const [groups, setGroups] = useLocalStorage<Group[]>('sql-groups', mockGroups);
  const [sessionsData, setSessionsData] = useLocalStorage<Session[]>('sql-sessions', sessions);
  const [user, setUser] = useState<User>({ isAdmin: false });
  const [currentView, setCurrentView] = useState<'learner' | 'content' | 'group'>('learner');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isSleepingTime = useTimeBasedExpression();

  const handleLogin = (id: string, password: string) => {
    if (id === adminCredentials.id && password === adminCredentials.password) {
      setUser({ isAdmin: true, adminCredentials });
      setShowLoginModal(false);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser({ isAdmin: false });
    setCurrentView('learner');
  };

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
    setCurrentView('group');
  };

  const handleBackToLearner = () => {
    setCurrentView('learner');
    setSelectedGroup(null);
  };

  const handleUpdateGroup = (updatedGroup: Group) => {
    setGroups(prevGroups => 
      prevGroups.map(g => g.id === updatedGroup.id ? updatedGroup : g)
    );
    setSelectedGroup(updatedGroup);
  };

  const sortedGroups = [...groups].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-yellow-900/10 pointer-events-none"></div>
      
      <Header 
        user={user} 
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      <div className="flex">
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          onBackToLearner={handleBackToLearner}
          isVisible={currentView !== 'group'}
        />

        <main className={`flex-1 transition-all duration-300 ${
          currentView !== 'group' ? 'ml-64' : ''
        }`}>
          {currentView === 'learner' && (
            <LearnerView
              groups={sortedGroups}
              onGroupClick={handleGroupClick}
              isSleepingTime={isSleepingTime}
              isAdmin={user.isAdmin}
            />
          )}

          {currentView === 'content' && (
            <ContentView sessions={sessionsData} />
          )}

          {currentView === 'group' && selectedGroup && (
            <GroupDetailView
              group={selectedGroup}
              onBackToLearner={handleBackToLearner}
              onUpdateGroup={handleUpdateGroup}
              isAdmin={user.isAdmin}
            />
          )}
        </main>
      </div>

      {showLoginModal && (
        <LoginModal
          onLogin={handleLogin}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}

export default App;