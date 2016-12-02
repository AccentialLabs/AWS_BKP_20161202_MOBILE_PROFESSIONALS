<?php
require 'configuracao.php';
if(isset($_FILES['files'])) {
$ftp_server=$ftp_server;
$ftp_user_name=$ftp_user;
$ftp_user_pass=$ftp_pass;
$file = "";//tobe uploaded

// set up basic connection
$conn_id = ftp_connect($ftp_server);

// login with username and password
$login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);
	

$myFile = $_FILES['files'];

$type = explode("/",$_FILES['files']['type']);
$name = explode("@", $_POST['userinfoid']);
$_FILES['files']['name'] = $name[0].".".$type[1];
$destination_path = "uploads/jezzySecondaryUsers/";
$destination_file = $destination_path.$_FILES['files']['name'];
$file = $myFile['tmp_name'];
$lista = ftp_nlist($conn_id,"uploads/jezzySecondaryUsers/");
$value = $_FILES['files']['name'];
$value2 = "uploads/jezzySecondaryUsers/".$_FILES['files']['name'];

    $allowed =  array('gif','png' ,'jpg' ,'jpeg');
    //$filename = $_FILES['video_file']['name'];
    
    $ext = pathinfo($value, PATHINFO_EXTENSION);
    if(!in_array($ext,$allowed) ) {
        echo 'Não é permitido o envio de vídeos.';
        header ('Location: ../my_profile.html');
    }else {
    


	//—————————————————————————————————————————————————————————————————————————————————
    // reduz tamanho imagem JPEG usando o Imagick
	$image=new Imagick($file);
	
	$maxsize=300; // determina o tamanha máximo da imagem
	if($image->getImageHeight() <= $image->getImageWidth())
	{
		// Resize image using the lanczos resampling algorithm based on width
		$image->resizeImage($maxsize,0,Imagick::FILTER_LANCZOS,1);
	}
	else
	{
		// Resize image using the lanczos resampling algorithm based on height
		$image->resizeImage(0,$maxsize,Imagick::FILTER_LANCZOS,1);
	}

	// Set to use jpeg compression
	$image->setImageCompression(Imagick::COMPRESSION_JPEG);
	// Set compression level (1 lowest quality, 100 highest quality)
	$image->setImageCompressionQuality(90);
        // JPEG Progressive
        $image->setInterlaceScheme(Imagick::INTERLACE_PLANE);
	// Strip out unneeded meta data
	$image->stripImage();
	// ajusta orientação da imagem
    $orientation = $image->getImageOrientation();

    switch($orientation) {
    case imagick::ORIENTATION_BOTTOMRIGHT:
        $image->rotateimage("#000", 180); // rotate 180 degrees
        break;

    case imagick::ORIENTATION_RIGHTTOP:
        $image->rotateimage("#000", 90); // rotate 90 degrees CW
        break;

    case imagick::ORIENTATION_LEFTBOTTOM:
        $image->rotateimage("#000", -90); // rotate 90 degrees CCW
        break;
    }

    // Now that it's auto-rotated, make sure the EXIF data is correct in case the EXIF gets saved with the image!
    $image->setImageOrientation(imagick::ORIENTATION_TOPLEFT);
    // Export the Imagik file to the file that will be uploaded
    $image->writeImage($file);
    // Destroys Imagick object, freeing allocated resources in the process
    $image->destroy();
	//—————————————————————————————————————————————————————————————————————————————————————————————


	//while ($lista != $value2) {
$variavel = $value2;


$var = explode(".", $variavel);


$fileremote =  "uploads/jezzyUsers/".$_FILES['files']['name'];
	
		
//$fileremote2 = explode(".", $fileremote);

//if($var[0] == $fileremote2[0]){
//    ftp_delete ($conn_id,$destination_file);
//}

    $upload = ftp_put($conn_id, $destination_file, $file, FTP_BINARY);// upload the file
	
    $url = "https://secure.jezzy.com.br/uploads/jezzySecondaryUsers/".$_FILES['files']['name'];
    //$url = "http://192.168.1.41:8080/".$_FILES['files']['name'];

    if (!$upload) {// check upload status
        echo "ERROR 427 - ERRO AO SUBIR IMAGEM";
        header ('Location: ../my_profile.html');
    } else {
       $conecta = mysqli_connect($connectsql, $usersql, $passsql, $bd) or print (mysql_error());
        
        $sql = "UPDATE secondary_users SET photo = '".$url."' WHERE id = ".$_POST['userinfoid'];
        echo $sql;
        $result = mysqli_query($conecta, $sql);
        
        if($result) {
            echo '{"success":"Success"}';
        } else {
            $sqlError= "Error writing to database";
            //file_put_contents($sqlErrorLog, $sqlError, FILE_APPEND);
            
            echo '{"Status":"Fail"}';
        }
        
        mysqli_close($conecta);
        header ('Location: ../my_profile.html');
        
    }
    //}
    }
}

?>