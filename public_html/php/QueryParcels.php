<?php
require '../lib/moip-php-master/autoload.inc.php';
require('configuracao.php');
$conecta = mysqli_connect($connectsql, $usersql, $passsql, $bd) or print (mysql_error());
 $moip = new Moip();
    $moip->setEnvironment('test');
    $moip->setCredential(array(
        'key' => 'SPTQ2XRYS7WHJUKQKH25TC957H03LI4ZWKLCO0CL',
        'token' => 'HREOTOHJO4IYQRO24AEUUMQ89ZQ113RN'
        ));



    $moip->setUniqueID(false);
    $cookieoffer = json_decode($_COOKIE['Offer'], true);
    $frete = str_replace('R$','',$_COOKIE['shipping_value']);
    $valortotal = ($cookieoffer['value']/100)*(100-($cookieoffer['percentage_discount']));
    $quantidade = $_COOKIE['quantidade']/1;
    $val = ($valortotal*$quantidade+($frete/1));
    $value = round($val, 2);
    $moip->setValue($value);

    $moip->setReason('Teste do Moip-PHP');

$sql = "SElECT * FROM  parcels_configuration";

$resultS = mysqli_query($conecta, $sql);
$result2 = mysqli_fetch_array($resultS);

if($resultS) {
    $resultado = '';
    foreach($resultS as $result){
    $payercost = $result['payer_cost'];
    $custodopagador = '';

    if($payercost==0){
    $custodopagador = null;

    }else{
    $custodopagador = $payercost;
    }

    $moip->addParcel($result['minparcels'], $result['maxparcels'], $custodopagador, false);

    }

    $moip->setPayer(array('name' => 'Nome Sobrenome',
          'email' => 'email@cliente.com.br',
          'payerId' => 'id_usuario',
          'billingAddress' => array('address' => 'Rua do Zézinho Coração',
              'number' => '45',
              'complement' => 'z',
              'city' => 'São Paulo',
              'neighborhood' => 'Palhaço Jão',
              'state' => 'SP',
              'country' => 'BRA',
              'zipCode' => '01230-000',
              'phone' => '(11)8888-8888')));
    $moip->validate('Identification');
    $moip->send();
    $token = $moip->getAnswer()->token;

    print_r($token);

} else {
    $sqlError= "Error writing to database";
}



  //  print_r($moip->queryParcel('ariany_f@hotmail.com', $maxparcels, '1.99', '100.00'));

?>
