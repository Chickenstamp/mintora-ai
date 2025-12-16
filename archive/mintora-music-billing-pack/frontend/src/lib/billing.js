export async function createCheckout(url, payload, userId){
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-User-Id": userId },
    body: JSON.stringify(payload)
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error || "Checkout failed");
  window.location = d.url;
}

export async function getBalance(apiBase, userId){
  const r = await fetch(`${apiBase}/api/billing/credits/balance`, { headers: { "X-User-Id": userId } });
  return await r.json();
}

export async function consumeCredits(apiBase, userId, amount=1){
  const r = await fetch(`${apiBase}/api/billing/credits/consume`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-User-Id": userId },
    body: JSON.stringify({ amount })
  });
  return await r.json();
}
