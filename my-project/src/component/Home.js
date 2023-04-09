import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="home-background" />
      <div className="home-content">
        <h1 className="home-title">Welcome to Our Company</h1>
        <p className="home-subtitle">Click&nbsp;
          <Link to="/login" className="home-link">
            here
          </Link> to login.
        </p>
      </div>
    </div>
  );
};

export default Home;
