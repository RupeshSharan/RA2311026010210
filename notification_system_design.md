# Notification System Design

## Stage 1: API Design

The notification service starts with three simple APIs. These are enough for a basic inbox and can later be extended for filtering, pagination, or real-time updates.

- GET `/notifications` fetches notifications.
- POST `/notifications` creates a new notification.
- POST `/notifications/read` marks one notification, or all notifications, as read.

For real-time delivery, WebSocket or Server-Sent Events can be added later. I would choose WebSocket if the app needs two-way communication, and Server-Sent Events if the server only needs to push updates to the client.

## Stage 2: Database Design

A relational database like PostgreSQL is a good fit because notifications have a clear structure and are usually queried by user, read status, and time.

Suggested table:

- id
- studentId
- type
- message
- isRead
- createdAt

This table stays simple, but it still supports the most common inbox actions: fetch latest notifications, show unread messages, and mark messages as read.

## Stage 3: Query Optimization

As the number of notifications grows, this kind of query can become slow if the database has to scan the whole table:

```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt DESC;
```

To improve performance, use a composite index:

```sql
CREATE INDEX idx_notifications_student_read_created
ON notifications(studentID, isRead, createdAt DESC);
```

This index matches the way the query filters and sorts data. It helps the database find unread notifications for one student quickly and return the newest ones first.

## Stage 4: Performance Fix

To keep the database from doing unnecessary work:

- Use Redis caching.
- Add pagination.
- Avoid loading too many records at once.
- Fetch data only when needed.

For example, the API should return the latest page of notifications first instead of sending the full history every time.

## Stage 5: Reliable Notifications

For bulk notifications, queue-based processing is safer than sending everything directly from the API request. The API can place jobs in a queue, and worker processes can deliver them in the background.

A queue system like RabbitMQ or Kafka helps with:

- Retry handling.
- Asynchronous processing.
- Failure recovery.
- Better scalability.

## Stage 6: Priority Inbox

Not all notifications are equally urgent. A priority inbox can rank messages like this:

- Placement = highest.
- Result = medium.
- Event = lower.

Recent notifications should also get a higher score. A simple scoring formula using notification type and timestamp is enough for a first version, and it can later be improved using user behavior.
