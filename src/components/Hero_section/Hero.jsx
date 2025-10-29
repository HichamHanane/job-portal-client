import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../../assets/Job_animation.json';
import './Hero.css';

const Hero = () => {
  return (
    // Main Hero Container
    <section className="hero-section">

      {/* Left Side: Text and CTA */}
      <div className="hero-left">
        <h1 className="hero-headline">
          Unlock Your Future. <br />
          Find Your Dream Job
        </h1>

        <p className="hero-description">
          Discover thousands of opportunities. Connect with top companies. Start your career journey today.
        </p>

        {/* CTA Button */}
        <Link to="/jobs" className="btn btn-get-started">
          Start Your Search
          <span className="arrow"> &rarr;</span>
        </Link>
      </div>

      {/* Right Side: Lottie Animation */}
      <div className="hero-right">
        <Lottie
          animationData={animationData}
          loop={true}
          className="hero-animation"
        />
      </div>
    </section>
  );
};

export default Hero;