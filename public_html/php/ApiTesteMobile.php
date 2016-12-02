<?php

echo "Bem vindo ao teste da API <br/>";
echo "Este teste realiza dos dados da empresa:<br/>";
echo "login:senha => jhjnknhkjnkjmatheusodilon0@gmail.com:123456<br/>";

$conditions = array(
    'Company' => array(
        'conditions' => array(
            'Company.id' => 119,
        )
    ),
);

$postData = json_encode($conditions);
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

$url_api = "http://192.168.1.41:8080/api/companies/get/first/" . $token;

$curl = curl_init($url_api);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);
curl_close($curl);

echo "<pre>";
var_dump(base64_decode($data));
die();

$json = base64_decode($data);
$array = json_decode($json, true);
print_r($array);
