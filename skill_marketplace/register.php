<?php
session_start();
include("config.php");

if (isset($_POST['register'])) {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // HASH PASSWORD 🔐
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // CHECK IF EMAIL EXISTS
    $check = $conn->query("SELECT * FROM users WHERE email='$email'");

    if ($check->num_rows > 0) {
        $error = "Email already exists!";
    } else {

        $conn->query("INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashed_password')");

        header("Location: login.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>

<div class="container">

    <!-- LEFT SIDE -->
    <div class="left">
        <h1>🎓 Skill Marketplace</h1>
        <p>Create your account and start learning 🚀</p>
    </div>

    <!-- RIGHT SIDE -->
    <div class="right">

        <div class="login-box">
            <h2>Create Account ✨</h2>
            <p>Register to continue</p>

            <?php if(isset($error)) { ?>
                <div class="error"><?php echo $error; ?></div>
            <?php } ?>

            <form method="POST">
                <input type="text" name="name" placeholder="Enter Name" required>
                <input type="email" name="email" placeholder="Enter Email" required>
                <input type="password" name="password" placeholder="Enter Password" required>

                <button name="register">Register</button>
            </form>

            <p class="link">Already have an account? <a href="login.php">Login</a></p>
        </div>

    </div>

</div>

</body>
</html>