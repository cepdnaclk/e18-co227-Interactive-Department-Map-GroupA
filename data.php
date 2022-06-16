<?php

//create connection
$conn = mysqli_connect('localhost','root','','dept_info');

$query = 'SELECT * FROM buildings';

//get result
$result = mysqli_query($conn,$query);

//fetch data
$users = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($users);
