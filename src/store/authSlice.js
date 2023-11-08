import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    info: {}
  },
  reducers: {
    setAuth: (state, action) => {
      state.info = action.payload;
    }
  }
});

const { setAuth } = authSlice.actions;

export const logout = dispatch => {
  window.localStorage.removeItem('token');
  dispatch(setAuth({}));
};

export const loginWithToken = () => async dispatch => {
  const token = window.localStorage.getItem('token');
  if (token) {
    const response = await axios.get('/api/auth', {
      headers: {
        authorization: token
      }
    });
    dispatch(setAuth(response.data));
  }
};

export const attemptLogin = credentials => async dispatch => {
  const response = await axios.post('/api/auth', credentials);
  window.localStorage.setItem('token', response.data);
  dispatch(loginWithToken());
};

export const register = credentials => async dispatch => {
  const response = await axios.post('/api/auth/register', credentials);
  window.localStorage.setItem('token', response.data);
  dispatch(loginWithToken());
};

export const updateConfirmation = async emailToken => {
  const response = await axios.put('/api/auth/confirmation/email', {
    token: emailToken
  });
  return response.data;
};

export default authSlice.reducer;
