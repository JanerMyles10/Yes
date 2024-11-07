<?php
if (isset($_GET['id'])) {
  $id = $_GET['id'];

  // Mark the reminder as notified
  $conn = new mysqli('localhost', 'username', 'password', 'calendar_db');
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $stmt = $conn->prepare("UPDATE reminders SET is_notified = TRUE WHERE id = ?");
  $stmt->bind_param("i", $id);
  $stmt->execute();
  $stmt->close();
  $conn->close();
}
?>
