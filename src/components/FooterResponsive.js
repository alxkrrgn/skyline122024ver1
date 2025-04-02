import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import "../styles/buttons.css";
import "../styles/App.css";
import { css } from '@emotion/react';

const FooterResponsive = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

   const [formData, setFormData] = useState({
          email: '',
          name: '',
          phonenumber: '',
          question: '',
      });
  
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
          setIsSubmitting(true);  // This will prevent multiple submissions
  
          if (formData.email === '' ) {
              setServerMessage({ text: 'Please enter your email:', type: 'error' });
              setIsSubmitting(false);
              return;
          }
          
          formData.name = 'Subscribe to Newsletter';
          formData.question = 'Subscribe to Newsletter';
          formData.phonenumber = 'Subscribe to Newsletter';

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
              const postData = new FormData();
              postData.append('email', formData.email);
              postData.append('name', formData.name);
              postData.append('phonenumber', formData.phonenumber);
              postData.append('question', formData.question);
          
              console.log('Post data:', Object.fromEntries(postData.entries()));
  
              const responseHTML = await fetch('https://backend.skyline-wealth.com/getstartedGit.php', {
                method: 'POST',
                body: postData, // Let the browser handle Content-Type
              });

              const response = await fetch('https://backend.skyline-wealth.com/send-mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });

              //console.log('Response status:', response.status);
              //console.log('Response HTML status:', responseHTML.status);
          
              // Check for server-side errors
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
                      text: 'Thank you! You are subscribed now!', 
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
                  phonenumber: '',
                  question: '',
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
    
    <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className="widget1">
           {/* <div className="logo">
              <img src="https://i.ibb.co/vLDyPtM/ak-logo-yellow.png" className="img-fluid" alt />
            </div>
            <p>
              In eu libero ligula. Fusce eget metus lorem, ac viverra
              leo. Nullam convallis, arcu vel pellentesque sodales,
              nisi est varius diam, ac ultrices sem ante quis sem.
              Proin ultricies volutpat sapien.
            </p> */}
            <div className="socialLinks">
              <ul>


              <li>
                    <a href="https://facebook.com" aria-label="Visit our Facebook page">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com" aria-label="Visit our Twitter profile">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com" aria-label="Visit our LinkedIn profile">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com" aria-label="Visit our Instagram profile">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="https://youtube.com" aria-label="Visit our YouTube channel">
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                <li>
                  <a href="https://google.com"  aria-label="Visit our Google page">
                    <i className="fab fa-google-plus-g"  />
                  </a>
                </li> 
               
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="widget2">
          <div className="footerAlert" >
                  {serverMessage.type === 'success' ? (
                    <h3 //css={responsiveStyle} //style ={{ width: '10vw', margin: '2vh 45vw' }} 
              
              className={serverMessage.type}
              dangerouslySetInnerHTML={{ __html: serverMessage.text }}
                ></h3>
                  ) : (
                   <h3 //css={responsiveStyle} //style ={{ width: '10vw', margin: '2vh 45vw' }} 
                      className={serverMessage.type}>{serverMessage.text}</h3>
                      )}
          </div>
            <h5>Subscribe to Newsletter</h5>
        
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email..."
                value={formData.email}
                onChange={handleChange}
              />
              <div className="footerAlert" >
              <h3 //css={responsiveStyle} //style ={{ width: '10vw', margin: '2vh 45vw' }} 
              className= {validationMessage.type}>{validationMessage.text}</h3>
              </div>
            <button className='button-21' type="submit">SUBSCRIBE</button>
          </form>
           {/* <div className="media">
              <img className="img-fluid" src="https://i.ibb.co/CKNmhMX/blog1.jpg" alt />
              <div className="media-body d-flex align-self-center">
                <div className="content">
                  <a href="#">
                    <p>
                      Did son unreserved themselves indulgence its
                    </p>
                  </a>
                  <span>
                    Aug 17, 2019
                  </span>
                </div>
              </div>
            </div> 
            <div className="media">
              <img className="img-fluid" src="https://i.ibb.co/m5yGbdR/blog2.jpg" alt />
              <div className="media-body d-flex align-self-center">
                <div className="content">
                  <a href="#">
                    <p>
                      Rapturous am eagerness it as resolving household
                    </p>
                  </a>
                  <span>
                    Aug 17, 2019
                  </span>
                </div>
              </div>
            </div>
                */}
          </div>
        </div>
        <div className="col-sm-6 col-lg-2">
          <div className="widget3">
            <h5>
              Quick Links
            </h5>
            <ul>
                <li>
                    <a href="/" aria-label="Go to the Home page">Home</a>
                </li>
                <li>
                    <a href="/about" aria-label="Learn more About us">About</a>
                </li>
                <li>
                    <a href="/strategies" aria-label="Explore our Strategies">Strategies</a>
                </li>
                <li>
                    <a href="/contact" aria-label="Contact us">Contact</a>
                </li>
                <li>
                    <a href="/privacy" aria-label="Read our Privacy Policy">Privacy</a>
                </li>
                <li>
                    <a href="/terms" aria-label="Read our Terms and Conditions">Terms</a>
                </li>
            </ul>
          </div>
        </div>
      {/*   <div className="col-sm-6 col-lg-2">
         <div className="widget4">
          
                
          </div> 
        </div> */}
      </div>
    </div>
    <div className="copyRightArea">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
          <a href="/privacy">Copyright &copy; {currentYear} Skyline Capital | All Rights Reserved</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  
  );
};

export default FooterResponsive;
