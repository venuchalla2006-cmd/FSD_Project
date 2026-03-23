<?php
session_start();
include(__DIR__ . "/db.php");

if(!isset($_SESSION['user_id'])) {
    echo "Login required";
    exit();
}

$user_id = $_SESSION['user_id'];
$course_id = $_GET['course_id'];
$payment_id = $_GET['payment_id'];

// Insert enrollment
$sql = "INSERT INTO enrollments (user_id, course_id, payment_id)
        VALUES ('$user_id', '$course_id', '$payment_id')";

$result = mysqli_query($conn, $sql);

if(!$result){
    die("Enroll Error: " . mysqli_error($conn));
}
echo "Enrollment Successful! Redirecting...";

header("refresh:2; url=dashboard.php");
exit();
?>