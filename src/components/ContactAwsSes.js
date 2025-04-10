import React, { useState , useEffect } from 'react';
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
            setServerMessage({ text: 'reCAPTCHA is not ready. Please try again later.', type: 'error' });
            setIsSubmitting(false);
            return;
        }
    
        if (!formData.email || !validateEmail(formData.email)) {
            setServerMessage({ text: 'Please enter a valid email.', type: 'error' });
            setIsSubmitting(false);
            return;
        }
    
        if (!formData.name || !formData.subject || !formData.message) {
            setServerMessage({ text: 'Please fill in all required fields.', type: 'error' });
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
            postData.append('name', formData.name);
            postData.append('subject', formData.subject);
            postData.append('message', formData.message);
            postData.append('recaptchaToken', recaptchaToken);
    
            const jsonData = {
                ...formData,
                recaptchaToken,
                source: 'contact_form', // <-- include source
            };
    
            console.log('Post data:', Object.fromEntries(postData.entries()));
    
            // Send the form data to contactGit.php
            const responseHTML = await fetch('https://backend.skyline-wealth.com/contactGit.php', {
                method: 'POST',
                body: postData, // Let the browser handle Content-Type
            });


            //console.log('Response status:', response.status);
            //console.log('Response HTML status:', responseHTML.status);
        
           // if (!response.ok || !responseHTML.ok) {
            if ( !responseHTML.ok) {
                   
                console.error(`Error: Response status: ${response.status}, HTML status: ${responseHTML.status}`);
                setServerMessage({ 
                    text: `Error: ${response.status} || ${responseHTML.status}. Please try again later.`,
                    type: 'error'
                });
                setIsSubmitting(false);
                return;
            }
    
           
            // Handle response from contactGit.php
            let dataHTML;
            const responseHTMLText = await responseHTML.text();
            try {
                dataHTML = JSON.parse(responseHTMLText);
            } catch (err) {
                console.warn('Non-JSON from contactGit.php:', responseHTMLText);
                dataHTML = { success: false, message: responseHTMLText || 'Invalid JSON in contactGit.php response' };
            }

            //if (data.error || dataHTML.error) {
            if ( dataHTML.error) {   
                setServerMessage({ 
                    text: dataHTML.error || data.error || 'Duplicate email error/Send email failure! Please try again',
                    type: 'error'
                });

            } 

            else if (dataHTML.success) {

                const response = await fetch('https://backend.skyline-wealth.com/send-mail.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsonData),
                });

                            // Handle response from send-mail.php
                let data;
                const responseText = await response.text();
                try {
                    data = JSON.parse(responseText);
                } catch (err) {
                    console.warn('Non-JSON from send-mail.php:', responseText);
                    data = { success: false, error: responseText || 'Invalid JSON in send-mail.php response' };
                }

                if (!response.ok || !responseHTML.ok) {
                   
                console.error(`Error: Response status: ${response.status}, HTML status: ${responseHTML.status}`);
                setServerMessage({ 
                    text: `Error: ${response.status} || ${responseHTML.status}. Please try again later.`,
                    type: 'error'
                });
                setIsSubmitting(false);
                return;
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
            }
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
        <div style={{ margin: '5vh 0' }}>
            <div className="container">
                <div className="form">
                    <div className="form-panel one">
                        <div className="form-header">
                            <h1 style={{ textShadow: 'none' }}>Contact Us</h1>
                        </div>
                        <div className="form-content">
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
                                        type="text"
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
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Subject..."
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        style={{ width: '100%' }}
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
    );
};

export default ContactAwsSes;
