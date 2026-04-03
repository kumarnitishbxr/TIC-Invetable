import React from 'react';
import { checkAuth } from './store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import EmployerDashboard from './pages/EmployerDashboard';
import AboutPage from './pages/AboutPage';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import JobPost from './pages/JobPost';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './components/ContactPage';
import Applications from './components/Applications';
import HeaderSwitcher from './components/HeaderSwitcher';
import ApplicationForm from './components/ApplicationForm';
import JobPage from './pages/JobPage';
import FeaturesPage from './pages/FeaturesPage';
import FAQ from './pages/FAQ';
import HowItWorks from './components/HowitWork'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';


function App() {

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state=>state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <HeaderSwitcher/>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
       
        <Route path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        ></Route>

        <Route path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
        ></Route>

        <Route path="/user/dashboard" 
          element={isAuthenticated ? <EmployerDashboard/> : <Signup />} 
        ></Route>
        <Route path="/user/profile"
          element={isAuthenticated ? <ProfilePage/> : <Navigate to="/login" />}
        ></Route>

        <Route path="/featurespage"
          element={<FeaturesPage/>}
        ></Route>

        <Route path="/aboutpage"
          element={<AboutPage/>}
        ></Route>

        <Route path="/jobspage"
          element={isAuthenticated ? <Jobs/> : <Navigate to="/login" />}
        ></Route>

        <Route path="/jobsdetails"
          element={<JobDetails/>}
        ></Route>

        <Route path="/jobpost"
          element={isAuthenticated ? <JobPost/> : <Navigate to="/login"/>}
        ></Route>

        {/* <Route
          path="/disputes"
          element={<Disputes/>}
        ></Route> */}

         <Route path="/contactpage"
          element={<ContactPage/>}
        ></Route>

        <Route path="/applicationform"
          element={isAuthenticated ? <ApplicationForm/> : <Navigate to="/login" />}
        ></Route>

        

        <Route path="/application"
          element={ <Applications/> }
        ></Route>

        <Route path="/jobpage"
          element={ <JobPage/> }
        ></Route>

        <Route path="/faq"
          element={<FAQ/>}
        ></Route>

         <Route path="/howitwork"
          element={<HowItWorks/>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App
