import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import DashPage from './pages/DashPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import Connect from './pages/connect';
import NGORegistrationForm from './pages/NGORegistrationForm';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles.length && !allowedRoles.includes(currentUser.role)) {
    // Redirect to appropriate page based on role
    if (currentUser.role === 'admin') {
      return <Navigate to="/dash" />;
    } else {
      return <Navigate to="/prebook" />;
    }
  }
  
  return element;
};

function AppContent() {
  return (
    <div>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className="flex-grow justify-center">
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
            <Route path="/Connect" element={<Connect />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
          <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;