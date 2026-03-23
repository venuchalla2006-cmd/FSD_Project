<?php
session_start();
include(__DIR__ . "/db.php");

// 🔥 IMPORTANT: Check if user logged in
if(!isset($_SESSION['user_id'])) {
    echo "Error: User not logged in";
    exit();
}

$user_id = $_SESSION['user_id'];
$course_id = $_POST['course_id'];
$amount = $_POST['amount'];

// Insert payment
$sql = "INSERT INTO payments (user_id, course_id, amount, status)
        VALUES ('$user_id', '$course_id', '$amount', 'Paid')";

$result = mysqli_query($conn, $sql);

if(!$result){
    die("Payment Error: " . mysqli_error($conn));
}

// Get payment ID
$payment_id = mysqli_insert_id($conn);

// Redirect to enroll page
header("Location: enroll.php?course_id=$course_id&payment_id=$payment_id");
exit();
?>