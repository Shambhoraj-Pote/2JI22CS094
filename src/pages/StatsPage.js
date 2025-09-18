import React from "react";
import { loadUrls } from "../utils/storage";

export default function StatsPage() {
  const urls = loadUrls();

  return (
    <div>
      <h2>Statistics</h2>
      {urls.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ul>
          {urls.map((u) => (
            <li key={u.slug}>
              {u.slug} → {u.originalUrl} ({u.clicks.length} clicks)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
