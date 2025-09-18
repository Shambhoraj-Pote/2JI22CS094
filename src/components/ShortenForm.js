import React, { useState } from 'react';
import { createShort } from '../utils/storage';


export default function ShortenForm() {
const [url, setUrl] = useState('');
const [expiry, setExpiry] = useState('');
const [created, setCreated] = useState(null);


function handleSubmit(e) {
e.preventDefault();
try {
const obj = createShort(url.trim(), expiry || null);
setCreated(obj);
setUrl('');
setExpiry('');
} catch (err) {
alert('Failed to create short URL');
}
}


function copyToClipboard(text) {
if (navigator.clipboard) {
navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard'));
} else {
alert('Clipboard not available');
}
}


return (
<div>
<form onSubmit={handleSubmit}>
<input
type="url"
placeholder="https://example.com/page"
value={url}
onChange={(e) => setUrl(e.target.value)}
required
/>


<input
type="datetime-local"
value={expiry}
onChange={(e) => setExpiry(e.target.value)}
title="Optional expiry"
/>


<button type="submit">Create</button>
</form>


{created && (
<div className="created">
<div>
<strong>Short link: </strong>
<a href={`/r/${created.slug}`} target="_blank" rel="noreferrer">
{window.location.origin + '/r/' + created.slug}
</a>
</div>
<small>Created: {new Date(created.createdAt).toLocaleString()}</small>
}