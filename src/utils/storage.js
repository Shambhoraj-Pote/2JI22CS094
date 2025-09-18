

export function saveUrls(urls) {
localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
}


export function generateSlug(length = 6) {
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let s = '';
for (let i = 0; i < length; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
return s;
}


export function createShort(originalUrl, expiresAt = null) {
const urls = loadUrls();
let slug;
do {
slug = generateSlug();
} while (urls.some((u) => u.slug === slug));


const now = new Date().toISOString();
const obj = {
slug,
originalUrl,
createdAt: now,
expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
clicks: [],
};
urls.unshift(obj);
saveUrls(urls);
return obj;
}


export function getUrlBySlug(slug) {
const urls = loadUrls();
return urls.find((u) => u.slug === slug) || null;
}


export function addClickToSlug(slug, clickRecord) {
const urls = loadUrls();
const idx = urls.findIndex((u) => u.slug === slug);
if (idx === -1) return false;
urls[idx].clicks.push(clickRecord);
saveUrls(urls);
return true;
}


export function deleteUrl(slug) {
const urls = loadUrls().filter((u) => u.slug !== slug);
saveUrls(urls);
}