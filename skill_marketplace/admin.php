<?php
include 'config.php';

$password = password_hash("admin123", PASSWORD_DEFAULT);

$conn->query("INSERT INTO users(name,email,password,role)
VALUES('Admin','admin@gmail.com','$password','admin')");

echo "Admin Created Successfully";
?>