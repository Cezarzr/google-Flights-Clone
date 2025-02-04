import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaSearch } from 'react-icons/fa';

const SearchPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    originSkyId: 'LOND',
    destinationSkyId: 'NYCA',
    date: '2024-07-01',
    originEntityId: '27544008',
    destinationEntityId: '27537542',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.originSkyId || !formData.destinationSkyId || !formData.date || 
        !formData.originEntityId || !formData.destinationEntityId) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    navigate('/results', { state: formData });
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
    
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
          <FaPlaneDeparture className="mr-3 text-blue-600" />
          Flight Search
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaPlaneDeparture className="mr-2 text-blue-600" />
                From (Sky ID)
              </label>
              <input
                value={formData.originSkyId}
                onChange={(e) => setFormData({ ...formData, originSkyId: e.target.value.toUpperCase() })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                maxLength="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaPlaneArrival className="mr-2 text-blue-600" />
                To (Sky ID)
              </label>
              <input
                value={formData.destinationSkyId}
                onChange={(e) => setFormData({ ...formData, destinationSkyId: e.target.value.toUpperCase() })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                maxLength="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" />
                Departure Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Origin Entity ID</label>
              <input
                value={formData.originEntityId}
                onChange={(e) => setFormData({ ...formData, originEntityId: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination Entity ID</label>
              <input
                value={formData.destinationEntityId}
                onChange={(e) => setFormData({ ...formData, destinationEntityId: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center"
            disabled={loading}
          >
            <FaSearch className="mr-2" />
            {loading ? 'Searching...' : 'Find Flights'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;