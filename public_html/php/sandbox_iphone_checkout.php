<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Compras - trueOne</title>

<?php

//echo $this->Html->css('ipad/ipad');
?>

<style>
body{margin:0px; padding: 0px;}
h1{
	width:100%;
	float:left;
	margin:0px 0px 10px 0px !important;
	padding:0px;
	display: block;
	z-index: 9999;
	background-image: url('../../img/iphone/background-5.gif');
	font-size: 14px;
	font-weight: normal;
	font-style: normal;
	padding:10px 0px;
}
h1 span{
	position: relative;
	top:18px;
	left:40px;
	float: left;
	letter-spacing: -1px;
}
h1 strong{
	font-style: italic !important;
	display: block;
	font-size:16px;
	position: relative;
	margin-left:20px;
}
h1 .img{
	float: left;
	width:90px;
	overflow: hidden;
	height: 75px;
	margin-right: 10px;
	padding:10px;
	background-color:#535353;
	border-left:8px solid #ffa800;
	text-align: center;
	background-repeat: no-repeat;
	background-image: url('../../img/iphone/seta.png');
	background-position: 101px 40px;
}
h1 .img img{
	position: relative;
	top:-118px;
	left:-10px;
	float: left;
}

input:focus, select:focus, textarea:focus{
	outline:none !important;
	box-shadow:0px 0px 10px #ccc;
	color:#333;
}
.detalhe-forma-pagamento{
	width: 100% !important;
	height: auto;
	display: block;
	margin:0px auto;
	float: right !important;
	padding:0px 0px 30px 0px;
	overflow: hidden;
	background-image: url('../../img/iphone/logo-moip.png');
	background-repeat: no-repeat;
	background-position: right bottom;
	font-family: Arial;
}
.detalhe-forma-pagamento .area-escolha-de-cartao{
	float:left;
	width: 100%;
	height: auto;
	display: block;
}
.detalhe-forma-pagamento .area-dados-de-cartao{
	float:left;
	width: 100%;
	height: auto;
	display: block;
}
.area-escolha-de-cartao select{position: relative; top:0px;}
.detalhe-forma-pagamento .formulario{
	float: left;
	width: 100%;
	height: auto;
	display: table;
	z-index: 9999;
	position: relative;
}
#cartao .selecione-metrica{
	width:auto !important;
	float: left;
	height: 30px !important;
	background-color: transparent !important;
	position: relative;
	z-index:9999999;
	margin: 20px 0px;
	list-style: none;
	padding: 0px;
}

#cartao .selecione-metrica li{
	background:-webkit-linear-gradient(top, #fff, #fff);
	background:-moz-linear-gradient(top, #fff, #fff);
	background:-ms-linear-gradient(top, #fff, #fff);
	background:-o-linear-gradient(top, #fff, #fff);
}
#cartao ul li ul{
   float: left;
   height: 114px;
   list-style: none outside none;
   margin: 27px 0 0;
   overflow: auto;
   padding: 0;
   position: absolute;
   width: 266px !important;
   z-index: 99999999 !important;

}

#cartao ul li ul li a{
	color:#333;
	text-decoration: none;
}
#cartao ul li ul li a:hover{
	color:#333;
	text-decoration: underline;
}


#cartao .selecione-metrica div{height:1px !important; background-color: #fff !important;}

#cartao .selecione-metrica .span{
	width:auto !important;
	height: 22px; !important; float:left;
	padding-right: 10px;
}
#cartao .selecione-metrica input{
	float: right;
	width: 100px !important;
	padding:0px 6px !important;
	color: #fff !important;
	text-shadow:0px 0px 0px;
	background-color: #999999 !important;
	border: none !important;
	border-radius: 0px;
	margin: 0px;
	height:28px;
}

.detalhe-forma-pagamento input[type="radio"]{position: relative; top:-8px; margin-right: 5px;float:left; }


.detalhe-forma-pagamento div h5{margin:0px auto 15px auto; font-size: 13px;}

#selecione-o-meio{margin:0px 0px 0px 10px; width:98%;}
#selecione-o-meio a{
	display: block;
	float: left;
	margin:5px;
	color:#000;
	text-decoration: none;
	border:1px solid #cc8600;
	padding:10px;
	background-color:#ffa800;
}
#selecione-o-meio a:hover{
	color:#333;
	border:1px solid #cc8600;
	box-shadow: 0px 0px 10px #999;
}

