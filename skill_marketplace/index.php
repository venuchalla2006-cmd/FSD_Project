<?php
include 'config.php';
include 'header.php';
?>

<div class="hero-section">
    <h1>Upgrade Your Skills Today</h1>
    <p>Join thousands of learners mastering new skills online</p>

    <?php if(!isset($_SESSION['user_id'])){ ?>
        <a href="register.php" class="btn btn-light btn-lg mt-3">
            Get Started
        </a>
    <?php } else { ?>
        <a href="courses.php" class="btn btn-light btn-lg mt-3">
            Explore Courses
        </a>
    <?php } ?>
</div>

<?php
// Only show courses if logged in
if(isset($_SESSION['user_id'])){
?>

<div class="container mt-5">
    <h3 class="text-white mb-4">Popular Courses</h3>
    <div class="row">
    <?php
    $result = $conn->query("SELECT * FROM courses LIMIT 3");

    while($row = $result->fetch_assoc()){
    ?>
        <div class="col-md-4">
            <div class="card p-3">
                <img src="images/<?php echo $row['image']; ?>" 
                     class="img-fluid rounded"
                     style="height:200px; object-fit:cover;">
                <h5 class="mt-3"><?php echo htmlspecialchars($row['title']); ?></h5>
                <p class="text-success fw-bold">₹ <?php echo htmlspecialchars($row['price']); ?></p>
            </div>
        </div>
    <?php } ?>
    </div>
</div>

<?php } ?>

<?php include 'footer.php'; ?>