import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlightCard from '../components/FlightCard';
import { FaArrowLeft, FaPlane } from 'react-icons/fa';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!location.state) navigate('/');
    // Simulated API call
    setTimeout(() => {
      setFlights([/* Sample flight data */]);
      setLoading(false);
    }, 2000);
  }, [location.state, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl w-full max-w-4xl p-8">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-6 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          New Search
        </button>

        {loading && (
          <div className="text-center text-gray-600 flex items-center justify-center py-8">
            <FaPlane className="animate-bounce mr-2 text-2xl" />
            Loading flights...
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-6">
            {flights.length > 0 ? (
              flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))
            ) : (
              <p className="text-center text-gray-600 py-8">No flights found for these criteria</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;