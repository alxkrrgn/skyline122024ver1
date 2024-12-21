// src/components/About.js
import React from 'react';
import '../styles/About.css'; // Import the CSS file specific to About component
import '../styles/App.css';
import FlexBoxStrategiesTopics from './FlexBoxStrategiesTopics';
import FullWidthTitle from './FullWidthTitle';
import FwtStocks from './FwtStocks';
import FlexBoxStocks from './FlexBoxStocks';
import FwtStockOptions from './FwtStockOptions';
import FlexBoxStockOptions from './FlexBoxStockOptions';
import FwtFutures from './FwtFutures';
import FlexBoxFutures from './FlexBoxFutures';
import { Helmet } from "react-helmet-async";

function Strategies() {

  return (

    <>

     <Helmet>
            <title>Strategies</title>
            <meta name="description" content="Discover effective investment strategies, financial planning tips, and portfolio diversification techniques for wealth accumulation." />
            <meta name="keywords" content="Investment strategies, Financial planning, Wealth accumulation, Asset allocation, Economic growth, Cryptocurrency, Portfolio diversification, Risk assessment, Stock market, Mutual funds, Financial independence, Retirement planning, Sustainable investing, Market trends" />
    </Helmet>

    <section> 

    <FwtStocks />
    <FlexBoxStocks />

    <FwtStockOptions />
    <FlexBoxStockOptions />

    <FwtFutures />
    <FlexBoxFutures />
    
    </section>

    </>

  );
}

export default Strategies;

