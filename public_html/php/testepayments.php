

<?php

 $json = '{
            "installmentCount": 1,
            "fundingInstrument": {
              "method": "BOLETO",
              "boleto": {
                  "expirationDate": "2016-06-06"
              }
            }
          }';


										$header = array();
										$header[] = 'Content-type: application/json';
										$header [] = "Authorization: Basic SFJFT1RPSEpPNElZUVJPMjRBRVVVTVE4OVpRMTEzUk46U1BUUTJYUllTN1dISlVLUUtIMjVUQzk1N0gwM0xJNFpXS0xDTzBDTA==";
										$auth = 'SFJFT1RPSEpPNElZUVJPMjRBRVVVTVE4OVpRMTEzUk46U1BUUTJYUllTN1dISlVLUUtIMjVUQzk1N0gwM0xJNFpXS0xDTzBDTA==';
                                        // URL do SandBox - Nosso ambiente de testes
                                        // $url = "https://desenvolvedor.moip.com.br/sandbox/ws/alpha/PreCadastramento";
                                        $url = "https://sandbox.moip.com.br/v2/orders/ORD-O18QM0UTNSKA/payments";

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

										var_dump($ret);
