<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Jezzy</title>
    <link rel="shortcut icon" href="../../img/icons/favicon.ico">
    <link rel="stylesheet" href="../../lib/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../lib/jasny-bootstrap/css/jasny-bootstrap.min.css">
    <script src="../../lib/jquery/jquery-2.1.4.min.js"></script>
    <link rel="stylesheet" href="../../css/page/base.css">
    <script src="configuracao.js"></script>
    <script src="../../lib/jquery/jquery-2.1.4.min.js"></script>
    <script src="../../lib/jquery/jquery.base64.js"></script>
    <script src="../../lib/bootstrap/js/bootstrap.min.js"></script>
    <script src="../../lib/jasny-bootstrap/js/jasny-bootstrap.min.js"></script>
    <script src="../../lib/jquery-storage/jquery.cookie.js"></script>
    <script src="../../lib/jquery-storage/jquery.storageapi.min.js"></script>
    <script src="../../lib/jquery-storage/json2.js"></script>
    <link rel="stylesheet" href="../../css/page/index.css">
</head>
<body>
<?php
header('Content-Type: text/html; charset=utf-8');
require("../../lib/phpmailer/PHPMailerAutoload.php");
require '../../vendor/moip/vendor/autoload.php';
require '../../lib/moip-php-master/autoload.inc.php';
require("../../php/configuracao.php");

$cookie = json_decode($_COOKIE['User'], true);
$mail = new PHPMailer(true);
$email = $cookie['email'];
use Moip\Moip;
use Moip\MoipBasicAuth;

$token = 'HREOTOHJO4IYQRO24AEUUMQ89ZQ113RN';
$key = 'SPTQ2XRYS7WHJUKQKH25TC957H03LI4ZWKLCO0CL';
$commid = 0;
$cookieoffer = json_decode($_COOKIE['Offer'], true);
$moip = new Moip(new MoipBasicAuth($token, $key), Moip::ENDPOINT_SANDBOX);



if($cookieoffer['parcels']!='INACTIVE'){
if($_POST['parcels'] == ''){
$parcels = 1;
}else{
$parcels = $_POST['parcels'];
}
}else{
$parcels = 1;
}
$customer = $moip->customers()->setOwnId(uniqid())
                           ->setFullname($cookie['name'])
                            ->setEmail($cookie['email'])
                            ->setBirthDate($cookie['birthday'])
                            ->setTaxDocument($_POST['taxdocument'])
                            ->setPhone(11, 66778899)
                             ->addAddress('BILLING',
                                           $_COOKIE['address'], $_COOKIE['number'],
                                            $_COOKIE['district'], $_COOKIE['city'], $_COOKIE['state'],
                                            $_COOKIE['zip_code'], $_COOKIE['complement']);

