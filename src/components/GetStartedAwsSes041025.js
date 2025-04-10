import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import '../styles/style-loggedin.css';
import '../styles/loginform.css';
import '../styles/buttons.css';
import FormData from "form-data";
import axios from 'axios';
//import mailer from '../config/mailer';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const GetStartedAwsSes = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phonenumber: '',
        question: '',
    });

    const { executeRecaptcha } = useGoogleReCaptcha();
    const [validationMessage, setValidationMessage] = useState({ text: '', type: '' });
    const [serverMessage, setServerMessage] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    //const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'email') {
            const isValid = validateEmail(value);
            setValidationMessage({
                text: isValid ? 'Valid Email' : 'Invalid Email',
                type: isValid ? 'success' : 'error',
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setServerMessage({ text: '', type: '' });

        if (!executeRecaptcha) {
            setServerMessage({ text: 'reCAPTCHA is not ready. Please try again later.', type: 'error' });
            setIsSubmitting(false);
            return;
        }
    
        if (formData.email === '' ) {
            setServerMessage({ text: 'Please enter your email:', type: 'error' });
            setIsSubmitting(false);
            return;
        }
    
        if (formData.name === '' ) {
            setServerMessage({ text: 'Please enter your name:', type: 'error' });
            setIsSubmitting(false);
            return;
        }
    
        if (formData.question === '' ) {
            setServerMessage({ text: 'Please choose a question:', type: 'error' });
            setIsSubmitting(false);
            return;
        }

        try {
            //const recaptchaToken = await executeRecaptcha('contact_form');
                
            let recaptchaToken = null;
                try {
                recaptchaToken = await executeRecaptcha('get_started_form');
                } catch (error) {
                console.error('reCAPTCHA execution failed:', error);
                return; // Exit early
                }

            if (!recaptchaToken) {
                setServerMessage({ text: 'reCAPTCHA verification failed. Please try again.', type: 'error' });
                setIsSubmitting(false);
                return;
            }
    
            const postData = new FormData();
            postData.append('email', formData.email);
            postData.append('name', formData.name);
            postData.append('phonenumber', formData.phonenumber);
            postData.append('question', formData.question);
            postData.append('recaptchaToken', recaptchaToken);
    
            const jsonData = {
                ...formData,
                recaptchaToken,
                source: 'get_started_form', // <-- include source
            };
    
            console.log('Post data:', Object.fromEntries(postData.entries()));

            /*
            const API_URL = window.location.hostname.includes('skylinecapital.info')
                ? 'https://skylinecapital.info/api/send-email'
                : 'https://skyline-wealth.com/api/send-email';

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            */

            const response = await fetch('https://backend.skyline-wealth.com/send-mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });


            const responseHTML = await fetch('https://backend.skyline-wealth.com/getstartedGit.php', {
                method: 'POST',
                body: postData, // Let the browser handle Content-Type
            });


            //console.log('Response status:', response.status);
            //console.log('Response HTML status:', responseHTML.status);
        
            if (!response.ok || !responseHTML.ok) {
                console.error(`Error: Response status: ${response.status}, HTML status: ${responseHTML.status}`);
                setServerMessage({ 
                    text: `Error: ${response.status} || ${responseHTML.status}. Please try again later.`,
                    type: 'error'
                });
                setIsSubmitting(false);
                return;
            }
    
                    // Handle response from send-mail.php
            let data;
            const responseText = await response.text();
            try {
                data = JSON.parse(responseText);
            } catch (err) {
                console.warn('Non-JSON from send-mail.php:', responseText);
                data = { success: false, error: responseText || 'Invalid JSON in send-mail.php response' };
            }

            // Handle response from contactGit.php
            let dataHTML;
            const responseHTMLText = await responseHTML.text();
            try {
                dataHTML = JSON.parse(responseHTMLText);
            } catch (err) {
                console.warn('Non-JSON from getstartedGit.php:', responseHTMLText);
                dataHTML = { success: false, message: responseHTMLText || 'Invalid JSON in getstartedGit.php response' };
            }
    
            if (data.success || dataHTML.success) {
                setServerMessage({ 
                    text: dataHTML.message || data.message || 'Message sent successfully! We will get back to you soon.',
                    type: 'success'
                });
    
                setFormData({
                    email: '',
                    name: '',
                    subject: '',
                    message: '',
                });
            } else {
                setServerMessage({ 
                    text: data.error || dataHTML.error || 'An unexpected error occurred. Please try again.',
                    type: 'error'
                });
            }
    
        } catch (error) {
            console.error('Submission error:', error);
            setServerMessage({ 
                text: error.message || 'Failed to send message. Please try again.',
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };    

    return (
<>
        <Helmet>
                <title>Home</title>
                <meta name="description" content="Discover effective investment strategies, financial planning tips, and portfolio diversification techniques for wealth accumulation." />
                <meta name="keywords" content="Investment strategies, Financial planning, Wealth accumulation, Asset allocation, Economic growth, Cryptocurrency, Portfolio diversification, Risk assessment, Stock market, Mutual funds, Financial independence, Retirement planning, Sustainable investing, Market trends" />
        </Helmet>        
    <div style ={{ margin : '5vh 0' }} >
        <div className="container">
            <div className="form">
                <div className="form-panel one">
                    <div className="form-header">
                        <h1 style={{ textShadow: 'none' }}>Get Started</h1>
                    </div>
                    <div className="form-content">
                       {/* <h3 className={serverMessage.type}>{serverMessage.text}</h3> */}
                        <div>
                            {serverMessage.type === 'success' ? (
                        <h3
                                className={serverMessage.type}
                                dangerouslySetInnerHTML={{ __html: serverMessage.text }}
                        ></h3>
                            ) : (
                        <h3 className={serverMessage.type}>{serverMessage.text}</h3>
                                )}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email..."
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <h3 className={validationMessage.type}>{validationMessage.text}</h3>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="name"
                                    id="name"
                                    name="name"
                                    placeholder="Name..."
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phonenumber">Phone Number</label>
                                <input
                                    type="phonenumber"
                                    id="phonenumber"
                                    name="phonenumber"
                                    placeholder="Phone Number..."
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="question">Select Question:</label>
                                <select
                                    type="question"
                                    id="question"
                                    name="question"
                                    //placeholder="Question..."
                                    value={formData.question}
                                    onChange={handleChange}
                                    style={{ textWrap: "wrap", width: "100%", height: 50 }}
                                >
                                    <option value="">Select:</option>
                                    <option value="Send me more information about the fund">
                                    Send me more information about the fund
                                    </option>
                                    <option
                                    value="What is your fund structure and liquidity terms?"
                                    style={{ textWrap: "wrap" }}
                                    >
                                    What is your fund structure and liquidity terms?
                                    </option>
                                    <option
                                    value="What is the average or required investment size?"
                                    style={{ textWrap: "wrap" }}
                                    >
                                    What is the average or required investment size?
                                    </option>
                                    <option value="What are the investment strategies and philosophy?">
                                    What are the investment strategies and philosophy?
                                    </option>
                                    <option value="How do you implement risk management?">
                                    How do you implement risk management?
                                    </option>
                                    <option value="What are the fees and the tax situation?">
                                    What are the fees and the tax situation?
                                    </option>
                                    <option value="What are the performance and the track record in the last few years?">
                                    What is the fund performance in the last few years?
                                    </option>
                                </select>
                             </div>   
                            <div className="form-group">
                                <button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Send'}
                                </button>
                            </div>
                            <small>
                                This site is protected by reCAPTCHA and the Google
                                <a href="https://policies.google.com/privacy"> Privacy Policy </a> and
                                <a href="https://policies.google.com/terms"> Terms of Service</a> apply.
                            </small>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
    );
};

export default GetStartedAwsSes;
