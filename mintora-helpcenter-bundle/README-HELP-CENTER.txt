Mintora Lab — Help Center bundle (React + Vite)

Copy into your frontend project keeping paths:
frontend/src/pages/HelpCenter.jsx
frontend/src/pages/HelpArticle.jsx
frontend/src/pages/HelpContact.jsx
frontend/src/support/articles.json

Add routes (React Router) in src/App.jsx (or your router file):
----------------------------------------------------------------
import HelpCenter from "./pages/HelpCenter";
import HelpArticle from "./pages/HelpArticle";
import HelpContact from "./pages/HelpContact";

<Route path="/help" element={<HelpCenter />} />
<Route path="/help/contact" element={<HelpContact />} />
<Route path="/help/:slug" element={<HelpArticle />} />
----------------------------------------------------------------

Add a header/footer link to /help. The contact form posts to /api/support/contact — wire this to your backend handler or email service.
