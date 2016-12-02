<?php

require_once('RsCorreios.php');

// Instancia a classe
$frete = new RsCorreios();


// Aqui estou usando um foreach para economizar código
foreach ($_POST as $key => $value) {
    $frete->setValue($key, $value);
}

// Diâmetro
$frete->getDiametro();

// Chamado ao método getFrete, que irá se comunicar com os correios
// e nos trazer o resultado
$result = $frete->getFrete();


// Retornamos a mensagem de erro caso haja alguma falha
if ($result['erro'] != 0) {
    $resultadoFrete = $result['msg_erro'];
}
// Caso não haja erros mostramos o resultado de cada variável retornada pelos correios.
// Use apenas as que forem de seu interesse
else {
	$resultadoFrete = $result['valor'] . "|";
	$resultadoFrete .= $result['prazo_entrega'] . " dia(s) após confirmação de pagamento ";
}


echo $resultadoFrete;
?>