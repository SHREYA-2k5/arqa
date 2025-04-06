import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import DashPage from './pages/DashPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import Connect from './pages/connect';
import NGORegistrationForm from './pages/NGORegistrationForm';
import { AuthProvider, useAuth } from './context/AuthContext';
import SplashScreen from './components/SplashScreen';

// Protected route component
const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to={currentUser.role === 'admin' ? '/dash' : '/prebook'} replace />;
  }
  
  return element;
};

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/prebook" 
            element={<ProtectedRoute element={<BookingPage />} allowedRoles={['student']} />} 
          />
          <Route 
            path="/dash" 
            element={<ProtectedRoute element={<DashPage />} allowedRoles={['admin']} />} 
          />
          <Route 
            path="/profile" 
            element={<ProtectedRoute element={<ProfilePage />} allowedRoles={['admin', 'student']} />} 
          />
          <Route path="/ngoreg" element={<NGORegistrationForm />} />
          <Route path="/connect" element={<Connect />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Optional: You can add logic here to check if splash screen should be skipped
    // For example, if user is already authenticated
  }, []);

  return (
    <Router>
      <AuthProvider>
        {showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        ) : (
          <AppContent />
        )}
      </AuthProvider>
    </Router>
  );
}

export default App;