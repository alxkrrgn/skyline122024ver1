// src/components/About.js
import React, { useEffect, useState } from 'react';
import '../styles/About.css'; // Import the CSS file specific to About component
import CardContainerDashboard from './CardContainerDashboard';
import FinancialDashboard from './FinancialDashboard';
import { useNavigate } from 'react-router-dom'; // Ensure React Router is set up
import NavigationMenu from './NavigationMenu';
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            setUserData(JSON.parse(storedData));
        } else {
            // Redirect to login if no session data is available
            window.location.href = '/login';
        }
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }
  return (

    <>
    <Helmet>
            <title>Home</title>
            <meta name="description" content="Discover effective investment strategies, financial planning tips, and portfolio diversification techniques for wealth accumulation." />
            <meta name="keywords" content="Investment strategies, Financial planning, Wealth accumulation, Asset allocation, Economic growth, Cryptocurrency, Portfolio diversification, Risk assessment, Stock market, Mutual funds, Financial independence, Retirement planning, Sustainable investing, Market trends" />
    </Helmet>
    <section>
{/*
    <div className="dashboard">
            <h1>Welcome to the Dashboard</h1>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            {/* Avoid displaying password in production */}
            {/* 
            <p><strong>Password:</strong> {userData.password}</p>        
        </div>
        </div>
        */}
    <FinancialDashboard />
    <section>

<div className="parallaxPUC" >
  <h2></h2>
  <p></p>
</div>

</section>

    <CardContainerDashboard />
    <NavigationMenu />

    </section>

    </>

  );
}

export default Dashboard;

