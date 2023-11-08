import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const authInfo = useSelector(state => state.auth.info);

  return (
    <div>
      <h1> Welcome </h1>
      {authInfo.id ? (
        <Link to='/profile'>Profile</Link>
      ) : (
        <Link to='/login'>Login</Link>
      )}
    </div>
  );
};

export default Home;
