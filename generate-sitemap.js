const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require("fs");
const { createWriteStream } = require('fs');

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://skyline-wealth.com' });

  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/strategies', changefreq: 'weekly', priority: 0.8 });
  sitemap.write({ url: '/contact', changefreq: 'weekly', priority: 0.7 });
  sitemap.write({ url: '/getstarted', changefreq: 'weekly', priority: 0.7 });
  sitemap.write({ url: '/stock-options', changefreq: 'weekly', priority: 0.7 });
  sitemap.write({ url: '/login', changefreq: 'weekly', priority: 0.9 });
  sitemap.write({ url: '/register', changefreq: 'weekly', priority: 0.9 });
  sitemap.write({ url: '/getstarted', changefreq: 'weekly', priority: 0.9 });
  sitemap.write({ url: '/about', changefreq: 'weekly', priority: 0.5 });
  sitemap.write({ url: '/terms', changefreq: 'weekly', priority: 0.5 });
  sitemap.write({ url: '/privacy', changefreq: 'weekly', priority: 0.5 });

  sitemap.end();

  const sitemapBuffer = await streamToPromise(sitemap);

  createWriteStream('./public/sitemap.xml').write(sitemapBuffer);
  createWriteStream('sitemap.xml').write(sitemapBuffer);
  console.log('Sitemap generated!');

 // streamToPromise(sitemap)
 // .then((sm) => fs.writeFileSync("./public/sitemap.xml", sm.toString()))
 // .catch(console.error);
})();
