<?php
session_start();
include(__DIR__ . "/db.php");

$course_id = $_GET['course_id'];

// Fetch course details
$query = "SELECT * FROM courses WHERE id = '$course_id'";
$result = mysqli_query($conn, $query);
$course = mysqli_fetch_assoc($result);

$price = $course['price'];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Payment</title>
    <style>
        body {
            font-family: Arial;
            background: #f4f6f9;
        }
        .container {
            width: 400px;
            margin: 80px auto;
            background: #fff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }
        h2 {
            text-align: center;
            color: #333;
        }
        .course-box {
            background: #eef2ff;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 15px;
        }
        .price {
            font-size: 22px;
            color: green;
            font-weight: bold;
        }
        input {
            width: 100%;
            padding: 10px;
            margin-top: 8px;
            margin-bottom: 15px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
        button {
            width: 100%;
            padding: 12px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover {
            background: #45a049;
        }
        .methods {
            margin: 10px 0;
        }
        .methods label {
            display: block;
            margin-bottom: 5px;
        }
    </style>
</head>

<body>

<div class="container">
    <h2>💳 Payment</h2>

    <div class="course-box">
        <p><strong><?php echo $course['title']; ?></strong></p>
        <p class="price">₹<?php echo $price; ?></p>
    </div>

    <form action="process_payment.php" method="POST">
        <input type="hidden" name="course_id" value="<?php echo $course_id; ?>">
        <input type="hidden" name="amount" value="<?php echo $price; ?>">

        <label>Select Payment Method:</label>
        <div class="methods">
            <label><input type="radio" name="method" value="UPI" checked> UPI</label>
            <label><input type="radio" name="method" value="Card"> Credit/Debit Card</label>
            <label><input type="radio" name="method" value="NetBanking"> Net Banking</label>
        </div>

        <button type="submit">Pay ₹<?php echo $price; ?></button>
    </form>
</div>

</body>
</html>