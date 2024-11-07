<?php
session_start(); 
require 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $event_name = $_POST['event_name'];
    $event_time_from = $_POST['event_time_from'];
    $event_time_to = $_POST['event_time_to'];
    $event_date = $_POST['event_date'];


    $user_id = $_SESSION['user_id'];

    $stmt = $conn->prepare("INSERT INTO user_events (user_id, event_name, event_time_from, event_time_to, event_date) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issss", $user_id, $event_name, $event_time_from, $event_time_to, $event_date);
    if ($stmt->execute()) {
        echo "Event added successfully!";
    } else {
        echo "Error adding event: " . $stmt->error;
    }
}
?>
