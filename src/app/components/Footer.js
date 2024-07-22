import { useState, useEffect } from 'react';

export default function Footer() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const storedVisits = localStorage.getItem('pageVisits');
    const newVisits = storedVisits ? parseInt(storedVisits) + 1 : 1;
    localStorage.setItem('pageVisits', newVisits.toString());
    setVisits(newVisits);
  }, []);

  return (
    <footer className="mt-12 py-6 bg-gray-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <p>Built by Kanha Korgaonkar</p>
        <p>
          <a href="https://twitter.com/KorgaonkarKanha" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
            @KorgaonkarKanha on X
          </a>
        </p>
        <p className="mt-2">Number of visits: {visits}</p>
      </div>
    </footer>
  );
}