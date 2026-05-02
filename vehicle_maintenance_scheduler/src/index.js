require("dotenv").config();

const { fetchVehicleData } = require("./apiClient");
const scheduleMaintenance = require("./scheduler");
const Log = require("../../logging_middleware/src");

async function main() {
  try {
    const data = await fetchVehicleData();
    const result = await scheduleMaintenance(data.tasks, data.mechanicHours);

    await Log("backend", "info", "main", "Scheduler result generated");

    console.log("Maximum Impact:", result.maxImpact);
    console.log("Selected Tasks:");
    result.selectedTasks.forEach((task) => {
      console.log(`- ${task.name}: ${task.duration} hour(s), impact ${task.impact}`);
    });

    return result;
  } catch (error) {
    await Log("backend", "error", "main", "Scheduler execution failed");
    console.error("Scheduler failed:", error.message);
    process.exitCode = 1;
    return null;
  }
}

if (require.main === module) {
  main();
}

module.exports = main;
