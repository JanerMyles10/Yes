<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $event_name = $_POST['event_name'];
  $event_time = $_POST['event_time'];

  // Calculate notification time (e.g., 10 minutes before the event)
  $notify_time = date('Y-m-d H:i:s', strtotime($event_time) - 600); // 600 seconds = 10 minutes

  // Save to database
  $conn = new mysqli('localhost', 'username', 'password', 'calendar_db');
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $stmt = $conn->prepare("INSERT INTO reminders (event_name, event_date, event_time, notify_time) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("ssss", $event_name, $event_date, $event_time, $notify_time);
  $stmt->execute();
  $stmt->close();
  $conn->close();
}
?>
