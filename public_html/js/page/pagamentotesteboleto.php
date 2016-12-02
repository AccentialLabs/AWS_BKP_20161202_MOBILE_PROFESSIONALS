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

    <script src="../../js/page/forgot_password.js"></script>

</head>
<body>
<form action="../../php/mailerboleto.php" method="post">
<?php

header('Content-Type: text/html; charset=utf-8');

require("../../lib/phpmailer/PHPMailerAutoload.php");
require '../../vendor/moip/vendor/autoload.php';
require("../../php/configuracao.php"); //pega as configurações globais de endereços


use Moip\Moip;
use Moip\MoipBasicAuth;


$token = 'HREOTOHJO4IYQRO24AEUUMQ89ZQ113RN';
$key = 'SPTQ2XRYS7WHJUKQKH25TC957H03LI4ZWKLCO0CL';
$cookie = json_decode($_COOKIE['User'], true);//cookie usuario completo
$cookieoffer = json_decode($_COOKIE['Offer'], true);//cookie oferta completo


$moip = new Moip(new MoipBasicAuth($token, $key), Moip::ENDPOINT_SANDBOX);

if($cookieoffer['company_id']!=99999){ //se a companhia for diferente de 99999 IF 1
$params = array(
    'User' => array(
            'query' => 'SELECT * FROM companies Company WHERE Company.id = '.$cookieoffer['company_id'], //pesquisar companhia da oferta
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
$moip_id = ($array[0]['Company']['moip_id']); //adiciona moip_id da companhia dona da oferta
$salao = ($array[0]['Company']['fancy_name']); //adiciona nome da companhia dona da oferta


curl_close($curl);

}else{ //se a companhia for igual a 99999 IF 1

$params = array(
    'User' => array(
            'query' => 'SELECT * FROM favorites_companies WHERE user_id = '.$cookie['id'], // pesquisa companhia favorita do usuario
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

if(!empty($data)){ //IF 2 se o usuario tiver uma companhia favorita

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
  $split = ($array[0]['Company']['percentage_split']);
  $commid = ($array[0]['Company']['id']);
  $moip_id = ($array[0]['Company']['moip_id']);

  if($cookieoffer['parcels']!='INACTIVE'){ //IF 3 se a oferta puder ser parcelada
  if($_POST['parcels'] == ''){ // IF 4 se as parcelas não estiverem preenchidas
  $parcels = 1;
  }else{ //IF 4
  $parcels = $_POST['parcels'];
  }
  }else{//IF 3


  $parcels = 1;
  }
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

if($split == NULL){
$split = ($array[0]['offers_extra_infos']['percentage_split']);
}
curl_close($curl);


}else{// IF 2
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
$resultoffertotal  = str_replace("R$", "", $_COOKIE['total_value']);
$total_value = str_replace(",", ".", $resultoffertotal);
$offerunit = $cookieoffer['value'];

$resultunit = str_replace(".", "", $offerunit);

$desconto =  number_format($desconto, 2);
$desconto = str_replace(".", "",$desconto);

$uniqid = uniqid();




$json =  '{"ownId": "'.$uniqid.'","amount": {"currency": "BRL","subtotals": {"shipping": '.$resultfrete3.'}},"items": [{"product": "'.$cookieoffer["title"].'","quantity": '.$_COOKIE["quantidade"].',"detail": "'.substr(strip_tags($cookieoffer["resume"]), 0, 249).'","price": '.$desconto.'}],"receivers":[{"moipAccount": {"id": "'.$moip_id.'"},"type": "SECONDARY","amount": {"percentual": '.$split.'}}],"customer": {"ownId": "'.uniqid().'","fullname": "'.$cookie["name"].'","email": "'.$cookie["email"].'","birthDate": "'.$cookie["birthday"].'","taxDocument": {"type": "CPF","number": "'.$_POST["taxdocumentboleto"].'"},"phone": {"countryCode": "55","areaCode": "11","number": "66778899"},"shippingAddress": {"street":  "'.$_COOKIE["address"].'",  "streetNumber": '.$_COOKIE["number"].',"complement": "'.$_COOKIE["complement"].'","district": "'.$_COOKIE["district"].'","city":  "'.$_COOKIE["city"].'","state":  "'.$_COOKIE["state"].'",   "country": "BRA","zipCode": "'.$_COOKIE["zip_code"].'"}    }   }';




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
                        $expiration = $data -> add(new DateInterval('P2D')) -> format("Y-m-d");

print_r($expiration);
 $json = '{
            "installmentCount": 1,
            "fundingInstrument": {
              "method": "BOLETO",
              "boleto": {
                  "expirationDate": "'.$expiration.'",
                  "logoUri": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xtl1/v/t1.0-9/12742330_214925868856852_2120169749048167775_n.png?oh=564e1ca91b7a2c0b024163ddca8249b9&oe=5754342C&__gda__=1465729169_01ccb691f907085f85c442f605615fb3"
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



                                       $objeto  = json_decode($ret);





$link = $objeto->_links->payBoleto->redirectHref;

$resultfrete2 = str_replace(",", ".", $resultfrete);
$secondary_receiver_pay = ($total_value/100)*$split;
if(empty($commid)){
$commid = 0;
}
$params = array(
    'User' => array(
            'query' => 'INSERT INTO checkouts (user_id, company_id, payment_method_id,offer_id,payment_state_id, unit_value,total_value,amount, shipping_value, shipping_type,delivery_time,metrics,address, city, zip_code, state, district, number, complement,date,  transaction_moip_code, installment, boleto_link, secondary_receiver_pay, commissioned_company_id) VALUES ('.$cookie['id'].','.$cookieoffer['company_id'].', 73,'.$cookieoffer['id'].',2,"'.$offerunit.'","'.$total_value.'", '.$_COOKIE['quantidade'].' ,"'.$resultfrete2.'", '.$_COOKIE['shipping_type'].' , '.$_COOKIE['shipping_days'].', "'.$_COOKIE['metrics'].'", "'.$_COOKIE['address'].'", "'.$_COOKIE['city'].'",'.$_COOKIE['zip_code'].' ,"'.$_COOKIE['state'].'" , "'.$_COOKIE['district'].'", '.$_COOKIE['number'].', "'.$_COOKIE['complement'].'","'.$dn.' 00:00:00","'.$uniqid.'", 1, "'.$link.'", "'.$secondary_receiver_pay.'", '.$commid.')'
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
  $email =  $jObj->customer->email;
  $expirationdate = $objeto->fundingInstrument->boleto->expirationDate;
  $link = $objeto->_links->payBoleto->redirectHref;

  $time =  strtotime($expirationdate);
  $newformat = date('d/m/Y',$time);

}else{
$params = array(
    'User' => array(
            'query' => 'SELECT * FROM offers_services WHERE offer_id = "'.$cookieoffer['id'].'";'
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


  $title = $cookieoffer['title'];
  $order2 = $moip->orders()->get($jObj->id);
  $email = $jObj->customer->email;
  $expirationdate = $objeto->fundingInstrument->boleto->expirationDate;
  $link = $objeto->_links->payBoleto->redirectHref;

$time =  strtotime($expirationdate);
$newformat = date('d/m/Y',$time);
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
   </br><?php
     if($offer_type == 'PRODUCT'){

        print_r('PRODUTO: ' .$order2->data->items[0]->product);

        }else{

         print_r('SERVIÇO: ' .$order2->data->items[0]->product);

        }
    ?></br>
    </br>
    <?php
    print_r('SEU BOLETO SERÁ ENVIADO PARA O E-MAIL: ' .$email);
    ?></br></br>
    <?php
     print_r('AGUARDAMOS O PAGAMENTO DO BOLETO ATÉ ' .$newformat .', APÓS ESTA DATA O PEDIDO SERÁ CANCELADO.' );
    ?>
    </div>
    </div>

    <div class="row marginTop25">

        <div class="col-xs-12">
        <input class="form-control transparent-input" type="hidden"  name='email' id="email" value="<?php echo $email; ?>" placeholder="<?php echo $email; ?>"  required>
        <input class="form-control transparent-input" type="hidden"  name='offertype' id="offertype" value="<?php echo $offer_type; ?>" placeholder="<?php echo $offer_type; ?>">
        <input class="form-control transparent-input" type="hidden"  name='frete' id="frete" value="<?php echo $resultfrete2; ?>" placeholder="<?php echo $resultfrete2; ?>">
        <input class="form-control transparent-input" type="hidden"  name='desconto' id="desconto" value="<?php echo $desconto; ?>" placeholder="<?php echo $desconto; ?>">
        <input class="form-control transparent-input" type="hidden"  name='valortotal' id="valortotal" value="<?php echo $total_value; ?>" placeholder="<?php echo $total_value; ?>">
        <input class="form-control transparent-input" type="hidden"  name='salao' id="salao" value="<?php echo $salao; ?>" placeholder="<?php echo $salao; ?>">
        <input class="form-control transparent-input" type="hidden"  name='title' id="title" value="<?php echo $title; ?>" placeholder="<?php echo $title; ?>">
        <input class="form-control transparent-input" type="hidden"  name='district' id="district" value="<?php echo $_COOKIE['district']; ?>" placeholder="<?php echo $_COOKIE['district']; ?>">
        <input class="form-control transparent-input" type="hidden"  name='zip_code' id="zip_code" value="<?php echo $_COOKIE['zip_code']; ?>" placeholder="<?php echo $_COOKIE['zip_code']; ?>">
        <input class="form-control transparent-input" type="hidden"  name='city' id="city" value="<?php echo $_COOKIE['city']; ?>" placeholder="<?php echo $_COOKIE['city']; ?>">
        <input class="form-control transparent-input" type="hidden"  name='address' id="address" value="<?php echo $_COOKIE['address']; ?>" placeholder="<?php echo $_COOKIE['address']; ?>">
          <input class="form-control transparent-input" type="hidden"  name='complement' id="complement" value="<?php echo $_COOKIE['complement']; ?>" placeholder="<?php echo $_COOKIE['complement']; ?>">
            <input class="form-control transparent-input" type="hidden"  name='number' id="number" value="<?php echo $_COOKIE['number']; ?>" placeholder="<?php echo $_COOKIE['number']; ?>">
              <input class="form-control transparent-input" type="hidden"  name='state' id="state" value="<?php echo $_COOKIE['state']; ?>" placeholder="<?php echo $_COOKIE['state']; ?>">
                <input class="form-control transparent-input" type="hidden"  name='id' id="id" value="<?php echo $cookieoffer['id']; ?>" placeholder="<?php echo $cookieoffer['id']; ?>">
        <button type="submit"  name="Submit" class="btn btn-success btn-lg btn-block " onclick="sendRequest()" id="sendNewPassword">ENVIAR BOLETO</button>
        <input type='hidden' name='password' id="password" value ="<?php echo $link; ?>" placeholder="<?php echo $link; ?>" />
        </div>
    </div>
</div>
<script>

function meuLog(msg) {
    span = document.body;
}
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

function sendRequest() {

    var emailUsuario = document.getElementById('email').value;

    var conditions = {
        'User': {
            'conditions': {
                'User.email':emailUsuario
            }
        }
    };

    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/users/get/first/' + createToken();

    $.ajax({
        method: "POST",
        url: url,
        data: postData,
        async: false
    }).done(function (result) {


        var objReturn = JSON.parse(JSON.stringify(result));

        var decodeObjReturn = Base64.decode(objReturn);

        var convertedReturn = JSON.parse(decodeObjReturn);
            console.log(convertedReturn);
        var id = convertedReturn.User.id;
        var nome = convertedReturn.User.name;
        var email=convertedReturn.User.email;

        console.log(id, nome, email, emailUsuario);

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
    var emailUsuarioNewPassword = document.getElementById('email').value;

    console.log(emailUsuarioNewPassword);






}



function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}

function generateModalAlert(mensagem) {
    if ($("#mymodal").length) {
        $("#messageModelGoesHere").html(mensagem);
    } else {
        $modalHtml =
            '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="mymodal">'
            + '<div class="modal-dialog modal-sm">'
            + '<div class="modal-content" id="messageModelGoesHere">'
            + mensagem
            + '</div>'
            + '</div>'
            + '</div>';
        $("body").append($modalHtml);
    }
}



</script>
</form>
</body>
</html>





