import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Confirmation from './Confirmation';
import CreateAccount from './CreateAccount';
import { loginWithToken, logout } from '../store/authSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  //todo: have logout/ no auth remove access to certain pages, also add visual for login/logout status

  return (
    <div>
      <h1>Acme Test</h1>

      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/createaccount'
          element={<CreateAccount />}
        />
        <Route
          path='/profile'
          element={<Profile />}
        />
        <Route
          path='/confirmation/:emailToken'
          element={<Confirmation />}
        />
      </Routes>
    </div>
  );
};

export default App;
