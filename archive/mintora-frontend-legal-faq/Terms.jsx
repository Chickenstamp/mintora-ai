import React from 'react';
export default function Terms() {
  return (
    <div style={maxWidth:900, margin:'24px auto', fontFamily:'system-ui, sans-serif'}>
      <h1>Terms of Service – Mintora Lab</h1>
      <p><i>Last updated: 2025-12-03</i></p>
      <h2>1. Using Mintora Lab</h2>
      <p>You agree to use the Services lawfully. You will not generate harmful, illegal, or copyrighted material, attempt to reverse-engineer the platform, or upload content you do not own rights to.</p>
      <h2>2. Accounts</h2>
      <p>You are responsible for your account security and all activity under it.</p>
      <h2>3. Payments & Subscriptions</h2>
      <ul>
        <li>Payments are processed by Stripe.</li>
        <li>Subscriptions renew automatically unless cancelled.</li>
        <li>You may cancel anytime; access remains until the end of the billing period.</li>
        <li>Used credits and completed generations are non-refundable.</li>
      </ul>
      <h2>4. AI-Generated Content</h2>
      <p>You own the output you create unless a model provider restricts commercial use. You must comply with provider licenses and policies (e.g., OpenAI, Replicate).</p>
      <h2>5. Limitation of Liability</h2>
      <p>The Service is provided “as is”. We are not liable for loss of profits, data, or interruptions, including outages from third‑party providers.</p>
      <h2>6. Termination</h2>
      <p>We may suspend or terminate accounts violating these Terms. You may delete your account at any time.</p>
      <h2>7. Governing Law</h2>
      <p>These Terms are governed by the laws of your operating jurisdiction.</p>
    </div>
  );
}
