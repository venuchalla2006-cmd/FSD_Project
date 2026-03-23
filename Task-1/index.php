<!DOCTYPE html>
<html>
<head>
    <title>Task-1 Student Registration</title>
    <style>
        body {
            font-family: Arial;
            background: linear-gradient(to right, #4facfe, #00f2fe);
        }
        .box {
            width: 400px;
            margin: 80px auto;
            background: white;
            padding: 25px;
            border-radius: 10px;
        }
        input, select {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
        }
        button {
            width: 100%;
            padding: 10px;
            background: blue;
            color: white;
            border: none;
        }
    </style>
</head>
<body>

<div class="box">
    <h2>Task-1 Registration</h2>

    <form action="insert.php" method="POST">
        <input type="text" name="name" placeholder="Name" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="date" name="dob" required>

        <select name="department" required>
            <option value="">Select Department</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
        </select>

        <input type="text" name="phone" placeholder="Phone" required>

        <button type="submit">Register</button>
    </form>

    <a href="view.php">View Students</a>
</div>

</body>
</html>