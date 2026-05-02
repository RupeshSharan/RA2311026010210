const knapsack = require("./knapsack");
const Log = require("../../logging_middleware/src");

function normalizeTasks(tasks) {
  if (!Array.isArray(tasks)) {
    throw new Error("Tasks must be an array");
  }

  return tasks.map((task) => {
    const duration = Number(task.duration);
    const impact = Number(task.impact);

    if (!Number.isFinite(duration) || duration <= 0) {
      throw new Error(`Invalid duration for task: ${task.name || "unknown"}`);
    }

    if (!Number.isFinite(impact) || impact < 0) {
      throw new Error(`Invalid impact for task: ${task.name || "unknown"}`);
    }

    return {
      ...task,
      duration: Math.round(duration * 10),
      impact,
      originalDuration: duration
    };
  });
}

function restoreTaskDurations(tasks) {
  return tasks.map((task) => {
    const { originalDuration, ...cleanTask } = task;
    return {
      ...cleanTask,
      duration: originalDuration
    };
  });
}

async function scheduleMaintenance(tasks, mechanicHours) {
  await Log("backend", "info", "scheduler", "Starting task optimization");

  const normalizedHours = Math.round(Number(mechanicHours) * 10);

  if (!Number.isFinite(normalizedHours) || normalizedHours < 0) {
    throw new Error("Mechanic hours must be a valid non-negative number");
  }

  const normalizedTasks = normalizeTasks(tasks);
  const result = knapsack(normalizedTasks, normalizedHours);

  await Log("backend", "info", "scheduler", "Task optimization completed");

  return {
    maxImpact: result.maxImpact,
    selectedTasks: restoreTaskDurations(result.selectedTasks)
  };
}

module.exports = scheduleMaintenance;
module.exports.normalizeTasks = normalizeTasks;
