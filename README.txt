PackPro Industries — Static Website
====================================

This is a fully self-contained static website (HTML + CSS + vanilla JavaScript).
No server, database or build step is required — upload the files as-is to any
static hosting and the site works.

FILES
-----
index.html            The entire homepage (all sections)
css/styles.css        All styling (colours, layout, animations)
js/script.js          Site behaviour + WhatsApp configuration
js/vendor/lenis.min.js  Smooth-scroll library (bundled, no CDN needed)
robots.txt            Search-crawler rules
llms.txt              AI-crawler site summary

HOST IT ON ANY STATIC HOST
--------------------------
Netlify:   drag-and-drop this folder at https://app.netlify.com/drop
Vercel:    `npx vercel deploy` inside this folder (no framework preset)
GitHub Pages / cPanel / S3 / any web server:
           copy the files into your web root (public_html / www)

CHANGE THE WHATSAPP NUMBER
--------------------------
Open js/script.js and edit the very first block:

  const SITE_CONFIG = {
    WHATSAPP_NUMBER: "919876543210",   // <-- your number: country code + number, digits only (no "+", no spaces)
    DEFAULT_MESSAGE: "Hello, I am interested in your packaging products. Please share your catalogue and quotation.",
  };

Every "Enquire on WhatsApp" button, the floating button, the banner button and
the contact form read from this one place.

REPLACE THE PLACEHOLDER BUSINESS DETAILS
----------------------------------------
These placeholders are used in the visible page text (search and replace them
in index.html):

  +91 98765 43210                  -> your phone number
  sales@packproindustries.com      -> your email
  Plot 42, Industrial Estate Phase II, Pune, Maharashtra 411019, India
                                   -> your address
  # (social links)                 -> your Facebook / Instagram / LinkedIn / X URLs

The floating WhatsApp button and product buttons also work before you change
anything — they simply point at the placeholder number until you update it.

SEO NOTES
---------
- Title, meta description, Open Graph and Twitter tags are in the <head> of
  index.html. Update og:description if you rewrite the copy.
- There is intentionally NO canonical tag / sitemap.xml because no production
  domain was confirmed yet. After your domain is live, add:
      <link rel="canonical" href="https://your-domain.com/" />
      <meta property="og:url" content="https://your-domain.com/" />
  and a sitemap.xml listing https://your-domain.com/
- robots.txt already allows Google/Bing/AI crawlers.
