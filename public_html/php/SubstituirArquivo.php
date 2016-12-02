<?php
$file = $_POST['fileschedules'];
$remote_file = '../lib/arquivo.txt';
// create your file in the local file system here.

// set up basic connection
$conn_id = ftp_connect('ec2-52-67-24-232.sa-east-1.compute.amazonaws.com');

// login with username and password
$login_result = ftp_login($conn_id, 'jezzy-ftp', 'JEZftp1000');

// upload a file
if (ftp_nb_get($conn_id, $remote_file, $file, FTP_ASCII)) {
  echo "successfully downloaded $file\n";
} else {
  echo "There was a problem while downloading $file\n";
}
// close the connection
ftp_close($conn_id);

?>