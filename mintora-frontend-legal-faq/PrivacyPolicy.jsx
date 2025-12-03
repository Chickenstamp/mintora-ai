import React from 'react';
export default function PrivacyPolicy() {
  return (
    <div style={maxWidth:900, margin:'24px auto', fontFamily:'system-ui, sans-serif'}>
      <h1>Privacy Policy – Mintora Lab</h1>
      <p><i>Last updated: 2025-12-03</i></p>
      <p>Mintora Lab (“we”, “our”, “us”) provides AI-powered digital creation tools for generating images, videos, audio, avatars, and other digital assets. This policy explains how we collect, use, and protect your data.</p>
      <h2>1. Information We Collect</h2>
      <ul>
        <li>Account details: name, email</li>
        <li>Payment info (processed securely by Stripe — we never store card numbers)</li>
        <li>User content: prompts, images, videos, uploads</li>
        <li>Technical data: IP address, browser/device info, analytics</li>
      </ul>
      <h2>2. How We Use Your Data</h2>
      <ul>
        <li>Provide and improve our AI tools</li>
        <li>Process payments and manage subscriptions</li>
        <li>Prevent fraud and secure the platform</li>
        <li>Deliver customer support and service updates</li>
        <li>Improve user experience and product quality</li>
      </ul>
      <h2>3. Sharing Your Data</h2>
      <p>We share information only with trusted processors that help deliver our service: Stripe (payments), Supabase (database/storage), Vercel/Render (hosting), and AI model partners such as OpenAI, Replicate, ElevenLabs, and HeyGen. We do not sell or trade personal data.</p>
      <h2>4. Your Rights</h2>
      <p>You may request data access, correction, deletion, or export. Contact: <a href="mailto:support@mintoralab.com">support@mintoralab.com</a>.</p>
      <h2>5. Security</h2>
      <p>We use industry-standard security and encryption. No online service can be 100% secure.</p>
      <h2>6. Children</h2>
      <p>Mintora Lab is not intended for anyone under 18.</p>
      <h2>7. Changes</h2>
      <p>We may update this policy; material changes will be notified in-app or by email.</p>
    </div>
  );
}
