import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Results({ results }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!results || !results.results || results.results.length === 0) {
    return (
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-600">No results to display or an error occurred.</p>
      </motion.div>
    );
  }

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {results.results.map((fact, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <button
            className="w-full text-left px-6 py-4 bg-blue-600 text-white font-semibold focus:outline-none"
            onClick={() => toggleExpand(index)}
          >
            {fact.oldConcept}
          </button>
          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 space-y-3"
              >
                <p className="text-gray-600"><span className="font-semibold">New Understanding:</span> {fact.newUnderstanding}</p>
                <p className="text-gray-600"><span className="font-semibold">Year Revised:</span> {fact.yearRevised}</p>
                <p className="text-gray-600"><span className="font-semibold">Explanation:</span> {fact.explanation}</p>
                <p className="text-gray-600"><span className="font-semibold">Implications:</span> {fact.implications}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}