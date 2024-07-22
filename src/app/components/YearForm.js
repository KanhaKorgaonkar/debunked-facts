import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateContent } from '../utils/gemini';

export default function YearForm({ setResults, setLoading }) {
  const [year, setYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const content = await generateContent(year);
      setResults(content);
    } catch (error) {
      console.error('Error generating content:', error);
      setResults({ results: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter graduation year"
          className="w-full sm:w-64 px-4 py-3 rounded-lg text-lg mb-4 sm:mb-0 sm:mr-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <motion.button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Discover Outdated Facts
        </motion.button>
      </div>
    </motion.form>
  );
}