export default function Enterprise() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-6">Enterprise Solutions</h1>
      <p className="text-gray-300 text-lg mb-8">
        Mintora Labs provides scalable AI solutions for imaging, video, gaming, and music production.
        Built for product teams, studios, and organizations requiring enterprise-level performance.
      </p>

      <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-700">
        <h2 className="text-3xl font-semibold mb-4">What’s Included</h2>
        <ul className="list-disc ml-6 text-gray-400 space-y-2">
          <li>Unlimited high-resolution generation</li>
          <li>Dedicated GPU clusters & fast lanes</li>
          <li>Multi-team access with role controls</li>
          <li>API access with priority throughput</li>
          <li>Gaming asset generation bundle</li>
          <li>Music synthesis & voice generation</li>
          <li>Commercial & extended licensing</li>
        </ul>
      </div>

      <div className="mt-10 p-6 bg-neutral-800 rounded-xl border border-neutral-700">
        <h3 className="text-2xl font-semibold mb-2">Custom Pricing</h3>
        <p className="text-gray-400">
          Enterprise pricing is tailored to compute needs, model access, dataset security, and team size.
          Contact our team to receive an exact quote.
        </p>
      </div>
    </div>
  );
}
