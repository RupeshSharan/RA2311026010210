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

## Final Screenshots To Capture

Save the screenshots inside `notification_app_be/screenshots` with these names:

```text
01_get_notifications.png
02_create_notification.png
03_mark_single_read.png
04_mark_all_read.png
05_verify_notifications_after_read.png
06_extra_test_case.png
```

### 1. Get Notifications

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

Save as `01_get_notifications.png`.

### 2. Create Notification

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

Save as `02_create_notification.png`.

### 3. Mark One Notification As Read

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

Save as `03_mark_single_read.png`.

### 4. Mark All Notifications As Read

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

Save as `04_mark_all_read.png`.

### 5. Verify Notifications After Read

Request:

```http
POST http://localhost:3000/notifications/read
```

Expected response should show updated notification data with `isRead: true`. This works as verification because the response returns the updated records after the read action.

Save as `05_verify_notifications_after_read.png`.

### 6. Extra Test Case

Use one extra successful read-update request as bonus proof.

Save as `06_extra_test_case.png`.

## Optional Health Check

The collection also includes:

```http
GET http://localhost:3000/
```

Expected response:

```json
{
  "message": "Notification backend is running"
}
```

This is useful while testing, but the final six screenshots can focus on the notification API flow.

## Screenshot Tips

- Keep the request URL, method, body, status code, and response visible.
- Capture one screenshot per request.
- Run `Create Notification` before `Mark One Notification As Read` so the ID variable is available.
