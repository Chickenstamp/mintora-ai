// frontend/src/utils/currency.js
export const SUPPORTED_CURRENCIES = ["USD", "AUD", "AED", "EUR", "GBP"];

// Ensure .99 endings for display (pricing values are given as numbers like 29.99 already)
export function formatPrice(value, currency = "USD") {
  const rounded = Math.floor(Number(value)); // base whole
  const display = `${rounded}.99`; // force .99 ending visually
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(display));
}
