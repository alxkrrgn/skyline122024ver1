import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

//window.addEventListener('unhandledrejection', (event) => {
 // console.error('UNHANDLED PROMISE REJECTION:', event.reason);
//});

// Replace this with your actual site key from Google reCAPTCHA v3
const RECAPTCHA_SITE_KEY = '6LfxLw0rAAAAAAOsF0Hbb7HziAttIlkfHciRcSso';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
    <App />
  </GoogleReCaptchaProvider>
);