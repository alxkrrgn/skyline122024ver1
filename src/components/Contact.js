import React, { useState } from 'react';
import '../styles/style-loggedin.css';
import '../styles/loginform.css';
import '../styles/buttons.css';
import FormData from "form-data";
import axios from 'axios';
//import mailer from '../config/mailer';

const Contact = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        subject: '',
        message: '',
    });

    const [validationMessage, setValidationMessage] = useState({ text: '', type: '' });
    const [serverMessage, setServerMessage] = useState({ text: '', type: '' });

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

        if (formData.email === '' ) {
            setServerMessage({ text: 'Please enter your email:', type: 'error' });
            return;
        }

        if (formData.subject === '' ) {
            setServerMessage({ text: 'Please tyoe a subject:', type: 'error' });
            return;
        }
        if (formData.name === '' ) {
          setServerMessage({ text: 'Please enter your name:', type: 'error' });
          return;
        }

        if (formData.message !== formData.message) {
            setServerMessage({ text: 'Please type a message:', type: 'error' });
            return;
        }

        try {
            const postData = new FormData();
            postData.append('email', formData.email);
            postData.append('name', formData.name);
            postData.append('subject', formData.subject);
            postData.append('message', formData.message);
        
            console.log('Post data:', Object.fromEntries(postData.entries()));


            const response = await fetch('http://localhost:5000/config/send-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: formData.email,
                  name: formData.name,
                  subject: formData.subject,
                  message: formData.message,
                }),
              });

            console.log('Response status:', response.status);
        
            /*
            const response = await fetch.post('http://localhost:5000/config/send-email', postData);
                */
            setServerMessage(response.data.success || 'Message sent successfully!');

          } catch (error) {
            setServerMessage(
              error.response?.data?.error || 'Failed to send message. Please try again.'
            );
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

export default Contact;
