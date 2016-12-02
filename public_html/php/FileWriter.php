<?php

    $fileschedules =  $_POST['fileschedules'];
    $myfile = fopen('../lib/arquivo.txt', "w") or die("Unable to open file!");
    $txt =  $_POST['txt'];
    fwrite($myfile, $txt);
    fclose($myfile);

?>