.btn{
	display: block;
	float: left;
	margin:5px;
	color:#000;
	text-decoration: none;
	border:1px solid #cc8600;
	padding:10px;
	background-color:#ffa800;
}
.btn:hover{
	color:#333;
	border:1px solid #cc8600;
	box-shadow: 0px 0px 10px #999;
}

#boleto_bancario, #cartao{
	display: none;
	margin:0px 0px 0px 10px;
}
#cartao input{
	border-radius: 5px;
}
/*#boleto_bancario input.btn{
	display: block;
	float: left;
	margin:5px;
	color:#000;
	text-decoration: none;
	border:1px solid #cc8600;
	padding:10px;
	background-color:#ffa800;
}*/

.copyright-pagamento{
	float: right;
	margin:0px;
	padding:0px;
	position: relative;
	top:-20px;
	height: auto;
	left:15px;
	opacity: 0.5;
}
#sendToMoip{
	opacity: 0.5;
}

/*Inicio de codigo Botao*/
.area-botoes{
	width:98%;
	display: table !important;
	height: auto !important;
	padding:10px 0px 10px 0px !important;
	margin:40px 0px 10px 0px;
	position: relative !important;
	z-index: 99999999999999 !important;
	float: left;

}
.area-botoes button{
	border-radius: 4px;
	border:1px solid #d0d0d0;
	background-color: #efefef;
	padding:10px 20px;
	font-size:12px;
	width:auto;
	float: right;
	display: block;
	height:auto;
	box-shadow:inset 0px 0px 10px #ccc;
	margin-right: 4px;
	color:#535353;
}
.envio{
	padding:10px 60px;
	box-shadow:inset 0px 0px 1px #333 !important;
	color:#fff !important;
	background-color:#91aeb6 !important;
}
.cancelar{
		display: block;

	float: left;
	margin:4px 0px 0px 0px;
	color:#535353;
	font-weight: normal;
	text-decoration: none;
	background-image: url('../../img/iphone/seta-esquerda-link.png');
	background-position: left;
	background-repeat: no-repeat;
	text-decoration: underline;
	border:none !important;
	background-color: transparent !important;
	box-shadow: 0px 0px 0px !important;
}
/*Fim de codigo Botao*/



.area-formulario{
	width:48%;
	float: left;
	display: table;
	height: auto;
	padding:0px 0px !important;
	position: relative;
	margin-right: 10px;
}
.inteiro{
	float: none !important;
}
.area-formulario .exemplo{
	font-size:10px;
	color:#c3c3c3;
	text-transform: lowercase;
	width: 90%;
	display: block;
	text-align: left;
	position: relative;
	top:3px;
	padding:0px 0px 0px 15px;
	background-image: url('../../img/iphone/seta-up-textbox.png');
	background-position: 5px 2px;
	background-repeat: no-repeat;
}

