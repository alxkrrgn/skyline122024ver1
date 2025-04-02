const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const mailer = require('../config/mailer'); // Ensure mailer is correctly configured

const app = express();

// ======================
// 1. MIDDLEWARE SETUP
// ======================

// Enable proper CORS for production and development
app.use(cors({
  origin: ['https://skyline-wealth.com','https://skylinecapital.info','http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use((req, res, next) => {
  const host = req.headers.host;
  if (host.includes('skyline-wealth.com')) {
    res.locals.domain = 'https://skyline-wealth.com';
  } else if (host.includes('skylinecapital.info')) {
    res.locals.domain = 'https://skylinecapital.info';
  } else {
    res.locals.domain = 'https://skyline-wealth.com'; // Default
  }
  next();
});

// Body parsing middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ======================
// 2. STATIC FILES & SERVING
// ======================

// Serve static files for React frontend and public assets
app.use(express.static(path.join(__dirname, 'build')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// ======================
// 3. API ROUTES
// ======================

// Email API route
app.post('/api/send-email', async (req, res) => {
  console.log('POST to /api/send-email received', req.body);
  try {
    const result = await mailer.sendContactForm(req.body);
    res.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ======================
// 4. SITEMAP ROUTES
// ======================

// Function to generate sitemap
async function generateSitemap() {
  const host = req.headers.host.includes('skylinecapital.info')
  ? 'https://skylinecapital.info'
  : 'https://skyline-wealth.com';

  const sitemap = new SitemapStream({ hostname: host });

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

  return await streamToPromise(sitemap);
}

// Serve sitemap.xml dynamically
app.get('/sitemap.xml', async (req, res) => {
  try {
    const xmlData = await generateSitemap();
    res.header('Content-Type', 'application/xml');
    res.send(xmlData);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// ======================
// 5. REACT CATCH-ALL (MUST BE LAST)
// ======================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ======================
// 6. SERVER INITIALIZATION
// ======================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Accessible at: https://skyline-wealth.com or https://skylinecapital.info`);
});
