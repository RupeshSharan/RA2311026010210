# Postman Screenshot Guide

Use this guide to capture clean testing screenshots for the notification backend.

## Before Taking Screenshots

Start the backend from the project root:

```bash
npm run notification
```

Then open Postman and import:

- `postman/RA2311026010210.postman_collection.json`
- `postman/local.postman_environment.json`

Select the `RA2311026010210 Local` environment before sending requests.

## Screenshots To Capture

### 1. Health Check

Request:

```http
GET http://localhost:3000/
```

Expected response:

```json
{
  "message": "Notification backend is running"
}
```

This proves the backend server is active.

### 2. Fetch Notifications

Request:

```http
GET http://localhost:3000/notifications
```

Expected response includes:

```json
{
  "notifications": []
}
```

or an array with sample notifications.

### 3. Create Notification

Request:

```http
POST http://localhost:3000/notifications
Content-Type: application/json
```

Body:

```json
{
  "studentId": 1042,
  "type": "Placement",
  "message": "Placement registration opens today."
}
```

Expected response:

```json
{
  "message": "Notification created",
  "notification": {
    "studentId": 1042,
    "type": "Placement",
    "message": "Placement registration opens today.",
    "isRead": false
  }
}
```

This proves the backend can create a notification.

### 4. Mark One Notification As Read

Request:

```http
POST http://localhost:3000/notifications/read
Content-Type: application/json
```

Body:

```json
{
  "id": "{{notificationId}}"
}
```

The Postman collection automatically stores `notificationId` after the create request.

Expected response:

```json
{
  "message": "Notification marked as read"
}
```

This proves one selected notification can be updated.

### 5. Mark All Notifications As Read

Request:

```http
POST http://localhost:3000/notifications/read
Content-Type: application/json
```

Body:

```json
{}
```

Expected response:

```json
{
  "message": "Notification marked as read"
}
```

This proves the backend supports an intentional mark-all-as-read action.

## Screenshot Tips

- Keep the request URL, method, body, status code, and response visible.
- Capture one screenshot per request.
- Run `Create Notification` before `Mark One Notification As Read` so the ID variable is available.
