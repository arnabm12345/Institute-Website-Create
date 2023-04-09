import React from 'react';

const Login = () => {
  return (
    <div className="login">
      <div className="login-background" />
      <div className="login-content">
        <div className="login-form">
          <h1 className="login-title">Login</h1>
          <form>
            <div className="login-form-group">
              <label htmlFor="username" className="login-label">
                Username
              </label>
              <input type="text" id="username" className="login-input" />
            </div>
            <div className="login-form-group">
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <input type="password" id="password" className="login-input" />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
