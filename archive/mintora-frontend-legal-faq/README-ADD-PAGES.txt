Mintora Lab — Frontend Legal & FAQ Pages

Place all JSX files in: frontend/src/pages/

Add routes (React Router example) in your main router (e.g., src/App.jsx):
-------------------------------------------------
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import CookiePolicy from "./pages/CookiePolicy";
import FAQ from "./pages/FAQ";

<Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/terms" element={<Terms />} />
<Route path="/refund" element={<Refund />} />
<Route path="/cookies" element={<CookiePolicy />} />
<Route path="/faq" element={<FAQ />} />
-------------------------------------------------

Add footer links:
<a href="/privacy">Privacy Policy</a>
<a href="/terms">Terms</a>
<a href="/refund">Refund Policy</a>
<a href="/cookies">Cookie Policy</a>
<a href="/faq">FAQ</a>

Deploy the frontend after adding these files and routes.
