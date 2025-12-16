export default function FAQ() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Is Mintora free?</h2>
          <p className="text-gray-400">
            Mintora offers a free tier with limited daily generations. Paid plans unlock higher resolutions,
            API access, gaming tools, and faster generation speed.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Can I use generated content commercially?</h2>
          <p className="text-gray-400">
            Yes. All paid plans include commercial usage. Enterprise includes full game-asset licensing.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Do you store my data?</h2>
          <p className="text-gray-400">
            Prompts are processed securely. Enterprise clients may request zero-retention environments.
          </p>
        </div>
      </div>
    </div>
  );
}
