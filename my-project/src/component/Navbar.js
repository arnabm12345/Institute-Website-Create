import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
         <Link to="/" >
      <div className="navbar-logo">
        <img src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" alt="Company Logo" />
      </div>
      </Link>
      <div className="navbar-address">
      <p>Company Address</p>
        <p>Email: info@company.com</p>
        <p>Phone: +1 (123) 456-7890</p>
      </div>
      <div className="navbar-buttons">
      <Link to="/login" > <button className="login-button">Log in</button> </Link>
      <Link to="/signup" > <button className="signup-button">Sign up</button> </Link>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search" />
        <button className="search-button">Search</button>
      </div>
    </nav>
  );
};

export default Navbar;
