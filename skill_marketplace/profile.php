<?php
include 'config.php';

if(!isset($_SESSION['user_id'])){
    header("Location: login.php");
    exit();
}

$user = $conn->query("SELECT * FROM users WHERE id=".$_SESSION['user_id'])->fetch_assoc();

include 'header.php';
?>

<div class="card p-4" style="max-width:500px; margin:auto;">
    <h3>My Profile</h3>
    <hr>
    <p><strong>Name:</strong> <?php echo $user['name']; ?></p>
    <p><strong>Email:</strong> <?php echo $user['email']; ?></p>
    <p><strong>Role:</strong> <?php echo ucfirst($user['role']); ?></p>
</div>

<?php include 'footer.php'; ?>