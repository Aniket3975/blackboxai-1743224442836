import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import DiscoverPage from './pages/DiscoverPage';
import MessagesPage from './pages/MessagesPage';
import InterestsPage from './pages/InterestsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/interests" element={<InterestsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;