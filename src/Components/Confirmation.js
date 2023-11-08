import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateConfirmation } from '../store/authSlice';

const Confirmation = () => {
  const { emailToken } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState({ verification: 'loading' });

  useEffect(() => {
    const sendConfirmation = async () => {
      setResult(await updateConfirmation(emailToken));
    };
    sendConfirmation();
  }, []);

  return (
    <div>
      <h1>{`Confirmation Status: ${result.verification}`}</h1>
    </div>
  );
};

export default Confirmation;