.area-formulario label{
	display: block;
	position: relative;
	margin:10px 0px 5px 0px !important;
	padding:5px 0px;
	font-size: 12px;
	color:#999;
}
.textbox{
	border:1px solid #d0d0d0;
	background-color: #efefef;
	padding:10px 0px;
	font-size:12px;
	width:93%;
	display: block;
	height:17px;
	padding-left:10px;
	border-radius: 4px;
	box-shadow:inset 0px 0px 10px #ccc;
	color:#999;
	background:-webkit-linear-gradient(top, #fbfbfb, #efefef);
	background:-moz-linear-gradient(top, #fbfbfb, #efefef);
	background:-ms-linear-gradient(top, #fbfbfb, #efefef);
	background:-o-linear-gradient(top, #fbfbfb, #efefef);
}

.radiobutton{
	padding:0px;
	font-size:12px;
	width:auto;
	height:21px;
	display: block;
	float: left;
	color:#999;
	text-decoration: none;
}
.radiobutton input{
	position: relative;
	top:-10px;
}
.radiobutton a{
	padding:0px 0px 0px 24px;
	font-size:12px;
	width:21;
	display: block;
	height:21px;
	float: left;
	color:#999;
	text-decoration: none;
	position: relative;
	background-image:url('../../img/iphone/select-radio.png');
	background-repeat: no-repeat;
	background-position: 0px -67px;
	margin:0px 4px;
}
.radiobutton a span{position:relative; top:2px;}
.radiobutton a.ativo{
	background-position: 0px -44px;
}
/*Fim de Codigo de Checkbox e RadioButton*/

.form-validation {
	border:1px solid red;
}

</style>



    <script src="lib/jquery/jquery-2.1.4.min.js"></script>
      <script src="jquery.stringify"></script>
        <script src="jquery.mask.min"></script>
          <script src="jquery.validate"></script>



<script type='text/javascript' src='https://desenvolvedor.moip.com.br/sandbox/transparente/MoipWidget-v2.js' charset='ISO-8859-1'></script>
<script type="text/javascript">

$(function(){

	/* Máscaras Form Cartão de crédito */
	$('input#Numero').mask('9999999999999999',{reverse:true});
	$('input#Expiracao').mask('99/99',{reverse:true});
	$('input#DataNascimento').mask('99/99/9999',{reverse:true});
	$('input#Telefone').mask('(99)9999-9999');
	$('input#CPF').mask('999.999.999-99',{reverse:true});

	/* Validação Form Detalhes da Oferta */
	$('form#dadosCartaoCredito').validate({
		highlight: function(element) {
		     $(element).addClass('form-validation');
		},
		unhighlight: function(element, errorClass) {
		     $(element).removeClass('form-validation');
		},
		rules:{
			"instituicao":{required:true},
			"parcels":{required:true},
			"Numero":{required:true},
			"Expiracao":{required:true},
			"CodigoSeguranca":{required:true},
			"Portador":{required:true},
			"CPF":{required:true},
			"DataNascimento":{required:true},
			"Telefone":{required:true}
		},
		messages:{
			"instituicao":{required:""},
			"parcels":{required:""},
			"Numero":{required:""},
			"Expiracao":{required:""},
			"CodigoSeguranca":{required:""},
			"Portador":{required:""},
			"CPF":{required:""},
			"DataNascimento":{required:""},
			"Telefone":{required:""}
		}
	});

});

<?php if($moipError) : ?>

window.location.href = "trueone:moipError";

<?php endif; ?>

/* MOIP */

var boleto = function(){
      var settings = {
      	"Forma": "BoletoBancario"
      };
      MoipWidget(settings);
  };

var cartaoCredito = function() {

	var parcelValue = $('select#parcels').val();
	var parcels = parcelValue.split('-');
	var numParcels = parcels[0];

	var settings = {
	    "Forma": "CartaoCredito",
	    "Instituicao": $('input[name=instituicao]').val(),
	    "Parcelas": numParcels,
	    "Recebimento": "AVista",
	    "CartaoCredito": {
	        "Numero": $('input#Numero').val(),
	        "Expiracao": $('input#Expiracao').val(),
	        "CodigoSeguranca": $('input#CodigoSeguranca').val(),
	        "Portador": {
	            "Nome": $('input#Portador').val(),
	            "DataNascimento": $('input#DataNascimento').val(),
	            "Telefone": $('input#Telefone').val(),
	            "Identidade": $('input#CPF').val()
	        }
	    }
	};

	MoipWidget(settings);
};

calcularParcelasCartao = function() {

	$('ul.selecione-metrica').hide();
	$('div#numParcelsMessage').show();

    var settings = {
        cofre: "",
        instituicao: $('input[name=instituicao]').val(),
        callback: "retornoCalculoParcelamento"
    };

    MoipUtil.calcularParcela(settings);
};

var retornoCalculoParcelamento = function(data) {

	$('div#numParcelsMessage').hide();
	var options = '';
	if(data != null && data != '') {

		$.each(data.parcelas, function(index, value){
			options += "<option value='"+ value.quantidade +"-"+ value.valor +"'>"+ value.quantidade +"x R$ "+ value.valor +"</option>";
		});

		$('select#parcels').html(options);
		$('ul.selecione-metrica').show();
	}

	//$('#errorM').html($.stringify(data));
};

var sucesso = function(data) {

	if(data.Status != '' && data.Status != null) { // cartão

		window.location.href = "trueone:moipPaymentSuccess";

	} else { // boleto

		// retorna link do boleto para envio de e-mail
		var linkBoleto = data.url;

		var html = '<p>Sua compra foi realizada com sucesso!</p>' + '<a href="'+ linkBoleto + '">Abrir boleto no navegador</a>';

		$('#link-boleto').html(html);
		//window.location.href = "trueone:moipPaymentBoletoEmail";
	}

	//$('#errorM').html($.stringify(data));
};

var erroValidacao = function(data) {

	window.location.href = "trueone:moipError";
	//$('#errorM').html($.stringify(data));
};

/* Auxiliares */

function didCancelPayment()
{
	window.location.href = "trueone:didCancelPayment";
}

</script>

</head>

<body style="">
	<div id='errorM'></div>

	<div id="MoipWidget" data-token="<?php echo $moipToken;?>" callback-method-success="sucesso" callback-method-error="erroValidacao"></div>

	<div class="area-detalhes" style="width:300px; height:auto; display:block;padding:0px 0px;">
	<div class="detalhe-forma-pagamento">
		<h1><strong>Formas de Pagamento</strong></h1>
		<div class="alinha">

			<div id="escolha">
		<div id="selecione-o-meio">
			<h5>Modo de Pagamento</h5>
		</div>


		</div>

		<div id="boleto_bancario" style='<?php echo ($paymentMethod == "Boleto" ? "display:block" : "");?>'>
			<h5>Boleto Bancário</h5>
				<button type="button" id="boleto" class="btn" onclick='javascript:boleto();'>Clique para gerar o boleto bancário</button>
				<br/>
				<br/>
				<br/>
				<br/>
	 			<span id="link-boleto"></span>
		</div>

<form id='dadosCartaoCredito' action='javascript:cartaoCredito();'>

		<div id="cartao" style='<?php echo ($paymentMethod == "CreditCard" ? "display:block" : "");?>'>
			<h5>Dados do Cartão</h5>

<div class="area-escolha-de-cartao">

	<?php
		$onClick = '';
		if($isParcelsOn) {
			$onClick = "onclick='javascript:calcularParcelasCartao();'";
		}
	?>

	<div class="" style="float:left; width:260px !important; height:20px !important; display:block !important; z-index:0;">

<input type="radio" id="instituicao" name="instituicao" value='Visa' <?php echo $onClick;?>><?php echo $this->Html->image('ipad/visa.gif',array('style' => 'float:left; position:relative; top:-10px;')); ?></a>
<input type="radio" id="instituicao" name="instituicao" value='Mastercard' <?php echo $onClick;?>><?php echo $this->Html->image('ipad/master.gif',array('style' => 'float:left; position:relative; top:-10px;')); ?></a>
<input type="radio" id="instituicao" name="instituicao" value='AmericanExpress' <?php echo $onClick;?>><?php echo $this->Html->image('ipad/amex.gif',array('style' => 'float:left; position:relative; top:-10px;')); ?></a>


	</div>
		<br/>
		<br/>
		<div id='numParcelsMessage' style='display:none'>Calculando parcelas...</div>

		<ul class='selecione-metrica' style='display:none'>
			<li>
                <div id='numParcels'>
                    <span class="span">Número de parcelas</span>
                    <select id='parcels' mame='parcels'></select>
                </div>
			</li>
		</ul>
</div>

<div class="area-dados-de-cartao">
            <div class="area-formulario" style="width:120px;">
              	<label>Número do cartao</label>
               <input type="text" class="textbox" id="Numero" name="Numero" value="" style="width:120px;" alt="Número do cartao">
           </div>
           <div class="area-formulario" style="width:50px;">
           	<label>Validade</label>
               <input type="text" class="textbox" id="Expiracao" name="Expiracao" value="" style="width:50px;" alt="Validade">
            </div>
           <div class="area-formulario" style="width:50px;">
           	<label>Cod</label>
               <input type="text" class="textbox" id="CodigoSeguranca" name="CodigoSeguranca" value=""  style="width:50px; float:left" alt="Cod">
           </div>
           <div class="area-formulario" style="width:265px; float:none;">
           	<label>Nome gravado no cartão</label>
              <input class="textbox" type="text" id="Portador" name="Portador" value=""  style="width:265px;" alt="Nome gravado no cartão">
           </div>
           <div class="area-formulario" style="width:265px; float:none;">
           	<label>CPF</label>
               <input class="textbox" type="text" id="CPF" name="CPF" value="" alt="CPF" style="width:265px;">
           </div>
           <div class="area-formulario" style="width:115px;">
           	<label>Data de Nascimento</label>
				<input class="textbox" type="text" id="DataNascimento" name="DataNascimento" style="width:115px;" value="" alt="Data de Nascimento">
           </div>
           <div class="area-formulario" style="width:115px;">
           	<label>Telefone</label>
               <input class="textbox" type="text" id="Telefone" name="Telefone" style="width:115px; " value="" alt="Telefone"><br>
           </div>
</div>
		</div>

	</div>
	</div>
	</div>


	<div class="area-botoes" style="margin:0px auto;">

		<?php if($paymentMethod == 'CreditCard') : ?>
			<button class="envio" id="sendToMoip" type='submit'>Confirmar compra</button>
		<?php endif; ?>

		<button class="cancelar" onclick="javascript:didCancelPayment();">Cancelar compra</button>
	</div>

</form>


</body>
</html>