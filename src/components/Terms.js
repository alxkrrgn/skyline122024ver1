import React from 'react';
import '../styles/terms.css'; // Make sure you have the appropriate CSS file for styling

const Terms = () => {
    return (
    <section>   
        <div className="terms-and-conditions">
            {/*
            <header>
                <h1>Terms and Conditions</h1>
            </header>
            */}
                <div className="intro">
                    <p>Welcome to Skyline Capital. By accessing or using our website, you agree to comply with and be bound by the following Terms and Conditions. Please read these terms carefully before using the site.</p>
                </div>

                <div className="acceptance">
                    <h2>1. Acceptance of Terms</h2>
                    <p>By using this website, you agree to the Terms and Conditions outlined here. If you do not agree to these terms, you are not permitted to use the site.</p>
                </div>

                <div className="use-of-site">
                    <h2>2. Use of Site</h2>
                    <p>You are granted a limited, non-exclusive, non-transferable license to access and use the website. You agree to use the website only for lawful purposes and in accordance with applicable local, state, and international laws.</p>
                </div>

                <div className="account-creation">
                    <h2>3. Account Creation</h2>
                    <p>To access certain features of the site, you may be required to create an account. You must provide accurate and up-to-date information, and you are responsible for maintaining the confidentiality of your login credentials.</p>
                </div>

                <div className="intellectual-property">
                    <h2>4. Intellectual Property</h2>
                    <p>The content on this website, including text, graphics, logos, and images, is protected by copyright and intellectual property laws. You may not use, modify, or distribute any content without explicit permission from Skyline Capital.</p>
                </div>

                <div className="prohibited-activities">
                    <h2>5. Prohibited Activities</h2>
                    <p>You agree not to engage in any activities that:</p>
                    <ul>
                        <li>Violate any local, state, or international laws or regulations.</li>
                        <li>Attempt to disrupt the website's functionality or security.</li>
                        <li>Engage in any activity that could harm other users or the site itself.</li>
                    </ul>
                </div>

                <div className="disclaimers">
                    <h2>6. Disclaimers</h2>
                    <p>Skyline Capital makes no representations or warranties regarding the accuracy, completeness, or reliability of the information on the website. The use of the site is at your own risk.</p>
                </div>

                <div className="limitation-of-liability">
                    <h2>7. Limitation of Liability</h2>
                    <p>Skyline Capital is not liable for any damages, losses, or injuries arising from your use of the website, including any direct, indirect, incidental, or consequential damages.</p>
                </div>

                <div className="third-party-links">
                    <h2>8. Third-Party Links</h2>
                    <p>Our website may contain links to third-party websites. These links are provided for convenience, and we do not control or endorse the content of these external sites. You use them at your own risk.</p>
                </div>

                <div className="modifications">
                    <h2>9. Modifications to Terms</h2>
                    <p>Skyline Capital reserves the right to update or modify these Terms and Conditions at any time. Changes will be effective immediately upon posting, and your continued use of the site after such changes constitutes your acceptance of the modified terms.</p>
                </div>

                <div className="termination">
                    <h2>10. Termination</h2>
                    <p>Skyline Capital may suspend or terminate your access to the website at any time for violation of these terms or other reasons, without prior notice.</p>
                </div>

                <div className="governing-law">
                    <h2>11. Governing Law</h2>
                    <p>These Terms and Conditions are governed by the laws of the United States and the state in which Skyline Capital operates. Any disputes related to these terms will be resolved in the appropriate courts in the relevant jurisdiction.</p>
                </div>

                <div className="contact-us">
                    <h2>12. Contact Us</h2>
                    <p>If you have any questions or concerns about these Terms and Conditions, please contact us at:</p>
                    <address>
                        <strong>Email:</strong> <a href="mailto:skylinecapitalam@gmail.com">support@skylinecapital.com</a><br />
                        {/*
                        <strong>Phone:</strong> +1 (800) 123-4567<br />
                        <strong>Address:</strong> 123 Finance St, Suite 100, City, State, 12345, USA
                        */}
                    </address>
                </div>
            </div>
    </section>         
    );
};

export default Terms;
