import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadUrls, saveUrls } from "../utils/storage";

export default function RedirectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = loadUrls();
    const urlObj = urls.find((u) => u.slug === slug);

    if (!urlObj) {
      navigate("/");
      return;
    }

    const click = {
      timestamp: Date.now(),
      referrer: document.referrer,
      location: "N/A",
    };

    urlObj.clicks.push(click);
    saveUrls(urls);

    window.location.href = urlObj.originalUrl;
  }, [slug, navigate]);

  return <p>Redirecting...</p>;
}
