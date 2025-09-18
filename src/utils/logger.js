// src/utils/logger.js

export function logger(action, payload = {}) {
  const entry = {
    action,
    payload,
    timestamp: new Date().toISOString(),
  };

  console.log("[Logger]", entry);

  // Persist logs to localStorage (optional)
  const existing = JSON.parse(localStorage.getItem("url_logs") || "[]");
  existing.push(entry);
  localStorage.setItem("url_logs", JSON.stringify(existing));
}
