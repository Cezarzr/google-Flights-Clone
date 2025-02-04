import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    originSkyId: "LOND",
    destinationSkyId: "NYCA",
    date: "2024-07-01",
    originEntityId: "27544008",
    destinationEntityId: "27537542",
  });
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (formData.originSkyId.length !== 4 || formData.destinationSkyId.length !== 4) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    onSearch(formData);
    setLoading(true);
    navigate("/results", { state: formData });
    setFormData({
      originSkyId: "LOND",
      destinationSkyId: "NYCA",
      date: "2024-07-01",
      originEntityId: "27544008",
      destinationEntityId: "27537542",
    });
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        ✈️ Find Your Perfect Flight
      </h1>
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From (Sky ID)</label>
            <input
              value={formData.originSkyId}
              onChange={(e) => setFormData({ ...formData, originSkyId: e.target.value.toUpperCase() })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              maxLength="4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To (Sky ID)</label>
            <input
              value={formData.destinationSkyId}
              onChange={(e) => setFormData({ ...formData, destinationSkyId: e.target.value.toUpperCase() })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              maxLength="4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
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

        {!isValid && (
          <p className="text-red-500 text-sm mt-2">Please enter valid 4-letter Sky IDs for both airports.</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;