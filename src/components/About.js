// src/components/About.js
import React from 'react';
import { Helmet } from "react-helmet-async";
import '../styles/About.css'; // Import the CSS file specific to About component

function About() {
  return (
<>
<section>
  <main>
    <Helmet>
            <title>About</title>
            <meta name="description" content="Discover effective investment strategies, financial planning tips, and portfolio diversification techniques for wealth accumulation." />
            <meta name="keywords" content="Investment strategies, Financial planning, Wealth accumulation, Asset allocation, Economic growth, Cryptocurrency, Portfolio diversification, Risk assessment, Stock market, Mutual funds, Financial independence, Retirement planning, Sustainable investing, Market trends" />
    </Helmet>
    <div className="about">
      <h1>Our Mission</h1>
      <p>
      Our firm offers investors a cutting-edge alternative to traditional investment vehicles.
      By employing advanced risk management techniques, innovative portfolio strategies, 
      and sophisticated hedge strategies, we aim to deliver superior returns compared to 
      conventional mutual funds and portfolio management methods.
      </p>
      <h1>About Us</h1>
      <p>
      We leverage mathematical and statistical methods, 
      quantitative analysis, and artificial intelligence in both 
      the design and execution of our investment programs. 
      This data-driven approach allows us to rigorously assess 
      and manage risk while identifying the highest and best uses of capital. 
      Our ultimate goal is to generate superior long-term returns 
      for our investors, consistently outperforming traditional market strategies.
      </p>
      <h1>Our Values</h1>
      <ul>
        <li>Innovation</li>
        <li>Collaboration</li>
        <li>Customer-centricity</li>
        <li>Excellence</li>
      </ul>
    </div>
    </main>
</section>    
</>
  );
}

export default About;

