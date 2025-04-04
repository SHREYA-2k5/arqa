import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
     <div>
        <div>
          <Navbar />
          <div className="flex justify-center"> 
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/start" element={<Start />} />
            </Routes>
          </div>
        </div>
      </div> 
    </Router>
  );
}

export default App;