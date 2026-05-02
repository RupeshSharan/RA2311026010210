const notifications = [
  {
    id: "1",
    studentId: 1042,
    type: "Placement",
    message: "Placement registration opens today.",
    isRead: false,
    createdAt: new Date().toISOString()
  }
];

function getNotifications() {
  return notifications;
}

function createNotification(data) {
  const notification = {
    id: String(Date.now()),
    studentId: data.studentId || null,
    type: data.type || "General",
    message: data.message || "New notification",
    isRead: false,
    createdAt: new Date().toISOString()
  };

  notifications.unshift(notification);
  return notification;
}

function markAsRead(id) {
  if (!id) {
    notifications.forEach((notification) => {
      notification.isRead = true;
    });
    return notifications;
  }

  const notification = notifications.find((item) => item.id === String(id));

  if (notification) {
    notification.isRead = true;
  }

  return notification;
}

module.exports = {
  getNotifications,
  createNotification,
  markAsRead
};
