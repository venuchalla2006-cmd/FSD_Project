<?php
$conn = mysqli_connect("localhost", "root", "", "skill_marketplace");

$sql = "SELECT * FROM users";
$result = mysqli_query($conn, $sql);
?>

<h2>All Users</h2>

<table border="1">
<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    
</tr>

<?php
while($row = mysqli_fetch_assoc($result)) {
?>
<tr>
    <td><?php echo $row['id']; ?></td>
    <td><?php echo $row['name']; ?></td>
    <td><?php echo $row['email']; ?></td>
  
</tr>
<?php
}
?>
</table>