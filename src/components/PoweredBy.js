// src/components/About.js
import React from 'react';
import { useEffect } from 'react';
import '../styles/poweredby.css'; // Import the CSS file specific to About component

function PoweredBy() {

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {

        const logosContainer = document.querySelector(".logos");

        if (logosContainer) {
        const clonedLogos = logosContainer.innerHTML; // Clone the content
        logosContainer.innerHTML += clonedLogos; // Append the cloned content

      } else {
        console.warn('logosContainer is not available');
      }
    }, []);
      });

  return (
    
    <div className="powered-by">
  <h2>Powered By:</h2>
    <div className="logos">
      <img src="/images/Tableau_Logo_PNG4.png" width="auto" height="auto" alt="Python" />
      <img src="/images/Github_logo_PNG2.png" width="auto" height="auto" alt="GitHub" /> 
      <img src="/images/Python-Logo-4.svg" width="auto" height="auto" alt="Tableau" />
      <img src="/images/Ubuntu-Logo-4.svg" width="auto" height="auto" alt="ubuntu" />
      <img src="/images/IBM-Logo-2.svg" width="auto" height="auto" alt="IBM" /> 
      <img src="/images/Gitlab-logo-1.svg" width="auto" height="auto" alt="GitLab" /> 
      <img src="/images/ChatGPT-logo-5.svg" width="auto" height="auto" alt="ChatGPT" /> 

      {/* Add more logos here */}
    </div>
</div>
  );
}

export default PoweredBy;

