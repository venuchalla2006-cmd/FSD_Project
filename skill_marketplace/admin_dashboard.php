<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <style>
        body {
            margin: 0;
            font-family: Arial;
            display: flex;
            background: #f4f6f9;
        }

        .sidebar {
            width: 230px;
            height: 100vh;
            background: #111827;
            color: white;
            position: fixed;
        }

        .sidebar h2 {
            text-align: center;
            padding: 20px;
        }

        .sidebar a {
            display: block;
            padding: 12px 20px;
            color: #ccc;
            text-decoration: none;
        }

        .sidebar a:hover {
            background: #1f2937;
            color: white;
        }

        .main {
            margin-left: 230px;
            padding: 20px;
            width: 100%;
        }

        .card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
        }
    </style>
</head>

<body>

<div class="sidebar">
    <h2>Admin Panel</h2>
    <a href="admin_dashboard.php">🏠 Dashboard</a>
    <a href="view_users.php">👥 Users</a>
    <a href="courses.php">📚 Courses</a>
    <a href="add_course.php">➕ Add Course</a>
    <a href="logout.php">🚪 Logout</a>
</div>

<div class="main">
    <h1>Welcome Admin 👑</h1>

    <div class="card">
        <h3>Total Users</h3>
        <?php
        $conn = mysqli_connect("localhost", "root", "", "skill_marketplace");
        $res = mysqli_query($conn, "SELECT COUNT(*) as total FROM users");
        $data = mysqli_fetch_assoc($res);
        echo $data['total'];
        ?>
    </div>

</div>

</body>
</html>