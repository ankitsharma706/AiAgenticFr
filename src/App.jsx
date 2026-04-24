import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import Reports from './pages/Reports';
import Account from './pages/Account';
import { ThemeProvider } from './context/ThemeContext';

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();
  
  return (
    <div className="flex min-h-screen bg-bg-primary text-text-main overflow-x-hidden">
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0 -ml-64'}`}>
        <Sidebar />
      </div>
      <main className={`flex-1 min-h-screen relative transition-all duration-300`}>
        <div className="p-8 pt-0">
          <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
          <div className="mt-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
