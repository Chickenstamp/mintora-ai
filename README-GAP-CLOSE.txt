Mintora Lab — Gap Close Pack

This bundle helps your site match/beat leading AI generator sites with:
1) Cinematic theme (CSS + components)
2) Seed gallery (JSON + thumbnails)
3) Template starter pack (JSON + Templates page)
4) SEO & FAQ schema (robots, sitemap, favicon, OG image)

Place these files into your repo:
- frontend/src/theme/mintora.css
- frontend/src/components/Hero.jsx
- frontend/src/components/FeatureGrid.jsx
- frontend/src/components/PricingShowcase.jsx
- frontend/src/components/GallerySeed.jsx
- frontend/src/pages/Home.jsx
- frontend/src/pages/Templates.jsx
- frontend/src/support/templates.json
- frontend/src/support/gallery.json
- frontend/src/support/assets/thumbs/*.png
- frontend/src/seo/faq-schema.jsonld
- frontend/public/robots.txt
- frontend/public/sitemap.xml
- frontend/public/favicon.svg
- frontend/public/og-default.png

Wire routes (src/App.jsx):
------------------------------------------------
import Home from "./pages/Home";
import Templates from "./pages/Templates";

<Route path="/" element={<Home/>} />
<Route path="/templates" element={<Templates/>} />
------------------------------------------------

Import the theme once (e.g., Home.jsx already does):
  import "../theme/mintora.css";

Add SEO to public/index.html:
------------------------------------------------
<link rel="icon" href="/favicon.svg" />
<meta property="og:image" content="/og-default.png" />
<!-- Inline JSON-LD -->
<script type="application/ld+json">
REPLACE_WITH_CONTENTS_OF_/src/seo/faq-schema.jsonld
</script>
------------------------------------------------

Gallery:
- Update media URLs in frontend/src/support/gallery.json with your Supabase public URLs.
- Thumbnails provided are placeholders.
