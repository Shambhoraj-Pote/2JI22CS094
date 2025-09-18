import React from 'react';
import ShortenForm from '../components/ShortenForm';
import ShortUrlList from '../components/ShortUrlList';


export default function Home() {
return (
<div className="container">
<h1>URL Shortener</h1>
<ShortenForm />
<hr style={{margin:'20px 0'}} />
<ShortUrlList />
</div>
);
}