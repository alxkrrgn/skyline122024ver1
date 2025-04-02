import React, { useEffect, useState } from 'react';

const SitemapPage = () => {
  const [sitemapData, setSitemapData] = useState('');

  useEffect(() => {
    fetch('/sitemap.xml')
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Failed to load sitemap');
      })
      .then((data) => setSitemapData(data))
      .catch((error) => console.error('Error loading sitemap:', error));
  }, []);

  useEffect(() => {
    // Set Content-Type to XML for the page
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Type';
    meta.content = 'application/xml; charset=UTF-8';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  if (!sitemapData) {
    return null; // Render nothing until sitemap data is loaded
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: sitemapData }} />
  );
};

export default SitemapPage;


