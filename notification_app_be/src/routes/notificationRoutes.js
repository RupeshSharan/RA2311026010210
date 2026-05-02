const express = require("express");
const notificationController = require("../controllers/notificationController");

const router = express.Router();

router.get("/", notificationController.fetchNotifications);
router.post("/", notificationController.sendNotification);
router.post("/read", notificationController.markNotificationAsRead);

module.exports = router;
