import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectionTest = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/test');
        setMessage(response.data.message);
        setError('');
      } catch (err) {
        setError('Failed to connect to backend');
        console.error('Connection error:', err);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 rounded-lg shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">Backend Connection Status</h2>
      {loading ? (
        <div className="text-gray-600">Testing connection...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="text-green-500">{message}</div>
      )}
    </div>
  );
};

export default ConnectionTest;