// src/components/About.js
import React from 'react';
import { Helmet } from "react-helmet-async";
import '../styles/About.css'; // Import the CSS file specific to About component

function About() {
  return (
<>
    <Helmet>
            <title>About</title>
            <meta name="description" content="Discover effective investment strategies, financial planning tips, and portfolio diversification techniques for wealth accumulation." />
            <meta name="keywords" content="Investment strategies, Financial planning, Wealth accumulation, Asset allocation, Economic growth, Cryptocurrency, Portfolio diversification, Risk assessment, Stock market, Mutual funds, Financial independence, Retirement planning, Sustainable investing, Market trends" />
    </Helmet>
    <div className="about">
      <h1>About Us</h1>
      <p>
        Welcome to our website! We are a team of passionate developers working
        on building great web applications. Our mission is to create high-quality
        and user-friendly software that solves real-world problems.
      </p>
      <h2>Our Story</h2>
      <p>
        It all started with a simple idea: to help businesses grow by providing
        powerful, yet easy-to-use digital solutions. Since then, we’ve worked with
        a variety of clients and industries, and our team has expanded to include
        designers, engineers, and strategists.
      </p>
      <h2>Our Values</h2>
      <ul>
        <li>Innovation</li>
        <li>Collaboration</li>
        <li>Customer-centricity</li>
        <li>Excellence</li>
      </ul>
    </div>
</>
  );
}

export default About;

