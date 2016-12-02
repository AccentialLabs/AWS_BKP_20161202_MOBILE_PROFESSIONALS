<?php
//arquivo de configuração dos caminhos externos para os arquivos php contidos no projeto jezzy-mobile

$ip = '192.168.1.200';
$api = $ip.'/api';

$ftp_server = 'ec2-52-67-24-232.sa-east-1.compute.amazonaws.com';
//host server do ftp
$ftp_user = 'jezzy-ftp';
//usuario ftp
$ftp_pass = 'JEZftp1000';
//password do ftp
$urluploadscompanyftp = $ip."/uploads/company-";
//localiza as imagens de cada company no servidor ftp
$connectsql = 'lm1qivwncj3xprd.c2g7fyxoel3s.sa-east-1.rds.amazonaws.com';
//conexao sql banco de dados
$usersql = "jezdbadmin";
//user do banco de dados
$passsql = "JEZdB1000";
//senha do banco de dados
$bd = "jezzyapp_main";
//banco de dados padrao
$host_mailer = "pro.turbo-smtp.com";
//host do email
$host_username = 'contato@jezzy.com.br';
//username do email
$host_Password = '09#pLk#3}KgS';
//password do email
$host_from = "Contato - Jezzy";
//nome que vai no contato


$params = array(
    'User' => array(
            'query' => 'SELECT * FROM companies Company WHERE id = 99999',
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);
$json = base64_decode($data);
$array = json_decode($json, true);
$moip_id = $array[0]['Company']['moip_id'];

curl_close($curl);
$token_moip = 'JK75V6UGKYYUZR2ICVHJSSLD687UEJ9H';
$key_moip = '11PB4FPN68M1FE8MAPWUDIMEHFIGM8P6DMSBNXZZ';

$params = array(
    'User' => array(
            'query' => 'SELECT * FROM configurations_moip',
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);
$json = base64_decode($data);
$array = json_decode($json, true);
//$token_moip = $array[0]['configurations_moip']['token_moip'];
//$key_moip = $array[0]['configurations_moip']['key_moip'];


curl_close($curl);



?>