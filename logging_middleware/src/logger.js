const axios = require("axios");
const { BASE_URL, TOKEN } = require("./config");

async function Log(stack, level, pkg, message) {
  try {
    if (!BASE_URL || !TOKEN) {
      return;
    }

    await axios.post(
      BASE_URL,
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    // Logging must never stop the main application flow.
  }
}

module.exports = Log;
