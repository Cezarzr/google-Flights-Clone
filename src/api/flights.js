import api from "./skyScrapper";

export const searchFlights = async (params) => {
  try {
    const response = await api.get("/searchFlights", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    return null;
  }
};