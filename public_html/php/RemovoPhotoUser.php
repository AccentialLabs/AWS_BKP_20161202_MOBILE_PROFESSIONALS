<?php

$conecta = mysqli_connect("lm1qivwncj3xprd.c2g7fyxoel3s.sa-east-1.rds.amazonaws.com", "jezdbadmin", "JEZdB1000", "jezzyapp_main") or print (mysql_error());


$user_id = json_decode($_COOKIE['User'], true);

$sql = "UPDATE users SET photo = '' WHERE  users.id = ".$user_id['id'];

$result = mysqli_query($conecta, $sql);
if($result) {
echo '{"success":"Success"}';
header ('Location: ../my_profile.html');
echo "<meta HTTP-EQUIV='refresh' CONTENT='5;URL=../my_profile.html'>";
} else {
$sqlError= "Error writing to database";
echo '{"Status":"Fail"}';
}
?>