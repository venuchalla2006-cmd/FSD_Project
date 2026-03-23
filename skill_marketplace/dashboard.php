<?php
session_start();
include("config.php");

// 🔐 CHECK LOGIN
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_id = $_SESSION['user_id'];
$user_name = isset($_SESSION['user_name']) ? $_SESSION['user_name'] : "User";

// GET ENROLLED COURSES
$result = $conn->query("
    SELECT courses.* 
    FROM courses 
    JOIN enrollments 
    ON courses.id = enrollments.course_id 
    WHERE enrollments.user_id = $user_id
");

if (!$result) {
    die("Query Error: " . $conn->error);
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Dashboard</title>

<style>

/* 🌈 BODY */
body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea, #764ba2);
}

/* 🔥 NAVBAR */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(90deg, #ff7e5f, #feb47b);
    color: white;
    padding: 15px 20px;
}

.nav-right a {
    color: white;
    margin-left: 15px;
    text-decoration: none;
    font-weight: bold;
}

.logout {
    background: red;
    padding: 5px 10px;
    border-radius: 5px;
}

/* TEXT */
.title {
    margin: 20px;
    color: white;
}

.welcome {
    margin-left: 20px;
    color: #eee;
}

.section {
    margin: 20px;
    color: white;
}

/* GRID */
.course-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 300px));
    gap: 20px;
    padding: 20px;
}

/* CARD */
.course-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    transition: transform 0.3s;
}

.course-card:hover {
    transform: translateY(-5px);
}

/* IMAGE */
.course-card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
}

/* BODY */
.course-body {
    padding: 15px;
}

/* PRICE */
.price {
    color: green;
    font-weight: bold;
}

/* TAG */
.tag {
    background: linear-gradient(90deg, #00c6ff, #0072ff);
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
}

/* BUTTON */
button {
    background: linear-gradient(90deg, #ff512f, #dd2476);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 20px;
    cursor: pointer;
}

button:hover {
    opacity: 0.8;
}

.danger {
    background: red;
}

</style>

</head>
<body>

<!-- 🔥 NAVBAR -->
<div class="navbar">
    <h2>🎓 Skill Marketplace</h2>

    <div class="nav-right">
        <span>👤 <?php echo $user_name; ?></span>
        <a href="dashboard.php">Dashboard</a>
        <a href="courses.php">Courses</a>
        <a href="profile.php">Profile</a>
        <a href="logout.php" class="logout">Logout</a>
    </div>
</div>

<h2 class="title">Dashboard</h2>
<p class="welcome">Welcome 👋</p>

<h3 class="section">My Courses</h3>

<div class="course-container">

<?php 
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
?>

    <div class="course-card">

        <img src="images/<?php echo $row['image']; ?>">

        <div class="course-body">
            <h3><?php echo $row['title']; ?></h3>
            <p><?php echo $row['description']; ?></p>
            <p class="price">₹ <?php echo $row['price']; ?></p>

            <span class="tag">Enrolled</span><br><br>

            <a href="unenroll.php?id=<?php echo $row['id']; ?>">
                <button class="danger">Unenroll</button>
            </a>
        </div>

    </div>

<?php 
    }
} else {
    echo "<p style='color:white; padding:20px;'>No enrolled courses yet.</p>";
}
?>

</div>

</body>
</html>