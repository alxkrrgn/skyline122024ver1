import React, { useState } from 'react';
import '../styles/style-loggedin.css';
import '../styles/loginform.css';
import '../styles/buttons.css';
import FormData from "form-data";
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';


const ContactAwsSes = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        subject: '',
        message: '',
    });
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [validationMessage, setValidationMessage] = useState({ text: '', type: '' });
    const [serverMessage, setServerMessage] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

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
            setServerMessage({ text: 'reCAPTCHA not yet available', type: 'error' });
            setIsSubmitting(false);
            return;
        }
    
        // Validation
        if (!formData.email) {
            setServerMessage({ text: 'Please enter your email:', type: 'error' });
            setIsSubmitting(false);
            return;
        }

        if (!validateEmail(formData.email)) {
            setServerMessage({ text: 'Please enter a valid email:', type: 'error' });
            setIsSubmitting(false);
            return;
        }

        if (!formData.name) {
            setServerMessage({ text: 'Please enter your name:', type: 'error' });
            setIsSubmitting(false);
            return;
        }

        if (!formData.subject) {
            setServerMessage({ text: 'Please enter a subject:', type: 'error' });
            setIsSubmitting(false);
            return;
        }

        if (!formData.message) {
            setServerMessage({ text: 'Please type a message:', type: 'error' });
            setIsSubmitting(false);
            return;
        }

        try {
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
            const postData = new FormData();
                        postData.append('email', formData.email);
                        postData.append('name', formData.name);
                        postData.append('subject', formData.subject);
                        postData.append('message', formData.message);
                    
            console.log('Post data:', Object.fromEntries(postData.entries()));

            const response = await fetch('https://backend.skyline-wealth.com/send-mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseHTML = await fetch('https://backend.skyline-wealth.com/contactGit.php', {
                method: 'POST',
                body: postData, // Let the browser handle Content-Type
            });

            console.log('Response status:', response.status);
            console.log('Response HTML status:', responseHTML.status);

            if (!response.ok || !responseHTML.ok) {
            //if (!responseHTML.ok) {   
                // Log errors and show the appropriate error message
                console.error(`Error: Response status: ${response.status}, Response HTML status: ${responseHTML.status}`);
                //console.error(`Error: Response HTML status: ${responseHTML.status}`);
            
                setServerMessage({ 
                    text: `Error: ${response.status} || ${responseHTML.status}. Please try again later.`,
                    //text: `Error: ${responseHTML.status}. Please try again later.`,
                    type: 'error'
                });
                return;  // Stop execution if there is an error
            }
            
            const data = await response.json();
            const dataHTML = await responseHTML.json();
            
            // Check if both responses have success messages
            if (data.success || dataHTML.success) {
            //if ( dataHTML.success) {   
                setServerMessage({ 
                    text: dataHTML.message || 'Message sent successfully! We will get back to you soon.', 
                    type: 'success' 
                });
            } else {
                // If either response contains an error, display the error message
                setServerMessage({ 
                    text: data.error || dataHTML.error || 'An unexpected error occurred. Please try again.', 
                    //text: dataHTML.error || 'An unexpected error occurred. Please try again.', 
                    type: 'error' 
                });
            }
            
            // Reset form on success
            setFormData({
                email: '',
                name: '',
                subject: '',
                message: '',
            });

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
        <div style ={{ margin : '5vh 0' }} >
        <div className="container">
            <div className="form">
                <div className="form-panel one">
                    <div className="form-header">
                        <h1 style={{ textShadow: 'none' }}>Contact Us</h1>
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
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="subject"
                                    id="subject"
                                    name="subject"
                                    placeholder="Subject..."
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                  <textarea style ={{ width : '100%' }}
                                    id="message"
                                    name="message"
                                    placeholder="Your Message Here..."
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <button type="submit">Send</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ContactAwsSes;