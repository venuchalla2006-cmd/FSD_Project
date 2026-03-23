<?php
include 'config.php';

// Check login
if(!isset($_SESSION['user_id'])){
    header("Location: login.php");
    exit();
}

// Check admin role
$current_user = $conn->query("SELECT * FROM users WHERE id=".$_SESSION['user_id'])->fetch_assoc();

if($current_user['role'] != 'admin'){
    die("Access Denied");
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Admin - Users</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>

<body>

<div class="d-flex">

    <!-- Sidebar -->
    <div class="bg-dark text-white p-3" style="width:250px; min-height:100vh;">
        <h4>Admin Panel</h4>
        <hr>
        <a href="admin_dashboard.php" class="text-white d-block mb-2">Dashboard</a>
        <a href="add_course.php" class="text-white d-block mb-2">Add Course</a>
        <a href="admin_users.php" class="text-white d-block mb-2">View Users</a>
        <a href="logout.php" class="text-danger d-block mt-4">Logout</a>
    </div>

    <!-- Content -->
    <div class="flex-grow-1 p-4">

        <h2>Registered Users</h2>
        <hr>

        <?php
        $users = $conn->query("SELECT * FROM users ORDER BY id DESC");

        if($users->num_rows > 0){
        ?>

        <table class="table table-bordered table-striped">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Total Enrollments</th>
                </tr>
            </thead>
            <tbody>

        <?php
        while($row = $users->fetch_assoc()){

            // Count enrollments
            $count = $conn->query("
                SELECT COUNT(*) as total 
                FROM enrollments 
                WHERE user_id=".$row['id']
            )->fetch_assoc()['total'];
        ?>

                <tr>
                    <td><?php echo $row['id']; ?></td>
                    <td><?php echo htmlspecialchars($row['name']); ?></td>
                    <td><?php echo htmlspecialchars($row['email']); ?></td>
                    <td>
                        <?php if($row['role'] == 'admin'){ ?>
                            <span class="badge bg-danger">Admin</span>
                        <?php } else { ?>
                            <span class="badge bg-primary">User</span>
                        <?php } ?>
                    </td>
                    <td><?php echo $count; ?></td>
                </tr>

        <?php } ?>

            </tbody>
        </table>

        <?php
        } else {
            echo "<div class='alert alert-warning'>No users found.</div>";
        }
        ?>

    </div>

</div>

</body>
</html>