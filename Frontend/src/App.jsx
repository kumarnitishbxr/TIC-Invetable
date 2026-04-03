import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import HeaderSwitcher from './components/HeaderSwitcher';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Signup';

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
                element={isAuthenticated ? <Navigate to="/" /> : <Reg />}
              ></Route>
          </Routes>
      </Router>
  )
}

export default App
