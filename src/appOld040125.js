const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap'); // Ensure this is installed via npm
const app = express();


app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve the sitemap.xml explicitly
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

app.disable('etag');

app.get('/sitemap', (req, res) => {
  res.set({
    'Content-Type': 'application/xml',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Last-Modified': new Date().toUTCString(),
  });

  res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});
// Serve sitemap.xml
app.get('/sitemap.xml', async (req, res) => {
  try {
    const sitemap = new SitemapStream({ hostname: 'https://skyline-wealth.com' });

    sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    sitemap.write({ url: '/strategies', changefreq: 'weekly', priority: 0.8 });
    sitemap.write({ url: '/contact', changefreq: 'weekly', priority: 0.6 });
    sitemap.write({ url: '/getstarted', changefreq: 'weekly', priority: 0.4 });
    sitemap.write({ url: '/about', changefreq: 'weekly', priority: 0.3 });
    sitemap.write({ url: '/stock-options', changefreq: 'weekly', priority: 0.5 });
    sitemap.write({ url: '/login', changefreq: 'weekly', priority: 0.9 });
    sitemap.write({ url: '/register', changefreq: 'weekly', priority: 0.7 });
    sitemap.end();

    const xmlData = await streamToPromise(sitemap);
    console.log('Generated Sitemap:', xmlData.toString()); 

    res.header('Content-Type', 'application/xml');
    res.send(xmlData);
  } catch (err) {
    console.error('Error generating sitemap:', err);
    res.status(500).send('Error generating sitemap');
  }
});

app.get('/sitemap', async (req, res) => {
  try {
    const sitemap = new SitemapStream({ hostname: 'https://skyline-wealth.com' });

    // Define sitemap entries
    const routes = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/strategies', changefreq: 'weekly', priority: 0.8 },
      { url: '/contact', changefreq: 'weekly', priority: 0.6 },
      { url: '/getstarted', changefreq: 'weekly', priority: 0.4 },
      { url: '/about', changefreq: 'weekly', priority: 0.3 },
      { url: '/stock-options', changefreq: 'weekly', priority: 0.5 },
      { url: '/login', changefreq: 'weekly', priority: 0.9 },
      { url: '/register', changefreq: 'weekly', priority: 0.7 },
    ];

    // Add routes to the sitemap stream
    routes.forEach(route => sitemap.write(route));
    sitemap.end();

    // Generate XML from the sitemap
    const xmlData = await streamToPromise(sitemap);

       // Respond with XML content
    res.header('Content-Type', 'application/xml');
    res.send(xmlData);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
