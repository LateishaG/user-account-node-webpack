import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { attemptLogin } from '../store/authSlice';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = ev => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = ev => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate('/');
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => navigate('/createaccount')}>Create Account</button>
      <Link to='/'>Home</Link>

      <form onSubmit={login}>
        <label htmlFor='usr'>Username: </label>
        <input
          id='usr'
          name='username'
          value={credentials.username}
          onChange={onChange}
        />
        <label htmlFor='pas'>Password: </label>
        <input
          id='pas'
          name='password'
          value={credentials.password}
          onChange={onChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
