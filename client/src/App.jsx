import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import DashPage from './pages/DashPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import Connect from './pages/connect';
import NGORegistrationForm from './pages/NGORegistrationForm';

function App() {
  return (
    <Router>
     <div>
        <div className='flex flex-col min-h-screen '>
          <Navbar />
          <div className="flex-grow justify-center"> 
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/prebook" element={<BookingPage />} />
              <Route path="/dash" element={<DashPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/ngoreg" element={<NGORegistrationForm/>} />
              <Route path="/Connect" element={<Connect/>} />
             

            </Routes>
          </div>
        </div>
      </div> 
    </Router>
  );
}

export default App;