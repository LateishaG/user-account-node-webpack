import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../store/authSlice';

const CreateAccount = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    username: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = ev => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const create = ev => {
    ev.preventDefault();
    dispatch(register(credentials));
    navigate('/');
  };

  return (
    <div>
      <h1>Create Account</h1>
      <button onClick={() => navigate('/login')}>Login</button>
      <Link to='/'>Home</Link>

      <form onSubmit={create}>
        <label htmlFor='email'>Email: </label>
        <input
          id='email'
          name='email'
          value={credentials.email}
          onChange={onChange}
        />
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

export default CreateAccount;
