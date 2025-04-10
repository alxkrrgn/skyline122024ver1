// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS CSS for animations to work
import { HelmetProvider } from 'react-helmet-async';

import Header from "./components/Header";
import FooterResponsive from "./components/FooterResponsive";
import Home from "./components/Home";
import About from "./components/About";
import ContactGit from "./components/ContactGit";
import ContactAwsSes from "./components/ContactAwsSes";
import Strategies from "./components/Strategies";
import FlexBoxStockOptionsPage from "./components/FlexBoxStockOptionsPage";
import Login from "./components/Login";
import Register from "./components/Register";
import GetStartedAwsSes from "./components/GetStartedAwsSes";
import Dashboard from './components/Dashboard';

//import AOS from 'locomotive-aos'; // Example, adjust based on library docs
import VideoBgStars from './components/VideoReactPlayerStars';
import VideoBgPage from './components/VideoBackground';
import BackgroundEffect from './components/BackgroundEffect';
import AnimatedXOtriangles from './components/AnimatedXOtriangles';
import AnimatedPixelStars from './components/AnimatedPixelStars';

import ReactResponsive from './components/ReactResponsive';
import CardContainer from './components/CardContainer';
import FlexBoxStrategiesTopics from './components/FlexBoxStrategiesTopics';

import NavigationMenu from './components/NavigationMenu';
import InvestmentPage from './components/InvestmentPage';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import SitemapPage from './components/SitemapPage';
import Clarity from './Clarity';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

//window.addEventListener('unhandledrejection', (event) => {
 // console.error('UNHANDLED PROMISE REJECTION:', event.reason);
//});

<GoogleReCaptchaProvider
  reCaptchaKey="6LfxLw0rAAAAAAOsF0Hbb7HziAttIlkfHciRcSso"
  scriptProps={{
    async: true,
    defer: true,
    appendTo: 'head',
    nonce: undefined,
  }}
>
  <ContactAwsSes />
</GoogleReCaptchaProvider>


//const mailer = require('./config/mailer'); // Correct relative path
//app.use('/config', mailer);
   // Initialize AOS with custom settings

//AOS.init({
 // duration: 1000, // Animation duration
// once: true, // Trigger animations only once
//  offset: 120, // Offset from the top of the screen
//});

//let observer = new IntersectionObserver( (entries, observer) => {  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('aos-animate'); }else{ entry.target.classList.remove('aos-animate'); } }); }); document.querySelectorAll('[data-aos]').forEach(aosElem => { observer.observe(aosElem) });
// Check to ensure no duplicate imports
//import { ChakraProvider, Box, Heading, Grid, GridItem, Text, Button, Container } from "@chakra-ui/react";
//import { FaArrowRight } from "react-icons/fa";

function App() {

  useEffect(() => {

    const projectId = 'pj8nnn6sz5'; // Replace with your Clarity project ID
    Clarity.init(projectId); // Initialize Clarity and inject the script

    AOS.init({
      duration: 1000,
      offset: 100,
      once: false,  
    });
  
    // Recalculate positions after content or layout updates
    AOS.refresh();
  }, []);

  return (
  <HelmetProvider> 
    <Router>
        <div className="App">
      
         <Header/>  
         {/* 
          {/*
         <AnimatedXOtriangles />
         <AnimatedPixelStars />
          */}
         
         <AnimatedPixelStars />
        
        {/* <VideoBgPage /> */}
        
        {/* <AnimatedXOtriangles />*/}
        {/* <VideoBgPage /> */}

        <main>
        
          <Routes>  {/* Use Routes instead of Switch */}
            {/* Render components only on the home page */}
            {/*
            <Route
              path="/"
              element={
                <>
                  <ReactResponsive />
                  <CardContainer />
                  <FlexBoxStrategiesTopics />
                  <Home />
                </>
              }
            /> */}
            <Route path="/" element={<Home />} />  {/* Define routes with the 'element' prop */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactAwsSes />} />
            <Route path="/strategies" element={<Strategies />} />
            <Route path="/stock-options" element={<FlexBoxStockOptionsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/getstarted" element={<GetStartedAwsSes />} />
            <Route path="/navigate" element={<NavigationMenu />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sitemap" element={<SitemapPage />} />

            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </main>     

        {/*<FlexBoxCon2 />  Use the component */}
        {/*<FlexBoxContainer />  Use the component */}
        {/* <VideoTextureComponent /> */}
        {/*<VideoBg3F />*/}
        {/* <VideoBackground /> 
         <VideoPlayer /> */}
        {/* Use the component */}
        {/* <Locomotive /> */}
        {/*<MyComponent />*/} {/* Use the component */}
        {/*  <FooterBootstrap /> */}
        <FooterResponsive />
        
        
        </div>
      </Router>
   </HelmetProvider>   
  );
}

export default App;

