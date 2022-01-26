import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://fakestoreapi.com/auth/login', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token);
      sessionStorage.setItem('token',JSON.stringify(response.data.token))
      localStorage.setItem('token',JSON.stringify(response.data.token))
      props.history.push('/dashboard');
    }).catch(error => {
      console.log(error)
      setLoading(false);
      if (error.response.status === 401) 
      setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }


  return (
    <div className='page'>
      <div className='card'>
        Login<br /><br />
        <div>
          <label class="form-label">Username</label>
          <input type="text" className='form-control' {...username} autoComplete="new-password" />
        </div>
        <div style={{ marginTop: 10 }}>
          <label class="form-label">Password</label>
          <input type="password" className='form-control' {...password} autoComplete="new-password" />
        </div>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        <input type="button" value={loading ? 'Loading...' : 'Login'} className='btn-primary' onClick={handleLogin} disabled={loading} /><br />
      </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;