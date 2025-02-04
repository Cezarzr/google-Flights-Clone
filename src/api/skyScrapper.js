import axios from 'axios';

export const AIRPORT_DATA = {
  NYC: { skyId: 'NYC', entityId: '27537542' },
  LON: { skyId: 'LON', entityId: '27544008' },
  LAX: { skyId: 'LAX', entityId: '27539733' },
  PAR: { skyId: 'PAR', entityId: '27546610' },
  DXB: { skyId: 'DXB', entityId: '27540061' }
};

// Load API Key from environment variables
const RAPIDAPI_KEY = "6ac7f207b0mshcd052258351de34p1e141ejsnd3c467559dd2";

if (!RAPIDAPI_KEY) {
  console.error('❌ Missing API Key! Ensure .env is set up correctly.');
}

const api = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
  }
});

// Cache to store previous API results (5 min TTL)
const requestCache = new Map();

export const searchFlights = async (params) => {
  const cacheKey = JSON.stringify(params);

  // ✅ Return cached response if available
  if (requestCache.has(cacheKey)) {
    console.log('🟢 Returning cached flights:', requestCache.get(cacheKey));
    return requestCache.get(cacheKey);
  }

  // ⏳ Rate Limiting (2 seconds per request)
  const lastRequest = localStorage.getItem('lastApiRequest');
  if (lastRequest && Date.now() - lastRequest < 2000) {
    throw new Error('⏳ Please wait 2 seconds before searching again.');
  }

  try {
    localStorage.setItem('lastApiRequest', Date.now());
    
    console.log('🔍 Fetching flights with params:', params);

    // Construct the full URL with query parameters
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?originSkyId=${params.originSkyId}&destinationSkyId=${params.destinationSkyId}&date=${params.date}&originEntityId=${params.originEntityId}&destinationEntityId=${params.destinationEntityId}`;

    const response = await api.get(url);

    console.log('✅ Full API Response:', response);

    if (!response.data?.data) {
      throw new Error('🚨 API response missing expected `data` property.');
    }

    if (!response.data.data.flights || !Array.isArray(response.data.data.flights)) {
      throw new Error('🚨 No flights found in API response.');
    }

    // ✅ Cache successful response for 5 minutes
    requestCache.set(cacheKey, response.data.data.flights);
    setTimeout(() => requestCache.delete(cacheKey), 300000);

    return response.data.data.flights;
  } catch (error) {
    console.error('❌ API Error:', error.response?.data || error.message);

    if (error.response?.status === 429) {
      throw new Error('🚫 Too many requests. Please wait 10 seconds before retrying.');
    }

    throw new Error(error.response?.data?.message || 'Failed to fetch flights.');
  }
};
