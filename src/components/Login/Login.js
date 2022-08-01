import React from 'react';
import './Login.css'

const Login = () => {
  return (
    <div className="ot">
      <input type="text" placeholder="username" />
      <input type="text1" placeholder="password" />
      <button className="login">Sign in</button>
    </div>
  );
}

export default Login;
