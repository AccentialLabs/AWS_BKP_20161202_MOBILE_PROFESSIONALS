public function calcFrete($servico, $CEPorigem, $CEPdestino, $peso, $altura = '4', $largura = '12', $comprimento = '16', $valor = '1.00') {
// //////////////////////////////////////////////
// Código dos Serviços dos Correios
// 41106 PAC
// 40010 SEDEX
// 40045 SEDEX a Cobrar
// 40215 SEDEX 10
// //////////////////////////////////////////////
// URL do WebService
$correios = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&sCepOrigem=" . $CEPorigem . "&sCepDestino=" . $CEPdestino . "&nVlPeso=" . $peso . "&nCdFormato=1&nVlComprimento=" . $comprimento . "&nVlAltura=" . $altura . "&nVlLargura=" . $largura . "&sCdMaoPropria=n&nVlValorDeclarado=" . $valor . "&sCdAvisoRecebimento=n&nCdServico=" . $servico . "&nVlDiametro=0&StrRetorno=xml";
// Carrega o XML de Retorno
$xml = simplexml_load_file($correios);
// Verifica se não há erros
if ($xml->cServico->Erro == '0') {
$retorno = $xml->cServico->Valor . "-" . $xml->cServico->PrazoEntrega;
return $retorno;
} else {
return false;
}
}
