import React from 'react';
//import './SignupForm.css'; // import CSS file for styling

const SignupForm = () => {
  return (
    <div className="signup">
      <div className="signup-background"></div> {/* empty div for background image */}
      <div className="signup-content">
        <h1 className="signup-title">Create an Account</h1>
        <form className="signup-form">
          <div className="signup-form-group">
            <label className="signup-label" htmlFor="name">Full Name</label>
            <input className="signup-input" type="text" id="name" name="name" required />
          </div>
          <div className="signup-form-group">
            <label className="signup-label" htmlFor="email">Email Address</label>
            <input className="signup-input" type="email" id="email" name="email" required />
          </div>
          <div className="signup-form-group">
            <label className="signup-label" htmlFor="password">Password</label>
            <input className="signup-input" type="password" id="password" name="password" required />
          </div>
          <button className="signup-button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
