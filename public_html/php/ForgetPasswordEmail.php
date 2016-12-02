<?php
// Inclui o arquivo class.phpmailer.php localizado na pasta phpmailer
require("../lib/phpmailer/PHPMailerAutoload.php");
require("configuracao.php");
header('Content-Type: text/html; charset=utf-8');
  // Inicia a classe PHPMailer
$mail = new PHPMailer(true);
$email = $_POST['email'];
$name = $_POST['name'];
$password = $_POST['password'];

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

// Define a mensagem (Texto e Assunto)
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 $mail->Subject  = "Jezzy - Recuperar Senha"; // Assunto da mensagem
 $mail->Body =  "<table border='0' cellpadding='0' cellspacing='0'><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/mudanca-senha/01.jpg'  style='vertical-align: bottom;'/></td></tr><tr style='background: #f7f7f7; text-align: center;'><td colspan='4'><br/><span style='color: #999933; font-family: Helvetica, Arial, sans-serif; font-size: 36px;'><i>Olá, ".$name."!</i></span>    <br/><br/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/mudanca-senha/02.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4' style='text-align: center; background: #f7f7f7;'><span  style='color: #2597ac; font-family: Helvetica, Arial, sans-serif; font-size: 16px;'><i>Senha:".$password."</i></span></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/mudanca-senha/03.jpg'  tyle='vertical-align: bottom;'/></td></tr><tr><td><img src='https://secure.jezzy.com.br/uploads/Emails/files/transacao-finalizada/07.jpg' width='200' style='vertical-align: bottom;'/></td><td><img src='https://secure.jezzy.com.br/uploads/Emails/files/transacao-finalizada/08.jpg' width='200' style='vertical-align: bottom;'/></td><td><img src='https://secure.jezzy.com.br/uploads/Emails/files/transacao-finalizada/09.jpg' width='200' style='vertical-align: bottom;'/></td><td colspan='1'><img src='https://secure.jezzy.com.br/uploads/Emails/files/transacao-finalizada/10.jpg' width='200' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/transacao-finalizada/11.jpg' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'>     <img src='https://secure.jezzy.com.br/uploads/Emails/files/transacao-finalizada/12.jpg'  style='vertical-align: bottom;'/></td></tr></table>";
 $mail->AltBody = "".$email."";



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
   setcookie ('Senha', 'Modificada');
   header("Location: ../forgot_password_success.html");
 } else {
   echo "Não foi possível enviar o e-mail.";
   echo "<b>Informações do erro:</b> " . $mail->ErrorInfo;
  header("Location: ../forgot_password.html");
 }
