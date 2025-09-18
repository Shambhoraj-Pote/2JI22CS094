
import React, { useEffect, useState } from 'react';
import { loadUrls, deleteUrl } from '../utils/storage';

export default function ShortUrlList() {
  const [urls, setUrls] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    refresh();

    const onStorage = (e) => {
     
      if (!e || e.key === 'url_shortener_v1') refresh();
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function refresh() {
    try {
      const data = loadUrls();
      setUrls(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load URLs', err);
      setUrls([]);
    }
  }

  function handleDelete(slug) {
    if (!window.confirm('Delete this short link?')) return;
    try {
      deleteUrl(slug);
      // close details for deleted slug if open
      setExpanded((prev) => {
        const copy = { ...prev };
        delete copy[slug];
        return copy;
      });
      refresh();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete link');
    }
  }

  function toggleDetails(slug) {
    setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }

  const origin = typeof window !== 'undefined' && window.location ? window.location.origin : '';

  return (
    <div>
      <h2>Shortened URLs</h2>

      {urls.length === 0 ? (
        <p>No short links created yet.</p>
      ) : (
        <ul className="url-list">
          {urls.map((u) => {
            const slug = u?.slug ?? '';
            const clicks = Array.isArray(u?.clicks) ? u.clicks : [];
            const created = u?.createdAt ? new Date(u.createdAt).toLocaleString() : '—';
            const expires = u?.expiresAt ? new Date(u.expiresAt).toLocaleString() : null;

            return (
              <li key={slug}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <a href={`/r/${slug}`} target="_blank" rel="noreferrer">
                      {origin + '/r/' + slug}
                    </a>
                    <div className="meta">
                      Created: {created}
                      {expires ? ` • Expires: ${expires}` : ''}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div>
                      <strong>{clicks.length}</strong> clicks
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <button type="button" onClick={() => toggleDetails(slug)} style={{ marginRight: 8 }}>
                        Details
                      </button>
                      <button type="button" onClick={() => handleDelete(slug)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                {expanded[slug] && (
                  <div className="clicks" style={{ marginTop: 10 }}>
                    {clicks.length === 0 ? (
                      <p>No clicks recorded for this link yet.</p>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>Time</th>
                            <th>Source</th>
                            <th>Referrer</th>
                            <th>Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clicks.map((c, idx) => (
                            <tr key={idx}>
                              <td>{c?.timestamp ? new Date(c.timestamp).toLocaleString() : '—'}</td>
                              <td>{c?.source ?? '-'}</td>
                              <td>{c?.referrer ?? '-'}</td>
                              <td>{c?.location ?? '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

