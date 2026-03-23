<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
include("config.php");

if (isset($_POST['login'])) {

    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {

        $user = $result->fetch_assoc();

        // 🔐 PASSWORD VERIFY
        if (password_verify($password, $user['password'])) {

            // ✅ STORE SESSION
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['role'] = $user['role'];

            // 🔥 ADMIN / USER REDIRECT
            if ($user['role'] == 'admin') {
                header("Location: admin_dashboard.php");
            } else {
                header("Location: dashboard.php");
            }
            exit();

        } else {
            $error = "❌ Wrong Password!";
        }

    } else {
        $error = "❌ User not found!";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <style>
        body {
            margin: 0;
            font-family: Arial;
            background: linear-gradient(135deg, #667eea, #764ba2);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .box {
            background: white;
            padding: 30px;
            width: 320px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        h2 {
            margin-bottom: 10px;
        }

        input {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            border-radius: 6px;
            border: 1px solid #ccc;
        }

        button {
            width: 100%;
            padding: 10px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }

        button:hover {
            background: #5a67d8;
        }

        .error {
            color: red;
            margin-bottom: 10px;
        }

        a {
            display: block;
            margin-top: 10px;
        }
    </style>
</head>
<body>

<div class="box">
    <h2>Login</h2>

    <?php if(isset($error)) { ?>
        <div class="error"><?php echo $error; ?></div>
    <?php } ?>

    <form method="POST">
        <input type="email" name="email" placeholder="Enter Email" required>
        <input type="password" name="password" placeholder="Enter Password" required>

        <button name="login">Login</button>
    </form>

    <a href="register.php">Create Account</a>
</div>

</body>
</html>