'use client';

import { useState } from 'react';
import Head from 'next/head';
import YearForm from './components/YearForm';
import Results from './components/Results';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';

export default function Home() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">
      <Head>
        <title>Debunked Facts</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">Debunked Facts</h1>
        <YearForm setResults={setResults} setLoading={setLoading} />
        {loading && <LoadingScreen />}
        {results && (
          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Discoveries:</h2>
            <Results results={results} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}