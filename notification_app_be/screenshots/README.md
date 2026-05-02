# API Testing Screenshots

Save the final Postman screenshots in this folder using these exact names.

```text
01_get_notifications.png
02_create_notification.png
03_mark_single_read.png
04_mark_all_read.png
05_mark_read_response_list.png
06_additional_read_test.png
```

## Recommended Order

1. `01_get_notifications.png` - `GET /notifications`, showing the notifications list.
2. `02_create_notification.png` - `POST /notifications`, showing `201 Created`.
3. `03_mark_single_read.png` - `POST /notifications/read` with an `id` in the request body.
4. `04_mark_all_read.png` - `POST /notifications/read` with `{}` in the request body.
5. `05_mark_read_response_list.png` - a read-update response showing a list of updated notifications.
6. `06_additional_read_test.png` - an extra successful read-update test.

These names keep the screenshots in a clear reviewer-friendly order.
