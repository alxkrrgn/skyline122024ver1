import React from 'react';
import '../styles/privacy.css'; // Make sure you have the appropriate CSS file for styling

const Privacy = () => {
    return (
    <section> 
        <div className="privacy-policy">
            {/*}
            <header>
                <h1>Privacy Policy</h1>
            </header>
            */}
        
                <div className="intro">
                    <p>At Skyline Capital, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal data. Please read this policy carefully to understand how we treat your information.</p>
                </div>

                <div className="data-collection">
                    <h2>1. Information We Collect</h2>
                    <p>We may collect the following types of information:</p>
                    <ul>
                        <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
                        <li><strong>Technical Data:</strong> IP addresses, browser type, device information, etc.</li>
                        <li><strong>Cookies:</strong> We use cookies to enhance your experience on our site.</li>
                    </ul>
                </div>

                <div className="data-usage">
                    <h2>2. How We Use Your Information</h2>
                    <p>We use your information for the following purposes:</p>
                    <ul>
                        <li>To provide and improve our services.</li>
                        <li>To personalize your experience and communicate with you.</li>
                        <li>To monitor and analyze site usage and performance.</li>
                        <li>To send promotional materials if you’ve opted-in.</li>
                    </ul>
                </div>

                <div className="data-sharing">
                    <h2>3. Sharing Your Information</h2>
                    <p>We do not sell or rent your personal information to third parties. However, we may share information in the following situations:</p>
                    <ul>
                        <li>With service providers who assist us in operating our website.</li>
                        <li>When required by law or to protect our legal rights.</li>
                        <li>In the event of a business transfer, such as a merger or acquisition.</li>
                    </ul>
                </div>

                <div className="data-protection">
                    <h2>4. Data Protection</h2>
                    <p>We use appropriate security measures to protect your personal information from unauthorized access or disclosure. However, no method of transmission over the internet is 100% secure.</p>
                </div>

                <div className="cookies">
                    <h2>5. Cookies</h2>
                    <p>We use cookies to collect information and improve the functionality of our site. You can disable cookies in your browser settings, but this may affect your ability to use certain features of the website.</p>
                </div>

                <div className="user-rights">
                    <h2>6. Your Rights</h2>
                    <p>As a user, you have the right to:</p>
                    <ul>
                        <li>Access, update, or delete your personal data.</li>
                        <li>Opt-out of marketing communications at any time.</li>
                        <li>Request information about how your data is being used.</li>
                    </ul>
                </div>

                <div className="third-party-links">
                    <h2>7. Third-Party Links</h2>
                    <p>Our website may contain links to third-party sites. We are not responsible for the privacy practices of these sites. Please review their privacy policies before providing any personal information.</p>
                </div>

                <div className="policy-updates">
                    <h2>8. Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Please review this policy periodically for any updates.</p>
                </div>

                <div className="contact-us">
                    <h2>9. Contact Us</h2>
                    <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                    <address>
                        <strong>Email:</strong> <a href="mailto:skylinecapitalam@gmail.com">support@skylinecapital.com</a><br />
                        {/*}
                        <strong>Phone:</strong> +1 (800) 123-4567<br />
                        <strong>Address:</strong> 123 Finance St, Suite 100, City, State, 12345, USA
                        */}
                    </address>
                </div>            
            </div>
    </section>    
    );
};

export default Privacy;
