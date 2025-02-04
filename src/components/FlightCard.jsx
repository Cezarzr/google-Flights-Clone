import React from 'react';
import { FaChair, FaClock, FaMoneyBillWave } from 'react-icons/fa';

const FlightCard = ({ flight }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">
            {flight.departure} → {flight.arrival}
          </h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center">
            <FaChair className="mr-2" />
            {flight.airline}
          </p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {flight.class || 'Economy'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600 flex items-center">
            <FaClock className="mr-2" />
            Departure
          </p>
          <p className="font-medium text-gray-800">
            {new Date(flight.departureTime).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 flex items-center">
            <FaClock className="mr-2" />
            Duration
          </p>
          <p className="font-medium text-gray-800">
            {formatDuration(flight.duration)}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold text-blue-600 flex items-center">
            <FaMoneyBillWave className="mr-2" />
            {flight.price}
          </p>
          <p className="text-sm text-gray-500">{flight.stops} stops</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FlightCard;