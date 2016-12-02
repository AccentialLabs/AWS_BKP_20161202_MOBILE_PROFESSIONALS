<?php
//arquivo de configuração dos caminhos externos para os arquivos php contidos no projeto jezzy-mobile

$ip = 'secure.jezzy.com.br';
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
?>
