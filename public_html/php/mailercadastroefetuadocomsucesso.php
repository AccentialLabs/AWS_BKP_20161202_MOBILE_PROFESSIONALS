<?php
// Inclui o arquivo class.phpmailer.php localizado na pasta phpmailer
require("../lib/phpmailer/PHPMailerAutoload.php");
require 'configuracao.php';
header('Content-Type: text/html; charset=utf-8');
  // Inicia a classe PHPMailer
$mail = new PHPMailer(true);
$email = $_POST['email'];
$senha = $_POST['password'];
$name = $_POST['name'];

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
 $mail->FromName = $host_from; // Seu nome

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

// Define a mensagem (Texto e Assunto)
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 $mail->Subject  = "Jezzy - Cadastro efetuado com sucesso!"; // Assunto da mensagem
 $mail->Body =  "<table border='0' cellpadding='0' cellspacing='0' ><tr><td colspan='4'><img src='http://www.schabla.com.br/jezzy_images/boas-vindas/01.jpg' width='600' style='vertical-align: bottom;'/></td></tr><tr style='background: #f7f7f7; text-align: center;'><td colspan='4'><br/><span style='color: #999933; font-family: Helvetica, Arial, sans-serif; font-size: 36px;'><i>".$name.", seja bem-vindo!</i></span><br/><br/></td></tr><tr><td colspan='4'><img src='http://www.schabla.com.br/jezzy_images/boas-vindas/03.jpg' width='600' style='vertical-align: bottom;'/></td>            </tr><tr style='background: #f7f7f7;'><td colspan='4' style='text-align: center;'><span style='color: #2597AC; font-size: 12px;  font-family: Helvetica, Arial, sans-serif;'>                        <br/><b>E-mail: ".$email."<br/>Senha:".$senha."</b><br/></span></td></tr><tr style='background: #f7f7f7;'><td colspan='4'><br/><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/04.jpg' width='600'/><br/></td></tr><tr style='background: #f7f7f7; width: 600px;'><td style='width: 50px;' colspan='1'></td><td style='width: 150px; text-align: right;' colspan='1'><a href='#'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/App%20Store.png' width='80'/></a></td><td style='width: 150px; text-align: left;' colspan='1'><a href='#'> <img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/Google%20Play.png' width='80'/></a></td><td style='width: 50px;' colspan='1'></td></tr><tr><td colspan='4'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/05-1.jpg' width='600' height='30' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/06.jpg' width='600' style='vertical-align: bottom;'/></td></tr><tr><td colspan='1'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/07.jpg' width='151' style='vertical-align: bottom;'/></td><td  colspan='1'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/08.jpg' width='151' style='vertical-align: bottom;'/></td>     <td colspan='1'> <img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/09.jpg' width='151' style='vertical-align: bottom;'/></td><td colspan='1'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/10.jpg' width='151' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/11.jpg' width='600' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/12.jpg' width='600' style='vertical-align: bottom;'/>  </td></tr></table>";
 $mail->AltBody = "".$name."";






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
   header("Location: ../index.html");
 } else {
   echo "Não foi possível enviar o e-mail.";
   echo "<b>Informações do erro:</b> " . $mail->ErrorInfo;
  header("Location: ../new_user.html");
 }
