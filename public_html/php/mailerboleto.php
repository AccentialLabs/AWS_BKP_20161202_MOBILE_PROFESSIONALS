<?php


// Inclui o arquivo class.phpmailer.php localizado na pasta phpmailer
         require("../lib/phpmailer/PHPMailerAutoload.php");
         require("configuracao.php");
         header('Content-Type: text/html; charset=utf-8');

           // Inicia a classe PHPMailer
         $mail = new PHPMailer(true);
         $email = $_POST['email'];
         $offer_type = $_POST['offertype'];
         $linkboleto = $_POST['password'];
         $frete = $_POST['frete'];
         $desconto = $_POST['desconto'];
         $total_value = $_POST['valortotal'];
         $title = $_POST['title'];
         // Define os dados do servidor e tipo de conexão
         // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
         $mail->IsSMTP(); // Define que a mensagem será SMTP
          $mail->Host = $host_mailer; // Endereço do servidor SMTP
          $mail->SMTPAuth = true; // Usa autenticação SMTP? (opcional)
          $mail->Username = $host_username; // Usuário do servidor SMTP
          $mail->Password = $host_Password; // Senha do servidor SMTP

          // Define o remetente
          // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
          $mail->From = $host_username; // Seu e-mail
          $mail->FromName = "Contato - Jezzy"; // Seu nome

          // Define os destinatário(s)
          // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
        $mail->AddAddress($email);
          //$mail->AddAddress('ciclano@site.net');
          //$mail->AddCC('ciclano@site.net', 'Ciclano'); // Copia
          //$mail->AddBCC('fulano@dominio.com.br', 'Fulano da Silva'); // Cópia Oculta

         // Define os dados técnicos da Mensagem
           // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
          $mail->IsHTML(true); // Define que o e-mail será enviado como HTML
        $mail->CharSet = 'utf-8'; // Charset da mensagem (opcional)

        $quantidade = $_COOKIE["quantidade"];

        if($quantidade != "1"){
            $quantidade = '';
            $quantidade = $_COOKIE["quantidade"] . " unidades";
        }else{
            $quantidade = '';
            $quantidade = $_COOKIE["quantidade"] . " unidade";
        }

        $desconto = number_format($desconto / 100, 2, ',', '.');
         // Define a mensagem (Texto e Assunto)
         // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

            if($offer_type == 'PRODUCT'){
             if($frete != 0){

                $mail->Body = "<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'><table border='0' cellpadding='0' cellspacing='0'  ><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/01.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/02.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-recebemos-pedido/03.jpg'  style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 14px;  color: #9B9B9B;  background: #f2f2f2; text-align: center;'><td colspan='4'><br/><br/>Seu pedido ".$_POST['id']." foi enviado!<br>Esperamos que esteja satisfeito com nossos serviços e que aproveite sua aquisição.<br/><br/><b>Atenção</b><br><br>Se você tiver pago o boleto numa sexta-feira, sábado ou domingo, a confirmação do pagamento será<br>realizada na terça-feira, conforme calendário de compensação bancária. Em caso de feriado bancário,<br>ela só poderá ser feita no segundo dia útil após o pagamento.<br>Lembramos que o boleto deve ser pago até a data de seu vencimento.</td></tr><tr><td colspan = '4'><a href = '".$linkboleto."'><img src='https://secure.jezzy.com.br/uploads/ImgsEmail/boleto.jpg' width='800' style='vertical-align: bottom;'></a></td></tr><tr style=''><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/ImgsEmail/products.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'>".$title."</td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'>".$quantidade."<br/><hr/></td><td  style='width: 200px; text-align: center;'><b>R$".$desconto."</b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'></td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'><br/></td><td  style='width: 200px; text-align: center;'><b><span style='font-size: 20px;'>R$".$total_value."</span></b></td></tr><tr ><td colspan='4'><img src='http://www.schabla.com.br/jezzy_images/pagamento-aprovado/02.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'><span>O endereço de entrega informado/selecionado por você foi:<br><br><b>".utf8_decode($_POST["address"]).", ".$_POST["number"]." - ".utf8_decode($_POST["complement"])." - ".utf8_decode($_POST["district"])."<br>CEP ".$_POST["zip_code"]." - ".utf8_decode($_POST["city"])." - ".utf8_decode($_POST["state"])."</b><br><br> VALOR DO FRETE R$".($frete)."</span></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-recebemos-pedido/06.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/07.jpg' width='200' style='vertical-align: bottom;'/></td><td  colspan='1'  style='width: 100px; background: red;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/08.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'> <img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/09.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/10.jpg' width='200' style='vertical-align: bottom;'/></td> </tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/11.jpg' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/12.jpg'  style='vertical-align: bottom;'/></td></tr></table>" ;
            }else{
                $mail->Body = "<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'><table border='0' cellpadding='0' cellspacing='0'  ><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/01.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/02.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-recebemos-pedido/03.jpg'  style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 14px;  color: #9B9B9B;  background: #f2f2f2; text-align: center;'><td colspan='4'><br/><br/>Seu pedido ".$_POST['id']." foi enviado!<br>Esperamos que esteja satisfeito com nossos serviços e que aproveite sua aquisição.<br/><br/><b>Atenção</b><br><br>Se você tiver pago o boleto numa sexta-feira, sábado ou domingo, a confirmação do pagamento será<br>realizada na terça-feira, conforme calendário de compensação bancária. Em caso de feriado bancário,<br>ela só poderá ser feita no segundo dia útil após o pagamento.<br>Lembramos que o boleto deve ser pago até a data de seu vencimento.</td></tr><tr><td colspan = '4'><a href = '".$linkboleto."'><img src='https://secure.jezzy.com.br/uploads/ImgsEmail/boleto.jpg' width='800' style='vertical-align: bottom;'></a></td></tr><tr style=''><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/ImgsEmail/products.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'>".$title."</td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'>".$quantidade."<br/><hr/></td><td  style='width: 200px; text-align: center;'><b>R$".$desconto."</b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'></td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'><br/></td><td  style='width: 200px; text-align: center;'><b><span style='font-size: 20px;'>R$".$total_value."</span></b></td></tr><tr ></tr><tr style='background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'><span>Retirar no(a) ".$salao."<br/><br/><b></b></span></td></tr><tr></tr><tr><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/07.jpg' width='200' style='vertical-align: bottom;'/></td><td  colspan='1'  style='width: 100px; background: red;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/08.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'> <img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/09.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/10.jpg' width='200' style='vertical-align: bottom;'/></td> </tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/11.jpg' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/12.jpg'  style='vertical-align: bottom;'/></td></tr></table>" ;
            }
            }
            else{
                $mail->Body = "<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'><table border='0' cellpadding='0' cellspacing='0'  ><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/01.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/02.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-recebemos-pedido/03.jpg'  style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 14px;  color: #9B9B9B;  background: #f2f2f2; text-align: center;'><td colspan='4'><br/><br/>Seu pedido ".$_POST['id']." foi enviado!<br>Esperamos que esteja satisfeito com nossos serviços e que aproveite sua aquisição.<br/><br/><b>Atenção</b><br><br>Se você tiver pago o boleto numa sexta-feira, sábado ou domingo, a confirmação do pagamento será<br>realizada na terça-feira, conforme calendário de compensação bancária. Em caso de feriado bancário,<br>ela só poderá ser feita no segundo dia útil após o pagamento.<br>Lembramos que o boleto deve ser pago até a data de seu vencimento.</td></tr><tr><td colspan = '4'><a href = '".$linkboleto."'><img src='https://secure.jezzy.com.br/uploads/ImgsEmail/boleto.jpg' width='800' style='vertical-align: bottom;'></a></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 14px;  color: #9B9B9B;  background: #f2f2f2; text-align: center;'><td colspan='4'><br/><b style='color:#999933;'>Atenção:</b>Não page o boleto após a data de vencimento!<br><br></td></tr><tr style=''><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/ImgsEmail/services.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'>".$title."</td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'>O voucher do serviço estará disponível no aplicativo após confirmação do pagamento<br/><hr/></td><td  style='width: 200px; text-align: center;'><b>R$".$desconto."</b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'></td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'><br/></td><td  style='width: 200px; text-align: center;'><b><span style='font-size: 20px;'>R$".$total_value."</span></b></td></tr><tr ></tr><tr style='background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'></td></tr><tr></tr><tr><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/07.jpg' width='200' style='vertical-align: bottom;'/></td><td  colspan='1'  style='width: 100px; background: red;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/08.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'> <img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/09.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/10.jpg' width='200' style='vertical-align: bottom;'/></td> </tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/11.jpg' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/12.jpg'  style='vertical-align: bottom;'/></td></tr></table>" ;
            }

       $mail->Subject  = "Jezzy - Boleto Bancario"; // Assunto da mensagem
       $mail->AltBody = "Esta é uma mensagem automática, não é necessário respondê-la" ;
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

            header("Location: ../boletoenviosuccess.html");
          } else {

   echo "Não foi possível enviar o e-mail.";
  echo "<b>Informações do erro:</b> " . $mail->ErrorInfo;
 }