if($cookieoffer['company_id']!=99999){
$params = array(
    'User' => array(
            'query' => 'SELECT * FROM companies Company WHERE Company.id = '.$cookieoffer['company_id'],
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
$split = 100;
$moip_id = ($array[0]['Company']['moip_id']);
$salao = ($array[0]['Company']['fancy_name']);
curl_close($curl);

}else{
$params = array(
    'User' => array(
            'query' => 'SELECT * FROM favorites_companies WHERE user_id = '.$cookie['id'],
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

if(!empty($data)){
   //ULTIMA VEZ QUE MECHI NO CÓDIGO
  $json = base64_decode($data);
  $array = json_decode($json, true);
  $company = $array[0]['favorites_companies']['company_id'];

  $params = array(
      'User' => array(
              'query' => 'SELECT * FROM companies Company WHERE Company.id = '.$company,
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
  $moip_id = ($array[0]['Company']['moip_id']);
  $commid = ($array[0]['Company']['id']);
  $salao = ($array[0]['Company']['fancy_name']);
  $split = ($array[0]['Company']['percentage_split']);
  curl_close($curl);




        $params = array(
     'User' => array(
              'query' => 'SELECT * FROM offers_extra_infos WHERE offer_id = '.$cookieoffer['id'],
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
    $offer_type = $array[0]['offers_extra_infos']['offer_type'];
    if($split ==  NULL){
        $split = ($array[0]['offers_extra_infos']['percentage_split']);
    }
        curl_close($curl);



}else{
    $split = 0;
     $moip_id = 'MPA-19B41CA1BC98';
}
curl_close($curl);

}
if($split == NULL){
$split = 0;
}
$offerprice = $cookieoffer['value'];
$result = str_replace(".", "", $offerprice);
$percentage = $cookieoffer['percentage_discount']/1;
$desconto = ($offerprice / 100) * (100 - $percentage);
$offerfrete = $_COOKIE['shipping_value'];
$resultfrete = str_replace("R$", "", $offerfrete);
$resultfrete3 = str_replace(",", "", $resultfrete);
$offerunit = $cookieoffer['value'];
$resultoffertotal  = str_replace("R$", "", $_COOKIE['total_value']);
$total_value = str_replace(",", ".", $resultoffertotal);
$resultunit = str_replace(".", "", $offerunit);
$card = $_COOKIE['instituicao'];
$hash = $_COOKIE['codigo'];
$desconto =  number_format($desconto, 2);
$desconto = str_replace(".", "",$desconto);
$resultfrete3 =str_replace(".","",  round($resultfrete3));
$uniqid = uniqid();


 $json =  '{"ownId": "'.$uniqid.'","amount": {"currency": "BRL","subtotals": {"shipping": '.$resultfrete3.'}},"items": [{"product": "'.$cookieoffer["title"].'","quantity": '.$_COOKIE["quantidade"].',"detail": "'.substr(strip_tags($cookieoffer["resume"]), 0, 249).'","price": '.$desconto.'}],"receivers":[{"moipAccount": {"id": "'.$moip_id.'"},"type": "SECONDARY","amount": {"percentual": '.$split.'}}],"customer": {"ownId": "'.uniqid().'","fullname": "'.$cookie["name"].'","email": "'.$cookie["email"].'","birthDate": "'.$cookie["birthday"].'","taxDocument": {"type": "CPF","number": "'.$_POST["taxdocument"].'"},"phone": {"countryCode": "55","areaCode": "11","number": "66778899"},"shippingAddress": {"street":  "'.$_COOKIE["address"].'",  "streetNumber": '.$_COOKIE["number"].',"complement": "'.$_COOKIE["complement"].'","district": "'.$_COOKIE["district"].'","city":  "'.$_COOKIE["city"].'","state":  "'.$_COOKIE["state"].'",   "country": "BRA","zipCode": "'.$_COOKIE["zip_code"].'"}    }   }';




                                        $header = array();
										$header[] = 'Content-type: application/json';
										$header [] = "Authorization: Basic SFJFT1RPSEpPNElZUVJPMjRBRVVVTVE4OVpRMTEzUk46U1BUUTJYUllTN1dISlVLUUtIMjVUQzk1N0gwM0xJNFpXS0xDTzBDTA==";
										$auth = 'SFJFT1RPSEpPNElZUVJPMjRBRVVVTVE4OVpRMTEzUk46U1BUUTJYUllTN1dISlVLUUtIMjVUQzk1N0gwM0xJNFpXS0xDTzBDTA==';
                                        // URL do SandBox - Nosso ambiente de testes
                                        // $url = "https://desenvolvedor.moip.com.br/sandbox/ws/alpha/PreCadastramento";
                                        $url = "https://sandbox.moip.com.br/v2/orders";

                                        $curl = curl_init();
                                        curl_setopt($curl, CURLOPT_URL, $url);

                                        // header que diz que queremos autenticar utilizando o HTTP Basic Auth
                                        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

                                        // informa nossas credenciais
                                        curl_setopt($curl, CURLOPT_USERPWD, $auth);
                                        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                                        curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/4.0");
                                        curl_setopt($curl, CURLOPT_POST, true);

                                        // Informa nosso XML de instru��o
                                        curl_setopt($curl, CURLOPT_POSTFIELDS, $json);

                                        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

                                        // efetua a requisi��o e coloca a resposta do servidor do MoIP em $ret
                                        $ret = curl_exec($curl);
                                        $err = curl_error($curl);
                                        $err = curl_error($curl);

                                        curl_close($curl);


                        $jObj = json_decode($ret);


                        $data = new DateTime();
                        $dn = $data -> format("Y-m-d");



                        $data = new DateTime();
                        $dn = $data -> format("Y-m-d");
                        $expiration = $data -> add(new DateInterval('P2D')) -> format("Y-m-d");


                        if($card=='MASTERCARD'){
                        $card = 5;
                       } else if($card=='VISA'){
                      $card = 3;
                       }else if($card=='AMEX'){
                       $card = 7;
                       }else if($card=='DINERS'){
                     $card = 8;
                       }else if($card=='ELO'){
                      $card = 10;
                       }else if($card=='HIPERCARD'){
                      $card = 15;
                       }






 $json = '{
            "installmentCount": '.$parcels.',
            "fundingInstrument": {
            "method": "CREDIT_CARD",
                "creditCard": {
                    "number":  "'.$_POST["cardnumber"].'",
                    "expirationMonth":"'.$_POST["month"].'",
                   "expirationYear":"'.$_POST["year"].'",
                   "cvc":"'.$_POST["cvc"].'",

                 "holder": {
                   "fullname": "'.$_POST["holder"].'",
                   "birthdate": "'.explode("T", $jObj->customer->birthDate)[0].'",
                   "taxDocument": {
                     "type": "CPF",
                     "number": "'.$_POST["taxdocument"].'"
                   },
                   "phone": {
                     "countryCode": "55",
                     "areaCode": "11",
                     "number": "66778899"
                   }
                 }
               }
             }
            }';


										$header = array();
										$header[] = 'Content-type: application/json';
										$header [] = "Authorization: Basic SFJFT1RPSEpPNElZUVJPMjRBRVVVTVE4OVpRMTEzUk46U1BUUTJYUllTN1dISlVLUUtIMjVUQzk1N0gwM0xJNFpXS0xDTzBDTA==";
										$auth = 'SFJFT1RPSEpPNElZUVJPMjRBRVVVTVE4OVpRMTEzUk46U1BUUTJYUllTN1dISlVLUUtIMjVUQzk1N0gwM0xJNFpXS0xDTzBDTA==';
                                        // URL do SandBox - Nosso ambiente de testes
                                        // $url = "https://desenvolvedor.moip.com.br/sandbox/ws/alpha/PreCadastramento";
                                        $url = "https://sandbox.moip.com.br/v2/orders/".$jObj->id."/payments";

                                        $curl = curl_init();
                                        curl_setopt($curl, CURLOPT_URL, $url);

                                        // header que diz que queremos autenticar utilizando o HTTP Basic Auth
                                        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

                                        // informa nossas credenciais
                                        curl_setopt($curl, CURLOPT_USERPWD, $auth);
                                        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                                        curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/4.0");
                                        curl_setopt($curl, CURLOPT_POST, true);

                                        // Informa nosso XML de instru��o
                                        curl_setopt($curl, CURLOPT_POSTFIELDS, $json);

                                        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

                                        // efetua a requisi��o e coloca a resposta do servidor do MoIP em $ret
                                        $ret = curl_exec($curl);
                                        $err = curl_error($curl);
                                        $err = curl_error($curl);
                                        curl_close($curl);

                                        $objeto = json_decode($ret);

$resultfrete2 = str_replace(",", ".", $resultfrete);
$total = $total_value+$resultfrete2;
$descontos = round(($offerprice/100)*(100- $cookieoffer['percentage_discount']), 2);

$secondary_receiver_pay = ($descontos/100)*$split;
if(empty($commid)){
$commid = 0;
}
if($cookieoffer['parcels']!='INACTIVE'){
   $params = array(
       'User' => array(
               'query' => 'INSERT INTO checkouts (user_id, company_id, payment_method_id,offer_id,payment_state_id, unit_value,total_value,amount, shipping_value, shipping_type,delivery_time,metrics,address, city, zip_code, state, district, number, complement,date,  transaction_moip_code, installment, boleto_link, secondary_receiver_pay, commissioned_company_id) VALUES ('.$cookie['id'].','.$cookieoffer['company_id'].', '.$card.','.$cookieoffer['id'].',2,"'.$descontos.'","'.$total.'", '.$_COOKIE['quantidade'].' ,"'.$resultfrete2.'", '.$_COOKIE['shipping_type'].' , '.$_COOKIE['shipping_days'].', "'.$_COOKIE['metrics'].'", "'.$_COOKIE['address'].'", "'.$_COOKIE['city'].'",'.$_COOKIE['zip_code'].' ,"'.$_COOKIE['state'].'" , "'.$_COOKIE['district'].'", '.$_COOKIE['number'].', "'.$_COOKIE['complement'].'","'.$dn.' 00:00:00","'.$uniqid.'", '.$_POST['parcels'].', "" , "'.$secondary_receiver_pay.'", '.$commid.')'
                )
       );

}else{
$params = array(
    'User' => array(
            'query' => 'INSERT INTO checkouts (user_id, company_id, payment_method_id,offer_id,payment_state_id, unit_value,total_value,amount, shipping_value, shipping_type,delivery_time,metrics,address, city, zip_code, state, district, number, complement,date,  transaction_moip_code, installment, boleto_link, secondary_receiver_pay, commissioned_company_id) VALUES ('.$cookie['id'].','.$cookieoffer['company_id'].', '.$card.','.$cookieoffer['id'].',2,"'.$descontos.'","'.$total.'", '.$_COOKIE['quantidade'].' ,"'.$resultfrete2.'", '.$_COOKIE['shipping_type'].' , '.$_COOKIE['shipping_days'].', "'.$_COOKIE['metrics'].'", "'.$_COOKIE['address'].'", "'.$_COOKIE['city'].'",'.$_COOKIE['zip_code'].' ,"'.$_COOKIE['state'].'" , "'.$_COOKIE['district'].'", '.$_COOKIE['number'].', "'.$_COOKIE['complement'].'","'.$dn.' 00:00:00","'.$uniqid.'", 1, "", "'.$secondary_receiver_pay.'", '.$commid.' )'
             )
    );
}


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
curl_close($curl);

$params = array(
    'User' => array(
            'query' => 'SELECT * FROM offers_extra_infos WHERE offer_id = '.$cookieoffer['id'],
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
$offer_type = $array[0]['offers_extra_infos']['offer_type'];

if($offer_type == 'PRODUCT'){
 $order2 = $moip->orders()->get($jObj->id);



}else{
$params = array(
    'User' => array(
            'query' => 'SELECT * FROM offers_services WHERE offer_id =  "'.$cookieoffer['id'].'";'
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
                        $data = new DateTime();
                        $dn = $data -> format("Y-m-d");
                        $expiration = $data -> add(new DateInterval('P2D')) -> format("Y-m-d");
$service_id =$array[0]['offers_services']['service_id'];

curl_close($curl);

$params = array(
    'User' => array(
                'query' =>'SELECT * FROM checkouts WHERE transaction_moip_code = "'.$uniqid.'";'
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

$curl2 = curl_init($url_api);
curl_setopt($curl2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl2, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl2, CURLOPT_POST, 1);
curl_setopt($curl2, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl2);

$jsonCheck = base64_decode($data);
$arrayCheck = json_decode($jsonCheck, true);
$checkout_id = $arrayCheck[0]['checkouts']['id'];

curl_close($curl2);
$params = array(
    'User' => array(
     'query' => 'INSERT INTO services_vouchers(company_id, offer_id, service_id, user_id, pre_scheduled_date, pre_scheduled_hour, acquisition_date, status, checkout_id) VALUES('.$cookieoffer['company_id'].', '.$cookieoffer['id'].', '.$service_id.', '.$cookie['id'].', "", "", "'.$dn.'", "APPROVED", '.$checkout_id.')'
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

curl_close($curl);

/* CRIAR CHECKOUTS SERVICES
$params = array(
    'User' => array(
     'query' => 'INSERT INTO checkouts_services(checkout_id, service_id) VALUES('.$checkout_id.', '.$service_id.');'
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

curl_close($curl);

*/

}


 $mail->IsSMTP(); // Define que a mensagem será SMTP
 $mail->Host = $host_mailer; // Endereço do servidor SMTP
 $mail->SMTPAuth = true; // Usa autenticação SMTP? (opcional)
 $mail->Username = $host_username; // Usuário do servidor SMTP
 $mail->Password = $host_Password; // Senha do servidor SMTP

 // Define o remetente
 // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 $mail->From = $host_username; // Seu e-mail
 $mail->FromName = $host_from; // Seu nome

 // Define os destinatário(s)
 // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//$email = 'ariany_f@hotmail.com';
 $mail->AddAddress($email);
 //$mail->AddAddress('ciclano@site.net');
 //$mail->AddCC('ciclano@site.net', 'Ciclano'); // Copia
 //$mail->AddBCC('fulano@dominio.com.br', 'Fulano da Silva'); // Cópia Oculta

// Define os dados técnicos da Mensagem
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 $mail->IsHTML(true); // Define que o e-mail será enviado como HTML
 $mail->CharSet = 'utf-8'; // Charset da mensagem (opcional)
 $quantidade = $_COOKIE["quantidade"];
 $quantidade = $_COOKIE["quantidade"];

 if($quantidade != "1"){

 $quantidade = '';
 $quantidade = $_COOKIE["quantidade"] . " unidades";
 }else{
  $quantidade = '';
 $quantidade = $_COOKIE["quantidade"] . " unidade";
 }
$title = $cookieoffer['title'];
$desconto = number_format($desconto / 100, 2, ',', '.');
if($offer_type == 'PRODUCT'){
    if($resultfrete2 != 0){

 $mail->Body = "<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'><table border='0' cellpadding='0' cellspacing='0'  ><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/01.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/02.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-recebemos-pedido/03.jpg'  style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 14px;  color: #9B9B9B;  background: #f2f2f2; text-align: center;'><td colspan='4'><br/><br/>Seu pedido ".$cookieoffer['id']." foi enviado!<br/>Esperamos que esteja satisfeito com nossos serviços e que aproveite sua aquisição.<br/><br/><br/></td></tr><tr style=''><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/ImgsEmail/products.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'>".$title."</td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'>".$quantidade."<br/><hr/></td><td  style='width: 200px; text-align: center;'><b>R$".$desconto."</b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'></td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'><br/></td><td  style='width: 200px; text-align: center;'><b><span style='font-size: 20px;'>R$".$total_value."</span></b></td></tr><tr ><td colspan='4'><img src='http://www.schabla.com.br/jezzy_images/pagamento-aprovado/02.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'><span>O endereço de entrega informado/selecionado por você foi:<br/><br/><b>".utf8_decode($_COOKIE["address"]).", ".$_COOKIE["number"]." - ".utf8_decode($_COOKIE["complement"])." - ".utf8_decode($_COOKIE["district"])."<br/>CEP ".$_COOKIE["zip_code"]." - ".utf8_decode($_COOKIE["city"])." - ".utf8_decode($_COOKIE["state"])." VALOR DO FRETE R$".($resultfrete2)."</b></span></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-recebemos-pedido/06.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/07.jpg' width='200' style='vertical-align: bottom;'/></td><td  colspan='1'  style='width: 100px; background: red;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/08.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'> <img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/09.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/10.jpg' width='200' style='vertical-align: bottom;'/></td> </tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/11.jpg' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/12.jpg'  style='vertical-align: bottom;'/></td></tr></table>" ;
 }else{
 $mail->Body = "<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'><table border='0' cellpadding='0' cellspacing='0'  ><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/01.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/02.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-recebemos-pedido/03.jpg'  style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 14px;  color: #9B9B9B;  background: #f2f2f2; text-align: center;'><td colspan='4'><br/><br/>Seu pedido ".$cookieoffer['id']." foi enviado!<br/>Esperamos que esteja satisfeito com nossos serviços e que aproveite sua aquisição.<br/><br/><br/></td></tr><tr style=''><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/ImgsEmail/products.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'>".$title."</td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'>".$quantidade."<br/><hr/></td><td  style='width: 200px; text-align: center;'><b>R$".$desconto."</b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'></td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'><br/></td><td  style='width: 200px; text-align: center;'><b><span style='font-size: 20px;'>R$".$total_value."</span></b></td></tr><tr ></tr><tr style='background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'><span>Retirar no(a) ".$salao."<br/><br/><b></b></span></td></tr><tr></tr><tr><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/07.jpg' width='200' style='vertical-align: bottom;'/></td><td  colspan='1'  style='width: 100px; background: red;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/08.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'> <img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/09.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/10.jpg' width='200' style='vertical-align: bottom;'/></td> </tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/11.jpg' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/12.jpg'  style='vertical-align: bottom;'/></td></tr></table>" ;
 }
 }
else{
  $mail->Body = "<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'><table border='0' cellpadding='0' cellspacing='0'  ><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/01.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/02.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-recebemos-pedido/03.jpg'  style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 14px;  color: #9B9B9B;  background: #f2f2f2; text-align: center;'><td colspan='4'><br/><br/>Seu pedido ".$cookieoffer['id']." foi enviado!<br/>Esperamos que esteja satisfeito com nossos serviços e que aproveite sua aquisição.<br/><br/><br/></td></tr><tr style=''><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/ImgsEmail/services.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'>".$title."</td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'>O voucher do serviço estará disponível no aplicativo após confirmação do pagamento<br/><hr/></td><td  style='width: 200px; text-align: center;'><b>R$".$desconto."</b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'></td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'><br/></td><td  style='width: 200px; text-align: center;'><b><span style='font-size: 20px;'>R$".$total_value."</span></b></td></tr><tr ></tr><tr style='background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'></td></tr><tr></tr><tr><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/07.jpg' width='200' style='vertical-align: bottom;'/></td><td  colspan='1'  style='width: 100px; background: red;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/08.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'> <img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/09.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/10.jpg' width='200' style='vertical-align: bottom;'/></td> </tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/11.jpg' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/12.jpg'  style='vertical-align: bottom;'/></td></tr></table>" ;
}

// Define a mensagem (Texto e Assunto)
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 $mail->Subject  = "Jezzy - Pedido Recebido"; // Assunto da mensagem

 $mail->AltBody = "Seu pedido foi adicionado ao Jezzy!";





// Define os anexos (opcional)
 // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//$mail->AddAttachment("c:/temp/documento.pdf", "novo_nome.pdf");  // Insere um anexo
  // Envia o e-mail

 $enviado = $mail->Send();


// Limpa os destinatários e os anexos
 $mail->ClearAllRecipients();
$mail->ClearAttachments();
 // Exibe uma mensagem de resultado
 if ($enviado) {

$order2 = $moip->orders()->get($jObj->id);

} else {

   echo "Não foi possível enviar o e-mail.";
  echo "<b>Informações do erro:</b> " . $mail->ErrorInfo;
 }
?>
<div class="container">
    <div class="row rowLogo">
        <div class="col-xs-12">
            <img src="../../img/icons/logo_login_fundo_branco.PNG" class="logobackgroudWhite" >
        </div>
    </div>
    <div class="textLogin">
    <div id="result">SEU PEDIDO FOI EFETUADO COM SUCESSO!</div>
    <div id="payid">
    <?php
    if($offer_type == 'PRODUCT'){

     print_r('PRODUTO: ' .$order2->data->items[0]->product);

     }else{

      print_r('SERVIÇO: ' .$order2->data->items[0]->product);

     }
     ?></br>
     <?php

       $total = $total_value + $resultfrete2;
      print_r('VALOR TOTAL: R$'.$total);
      ?></br>
        <?php
        print_r('ACOMPANHE O STATUS DO PEDIDO NO HISTÓRICO DE COMPRAS');
        ?>


    <script>
    var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = Base64._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        },
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = Base64._utf8_decode(output);
            return output;
        },
        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        _utf8_decode: function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    };
function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}
function SaveClick(){
       var query = 'SELECT * FROM offers_statistics WHERE offer_id = ' + $.cookieStorage.get('Offer').id;

                var conditions = {
                    'User':{
                        'query':query
                    }
                };

                var postData = JSON.stringify(conditions);

                postData = {
                    'params': postData
                };
                var url = 'https://'+api+'/users/get/query/' + createToken();


                $.ajax({
                    method: "POST",
                    url: url,
                    data: postData
                }).done(function(result) {
                    if(result != "") {
                        var objReturn = JSON.parse(JSON.stringify(result));
                        var decodeObjReturn = Base64.decode(objReturn);
                        var convertedReturn = JSON.parse(decodeObjReturn);
                        for(var i=0; i<convertedReturn.length;i++){


                            var cliques = (convertedReturn[i].offers_statistics.purchased_card)/1 + 1;

                            var query2 = 'UPDATE offers_statistics SET purchased_card = '+cliques+' WHERE offer_id = ' + $.cookieStorage.get('Offer').id;

                            var conditions2 = {
                                'User':{
                                    'query':query2
                                }
                            };

                            var postData2 = JSON.stringify(conditions2);

                            postData2 = {
                                'params': postData2
                            };
                            var url2 = 'https://'+api+'/users/get/query/' + createToken();


                            $.ajax({
                                method: "POST",
                                url: url2,
                                data: postData2
                            }).done(function(result) {
                                if(result == "") {
									 $("body").fadeOut(300, function() {
                                 window.location.href = '../../home.html'
									 });
                                }

                            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                                alert(errorThrown);
                            });
                        }
                    }else{
                        var query2 = 'INSERT INTO offers_statistics (purchased_card, offer_id) VALUES (1, '+$.cookieStorage.get('Offer').id+')';
                        console.log(query2);
                        var conditions2 = {
                            'User':{
                                'query':query2
                            }
                        };

                        var postData2 = JSON.stringify(conditions2);

                        postData2 = {
                            'params': postData2
                        };
                        var url2 = 'https://'+api+'/users/get/query/' + createToken();


                        $.ajax({
                            method: "POST",
                            url: url2,
                            data: postData2
                        }).done(function(result) {
                            if(result == "") {
								 $("body").fadeOut(300, function() {
                             window.location.href = '../../home.html'
								 });
                            }
                        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        });
                    }

                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });



    }

    </script>

    </div>
    </div>
    <div class="row marginTop25">
        <div class="col-xs-12">
            <button type="button"  class="btn btn-success btn-lg btn-block " onclick="SaveClick();">VOLTAR</button>
        </div>
    </div>
</div>
</body>
</html>


