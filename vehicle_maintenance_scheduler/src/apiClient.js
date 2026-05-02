const axios = require("axios");
const Log = require("../../logging_middleware/src");

const fallbackVehicleData = {
  mechanicHours: 8,
  tasks: [
    { name: "Brake Check", duration: 2, impact: 8 },
    { name: "Oil Change", duration: 1, impact: 5 },
    { name: "Engine Tune", duration: 3, impact: 10 },
    { name: "Tire Rotation", duration: 2, impact: 6 },
    { name: "Battery Inspection", duration: 1.5, impact: 7 }
  ]
};

async function fetchVehicleData() {
  try {
    if (!process.env.VEHICLE_API_URL) {
      throw new Error("VEHICLE_API_URL is not configured");
    }

    const response = await axios.get(process.env.VEHICLE_API_URL);
    await Log("backend", "info", "api", "Fetched data from API");
    return response.data;
  } catch (error) {
    await Log("backend", "warn", "api", "Using fallback sample data");
    return fallbackVehicleData;
  }
}

module.exports = { fetchVehicleData, fallbackVehicleData };
