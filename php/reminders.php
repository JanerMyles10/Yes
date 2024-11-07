<?php
// Fetch reminders from the database
$conn = new mysqli('localhost', 'username', 'password', 'calendar_db');
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM reminders WHERE is_notified = FALSE";
$result = $conn->query($sql);

$reminders = [];
while ($row = $result->fetch_assoc()) {
  $reminders[] = $row;
}

echo json_encode($reminders);
$conn->close();
?>
