import React, { useEffect } from 'react';
import { checkAuth } from './store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import EmployerDashboard from './pages/EmployerDashboard';
import AboutPage from './pages/AboutPage';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './components/ContactPage';
import Applications from './components/Applications';
import HeaderSwitcher from './components/HeaderSwitcher';
import ApplicationForm from './components/ApplicationForm';
import JobPage from './pages/JobPage';
import FeaturesPage from './pages/FeaturesPage';
import FAQ from './pages/FAQ';
import HowItWorks from './components/HowitWork';
import CreateJobPage from './pages/CreateJobPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <HeaderSwitcher />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
        />

        <Route
          path="/user/dashboard"
          element={isAuthenticated ? <EmployerDashboard /> : <Signup />}
        />

        <Route
          path="/user/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />

        <Route path="/featurespage" element={<FeaturesPage />} />

        <Route path="/aboutpage" element={<AboutPage />} />

        <Route
          path="/jobspage"
          element={isAuthenticated ? <Jobs /> : <Navigate to="/login" />}
        />

        <Route path="/jobsdetails" element={<JobDetails />} />

        {/* ✅ Updated Route */}
        <Route
          path="/jobpost"
          element={
            isAuthenticated ? <CreateJobPage /> : <Navigate to="/login" />
          }
        />

        <Route path="/contactpage" element={<ContactPage />} />

        <Route
          path="/applicationform"
          element={
            isAuthenticated ? <ApplicationForm /> : <Navigate to="/login" />
          }
        />

        <Route path="/application" element={<Applications />} />

        <Route path="/jobpage" element={<JobPage />} />

        <Route path="/faq" element={<FAQ />} />

        <Route path="/howitwork" element={<HowItWorks />} />
      </Routes>
    </Router>
  );
}

export default App;