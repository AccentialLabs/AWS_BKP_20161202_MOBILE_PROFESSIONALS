<?php


$fileschedules =  $_POST['fileschedules'];
;
$handle = @fopen('../lib/arquivo.txt', "r");
   if ($handle) {
    while (($buffer = fgets($handle, 4096)) !== false) {
     echo $buffer;
    }
   if (!feof($handle)) {
    echo "Erro: falha inexperada de fgets()\n";
   }

   fclose($handle);
 }
?>