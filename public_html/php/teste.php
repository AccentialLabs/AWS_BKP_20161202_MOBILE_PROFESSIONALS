<?php
require "../lib/moip-php-master/autoload.inc.php";
$cookieoffer = json_decode($_COOKIE['Offer'], true);
$offerprice = $cookieoffer['value'];
$result = str_replace(".", "", $offerprice);
$desconto = ($result / 100) * (100 - $cookieoffer['percentage_discount']);
$parcels_quantity = $cookieoffer['parcels_quantity'];
  $moip = new Moip();
    $moip->setEnvironment('test');
    $moip->setCredential(array(
        'key' => 'SPTQ2XRYS7WHJUKQKH25TC957H03LI4ZWKLCO0CL',
        'token' => 'HREOTOHJO4IYQRO24AEUUMQ89ZQ113RN'
        ));


print_r($moip->queryParcel('integracao@labs.moip.com.br', $parcels_quantity, '0', $desconto));
 exit;
?>