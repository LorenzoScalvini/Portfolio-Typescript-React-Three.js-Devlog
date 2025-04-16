import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Location
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './App.css';

export default function App(): React.ReactElement {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true); 
  const location: Location = useLocation();

  useEffect(() => {
    if (!isInitialLoad) {
      setLoading(true);
      const timer: number = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsInitialLoad(false); 
    }
  }, [location.pathname, isInitialLoad]);

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <ScrollToTop />
      <Footer />
    </>
  );
}