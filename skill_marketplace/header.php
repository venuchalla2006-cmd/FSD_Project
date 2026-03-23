<?php if(session_status() === PHP_SESSION_NONE){ session_start(); } ?>
<!DOCTYPE html>
<html>
<head>
    <title>Skill Marketplace</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
</head>

<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container">
        <a class="navbar-brand fw-bold" href="index.php">🎓 Skill Marketplace</a>

        <div>
            <?php if(isset($_SESSION['user_id'])){ ?>
                <a class="btn btn-outline-light btn-sm" href="dashboard.php">Dashboard</a>
                <a class="btn btn-danger btn-sm" href="logout.php">Logout</a>
            <?php } else { ?>
                <a class="btn btn-outline-light btn-sm" href="login.php">Login</a>
                <a class="btn btn-primary btn-sm" href="register.php">Register</a>
            <?php } ?>
        </div>
    </div>
</nav>

<div class="container mt-5">