<?php
require 'configuracao.php';
if (isset($_FILES['files'])) {
    $ftp_server = $ftp_server;
    $ftp_user_name = $ftp_user;
    $ftp_user_pass = $ftp_pass;
    $file = ""; //tobe uploaded
    $cookie = json_decode($_COOKIE['Schedules'], true);

// set up basic connection
    $conn_id = ftp_connect($ftp_server);

// login with username and password
    $login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);


    $myFile = $_FILES['files'];
    $type = explode("/", $_FILES['files']['type']);
    $name = explode("@", $_POST['inputnumeroimagem4']);
    $_FILES['files']['name'] = $name[0] . "." . $type[1];
    $destination_path = "uploads/company-" . $cookie['companie_id'] . "/services/";
    $destination_file = $destination_path . $_FILES['files']['name'];
    //$exif = exif_read_data($destination_file);
    //if(isset($exif['Orientation'])&& $exif['Orientation'] == '6'){
    //}
    $file = $myFile['tmp_name'];
    $lista = ftp_nlist($conn_id, "/");
    $value = $_FILES['files']['name'];

    //verifica se é um formato de arquivo válido
    $allowed =  array('gif','png' ,'jpg' ,'jpeg');
    $ext = pathinfo($value, PATHINFO_EXTENSION);
    if(!in_array($ext,$allowed) ) {
        echo 'Não é permitido o envio de vídeos.';
        header('Location: ../service_galery_image.html?'.rand(100000,999999));
    }else {


    	// ———————————————————————————————————————
	// reduz tamanho imagem JPEG usando o Imagick
	$image=new Imagick($file);
	$maxsize=640;
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

	$image->writeImage($file);
	// Destroys Imagick object, freeing allocated resources in the process
	$image->destroy();

	//————————————————————————————————————————————————————————————————————————





    $variavel = $value;

    $var = explode("/", $variavel);

    $fileremote = $_FILES['files']['name'];

    if ($var[0] == $fileremote) {

        ftp_delete($conn_id, $destination_file);

        //$upload = ftp_put($conn_id, $exif, $file, FTP_BINARY);
        $upload = ftp_put($conn_id, $destination_file, $file, FTP_BINARY);

        // upload the file
       $url = "https://".$urluploadscompanyftp.$cookie['companie_id']."/services/".$_FILES['files']['name'];
        $file = explode(".", $_FILES['files']['name']);
         $urlsearchdb = "https://".$urluploadscompanyftp.$cookie['companie_id']."/services/".$file[0];
        //$url = "http://192.168.1.41:8080/".$_FILES['files']['name'];

        if (!$upload) {// check upload status
            echo "ERROR 427 - ERRO AO SUBIR IMAGEM";
            header('Location: ../service_galery_image.html?'.rand(100000,999999));
        } else {
           $conecta = mysqli_connect($connectsql, $usersql, $passsql, $bd) or print (mysql_error());

            $var1 = $_FILES['files']['name'];
            $schedule = explode("-", $var1);
            $idschedule = $schedule[1];
            $pos = strpos($idschedule, ".png");
            if ($pos === false) {
                $var2 = explode(".jpeg", $idschedule);
            } else {
                $var2 = explode(".png", $idschedule);
            }
            $var3 = $schedule[0];
            $sql = ("SELECT * FROM services_photos WHERE schedule_id = ". $var2[0] ." and idphoto = ". $var3 ." and status = 'ACTIVE'");

            $result = mysqli_query($conecta, $sql);

            //$result2 = mysql_fetch_row($result);
            $result2 = mysqli_fetch_array($result);

            if ($result2!=NULL) {
               $conecta = mysqli_connect($connectsql, $usersql, $passsql, $bd) or print (mysql_error());

                $var1 = $_FILES['files']['name'];
                $schedule = explode("-", $var1);
                $idschedule = $schedule[1];
                $pos = strpos($idschedule, ".png");
                if ($pos === false) {
                    $var2 = explode(".jpeg", $idschedule);
                } else {
                    $var2 = explode(".png", $idschedule);
                }
                $var3 = $schedule[0];
                $sql = "UPDATE services_photos SET photo = '" . $url . "' WHERE schedule_id = " . $var2[0] . " and idphoto = " . $var3 . " and status='ACTIVE'";

                $result = mysqli_query($conecta, $sql);

                if ($result) {
                	clearstatcache();
                    header('Location: ../service_galery_image.html?'.rand(100000,999999));
                } else {
                    $sqlError = "Error writing to database";
                    var_dump("ERRO");
                    header('Location: ../service_galery_image.html?'.rand(100000,999999));
                    exit;
                }
            }else{
                $var1 = $_FILES['files']['name'];
                $schedule = explode("-", $var1);
                $idschedule = $schedule[1];
                $pos = strpos($idschedule, ".png");
                if ($pos === false) {
                    $var2 = explode(".jpeg", $idschedule);
                } else {
                    $var2 = explode(".png", $idschedule);
                }
                $var3 = $schedule[0];
                $sql = ("SELECT * FROM services_photos WHERE schedule_id = ". $var2[0] ." and idphoto = ". $var3 ." and status = 'INACTIVE'");

                $result = mysqli_query($conecta, $sql);

                //$result2 = mysql_fetch_row($result);
                $result3 = mysqli_fetch_array($result);

                if ($result3!= NULL) {
                   $conecta = mysqli_connect($connectsql, $usersql, $passsql, $bd) or print (mysql_error());

                    $var1 = $_FILES['files']['name'];
                    $schedule = explode("-", $var1);
                    $idschedule = $schedule[1];
                    $pos = strpos($idschedule, ".png");
                    if ($pos === false) {
                        $var2 = explode(".jpeg", $idschedule);
                    } else {
                        $var2 = explode(".png", $idschedule);
                    }
                    $var3 = $schedule[0];
                    $sql = "UPDATE services_photos SET photo = '" . $url . "', status = 'ACTIVE'  WHERE schedule_id = " . $var2[0] . " and idphoto = " . $var3 . ";";
               
                    $result = mysqli_query($conecta, $sql);

                    if ($result) {
                    	clearstatcache();
                        header('Location: ../service_galery_image.html?'.rand(100000,999999));
                    } else {
                        $sqlError = "Error writing to database";
                        var_dump("ERRO");
                        header('Location: ../service_galery_image.html?'.rand(100000,999999));
                        exit;
                    }
                } else {

                   $conecta = mysqli_connect($connectsql, $usersql, $passsql, $bd) or print (mysql_error());

                    $var1 = $_FILES['files']['name'];
                    $schedule = explode("-", $var1);
                    $idschedule = $schedule[1];
                    $pos = strpos($idschedule, ".png");
                    if ($pos === false) {
                        $var2 = explode(".jpeg", $idschedule);
                    } else {
                        $var2 = explode(".png", $idschedule);
                    }
                    $var3 = $schedule[0];
                    $sql = "INSERT INTO services_photos (photo, schedule_id, idphoto, status) VALUES ('" . $url . "', " . $var2[0] . ", " . $var3 . ", 'ACTIVE') ";

                    $result = mysqli_query($conecta, $sql);

                    if ($result) {
                       	clearstatcache();
                        header('Location: ../service_galery_image.html?'.rand(100000,999999));
                    } else {
                        $sqlError = "Error writing to database";
                        //file_put_contents($sqlErrorLog, $sqlError, FILE_APPEND);
                    }
                }

                mysqli_close($conecta);
                header('Location: ../service_galery_image.html?'.rand(100000,999999));
            }
        }
    } else {
        //$upload = ftp_put($conn_id, $exif, $file, FTP_BINARY);// upload the file
        $upload = ftp_put($conn_id, $exif, $destination_file, FTP_BINARY); // upload the file
       $url = "https://".$urluploadscompanyftp.$cookie['companie_id']."/services/".$_FILES['files']['name'];
        //$url = "http://192.168.1.41:8080/".$_FILES['files']['name'];
        if (!$upload) {// check upload status
            echo "ERROR 427 - ERRO AO SUBIR IMAGEM";
            header('Location: ../service_galery_image.html?'.rand(100000,999999));
        }
    }
    }
}
?>