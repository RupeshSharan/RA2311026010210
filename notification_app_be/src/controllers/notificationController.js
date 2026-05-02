const notificationService = require("../services/notificationService");

function fetchNotifications(req, res) {
  res.json({
    notifications: notificationService.getNotifications()
  });
}

function sendNotification(req, res) {
  const notification = notificationService.createNotification(req.body);

  res.status(201).json({
    message: "Notification created",
    notification
  });
}

function markNotificationAsRead(req, res) {
  const updated = notificationService.markAsRead(req.body.id);

  if (!updated) {
    return res.status(404).json({
      message: "Notification not found"
    });
  }

  return res.json({
    message: "Notification marked as read",
    updated
  });
}

module.exports = {
  fetchNotifications,
  sendNotification,
  markNotificationAsRead
};
