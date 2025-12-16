import React from 'react';
export default function FAQ() {
  return (
    <div style={{maxWidth:900, margin:'24px auto', fontFamily:'system-ui, sans-serif'}}>
      <h1>Mintora Lab – Frequently Asked Questions</h1>

      <h3>What is Mintora Lab?</h3>
      <p>Mintora Lab is an AI-powered creative studio for generating videos, images, audio, avatars, and more.</p>

      <h3>Do I own the content I create?</h3>
      <p>Yes, unless a specific third‑party model has licensing restrictions. Check project settings for any model‑specific limits.</p>

      <h3>Which formats do you support?</h3>
      <p>Images: PNG/JPG. Videos: MP4 (1080p/4K by tier). Audio: MP3/WAV. Subtitles: SRT.</p>

      <h3>How do credits work?</h3>
      <p>Each generation consumes credits based on resolution, duration, and model. Higher tiers include more credits; you can purchase credit packs anytime.</p>

      <h3>Can I use the outputs commercially?</h3>
      <p>Yes for most workflows. You are responsible for complying with any provider/model license terms.</p>

      <h3>How long do generations take?</h3>
      <p>Images: ~3–10s, Videos: ~10–60s, Audio: ~3–15s, depending on demand and model.</p>

      <h3>What payment methods are supported?</h3>
      <p>Stripe supports major cards, Apple Pay, Google Pay, and regional methods where available.</p>

      <h3>Can I cancel anytime?</h3>
      <p>Yes. Cancellation stops future billing; you retain access until the period ends.</p>

      <h3>Is my data private?</h3>
      <p>We do not sell data. Billing is processed by Stripe; we never store card numbers. See our Privacy Policy for details.</p>

      <h3>Do you offer team or enterprise plans?</h3>
      <p>Yes — contact sales@mintoralab.com for seats, shared credits, and priority rendering.</p>
    </div>
  );
}
