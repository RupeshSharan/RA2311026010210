require("dotenv").config();

const express = require("express");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Notification backend is running"
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Notification server running on port ${PORT}`);
  });
}

module.exports = app;
