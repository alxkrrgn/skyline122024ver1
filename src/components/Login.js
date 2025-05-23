import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure React Router is set up
import { Helmet } from "react-helmet-async";
import '../styles/style-loggedin.css';
import '../styles/loginform.css';
import '../styles/buttons.css';
import FormData from "form-data";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Login = () => {

    const { executeRecaptcha } = useGoogleReCaptcha();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [serverMessage, setServerMessage] = useState({ text: '', type: '' });
    const [validationMessage, setValidationMessage] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

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

        if (formData.password === '' ) {
            setServerMessage({ text: 'Please enter your password:', type: 'error' });
            setIsSubmitting(false);
            return;
        }

        try {

            let recaptchaToken = null;
            try {
            recaptchaToken = await executeRecaptcha('contact_form');
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
            postData.append('password', formData.password);
            postData.append('recaptchaToken', recaptchaToken);
        
            console.log('Post data:', Object.fromEntries(postData.entries()));
        
            // Send the form data to login.php
            const response = await fetch('https://backend.skyline-wealth.com/login.php', {
                method: 'POST',
                body: postData, // Let the browser handle Content-Type
            });
        
            //console.log('Response status:', response.status);
        
            // Check for server-side errors
            if (!response.ok) {
                console.error('Server returned an error:', response.statusText);
                setServerMessage({ text: 'Server error occurred.', type: 'error' });
                return;
            }
        
            // Parse JSON response
             // Parse JSON response


            const rawText = await response.text(); // Log raw response
            console.log('Raw response:', rawText);

            const data = JSON.parse(rawText); // Parse JSON
            console.log('Parsed response:', data);

            console.log('Response data:', data);

            if (data.success) {
              setServerMessage({ text: data.message, type: 'success' });
              localStorage.setItem('userData', JSON.stringify(data.userData));
              setTimeout(() => {
                  navigate(data.redirect); // Redirect to the dashboard
              }, 2000);
            // if (data.redirect) {
           //   window.location.href = data.redirect; // Navigate to /dashboard
                  //    }
               } else {
                   setServerMessage({ text: data.error, type: 'error' });
               }
           } catch (error) {
                  console.error('Error:', error);
                   setServerMessage({
                  text: 'An error occurred during login.',
                  type: 'error',
             });
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
                        <h1 style={{ textShadow: 'none' }}>Login</h1>
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
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password..."
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="form-group">
                                <button type="submit">Login</button>
                            </div>

                            <div className="form-group">
                                <label className="form-remember">
                                    <input type="checkbox" /> Remember Me
                                </label>
                                <a className="form-recovery" href="/login">
                                    Forgot Password?
                                </a>
                                <a className="form-recovery" href="/register">
                                    Don't have an account? Register here
                                </a>
                            </div>
                            <div className="line">
                            <div className="form-group">
                                <button onClick={() => (window.location.href = '/auth/facebook')}>Login with Facebook</button>
                            </div>    
                            <div className="form-group">
                                <button onClick={() => (window.location.href = '/auth/google')}>Login with Google</button>
                            </div>
                            <div className="form-group">
                                <button onClick={() => (window.location.href = '/auth/twitter')}>Login with Twitter</button>
                            </div>
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

export default Login;

