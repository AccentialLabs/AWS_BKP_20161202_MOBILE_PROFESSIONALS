var id = '';

$(document).ready(function() {
    $("#offerImage").attr('src', 'https://'+ip+'/uploads/loading/14017858_10210089587742018_1484715137_n.gif');
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";
    document.getElementById("BtnPagamentoAviso").innerText = "ESCOLHA METRICAS DO PRODUTO";
    if ($.cookieStorage.get('paginaanterior') == "https://'+ip+'/jezzy-mobile-professionals/public_html/home.html") {
        id = $.cookieStorage.get('Offer').id;
    } else {
        id = $.cookieStorage.get('Offer').id;
    }



    function generateModalAlert(mensagem) {
        if ($("#mymodal").length) {
            $("#messageModelGoesHere").html(mensagem);
        } else {
            $modalHtml =
                '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="mymodal">'
                + '<div class="modal-dialog modal-sm">'
                + '<div class="modal-content" id="messageModelGoesHere">'
                + mensagem
                + '</div>'
                + '</div>'
                + '</div>';
            $("body").append($modalHtml);
        }
    }


    function generateModalAlert2(mensagem) {
        if ($("#mymodal").length) {
            $("#messageModelGoesHere").html(mensagem);
        } else {
            $modalHtml =
                '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="mymodal">'
                + '<div class="modal-dialog modal-sm">'
                + '<div class="modal-content2" id="messageModelGoesHere">'
                + mensagem
                + '</div>'
                + '</div>'
                + '</div>';
            $("body").append($modalHtml);
        }
    }
    sendRequest();



    $("#BtnPagamentoAviso").click(function () {
        if (document.getElementById("BtnPagamentoAviso").innerText == "REALIZAR PAGAMENTO") {

            var query = "SELECT * FROM companies Company WHERE id =" + $.cookieStorage.get('Offer').company_id;

            var conditions = {
                'General': {
                    'query':query
                }
            };

            var postData = JSON.stringify(conditions);

            postData = {
                'params': postData
            };
            var url = 'https://'+api+'/General/get/query/' + createToken();

            $.ajax({
                method: "POST",
                url: url,
                data: postData

            }).done(function(result) {

                if(result != "ImE6MDp7fSI=") {
                    var objReturn = JSON.parse(JSON.stringify(result));
                    var decodeObjReturn = Base64.decode(objReturn);
                    var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
                    for(var i=0; i<convertedReturn.length;i++){

                        var compania = convertedReturn[i];


                        var total = $("#totalValue").html();


                        var checkout = new Object();
                        var checkoutarray = new Array();
                        checkout.total_value = total;
                        checkout.shipping_value = '0.00';
                        checkout.shipping_type = 4000;
                        if($.cookieStorage.get('Offer').metrics != ''){
                            var metrics = $("#OfferMetrics").val();
                            var radios = document.getElementsByName("metrics");
                            for (var i = 0; i < radios.length; i++) {

                                if(radios[i].checked == true){
                                    metrics = radios[i].value;
                                }else{
                                    metrics = '';
                                }
                            }

                            var metrics2 = $("#OfferMetrics2").val();
                            var radios2 = document.getElementsByName("metrics2");
                            for (var j = 0; j < radios2.length; j++) {

                                if(radios2[j].checked == true){
                                    metrics2 = radios2[j].value;
                                }else{
                                    metrics2 = '';
                                }
                            }
                        }

                        checkout.metrics = metrics + "," + metrics2;
                        checkout.address = compania.Company.address;
                        checkout.number = compania.Company.number;
                        checkout.zip_code = compania.Company.zip_code;
                        checkout.city = compania.Company.city;
                        checkout.complement = compania.Company.complement;
                        checkout.district = compania.Company.district;
                        checkout.state =compania.Company.state;
                        checkout.shipping_days = 0;
                        checkout.quantidade = $("#quantProductValue").html();
                        checkoutarray[0] = checkout;



                        var Check = checkoutarray[0];
                        var checkoutsave = (JSON.stringify(Check));
                        var variavel = (JSON.parse(checkoutsave));
                        console.log(variavel);
                        $.cookieStorage.set(variavel);




                        window.location.href = "payment.html";



                    }
                }
            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });

        } else if(document.getElementById("BtnPagamentoAviso").innerText == "AVISE-ME QUANDO CHEGAR") {
            $("#BtnPagamentoAviso").addClass('hide');
            document.getElementById("emailAviso").value = $.cookieStorage.get('SecondaryUser').email;
            document.getElementById("emailAviso").display = 'hidden';
            document.getElementById("BtnPagamentoAvisoSuccess").click();
            $("#BtnPagamentoAviso").removeClass('hide');
            $("#BtnPagamentoAviso").text('VOLTAR');
        } else if(document.getElementById("BtnPagamentoAviso").innerText == "VOLTAR") {
            window.location.href = 'home.html';
        }

    });

    $("#BtnPagamentoAvisoSuccess").click(function () {
        var email = document.getElementById("emailAviso").value;
        if(email == ""){
            generateModalAlert("Insira um e-mail");
            $('#mymodal').modal('show');
        } else
            generateModalAlert("Você será um e-mail no endereço: " + email);
        $('#mymodal').modal('show', function(){
            window.location.href = 'home.html';
        });
    })


});
function VerificaEstoque(){
    if( document.getElementById("BtnPagamentoAviso").innerText == "AVISE-ME QUANDO CHEGAR"){

    } else{
            if(document.getElementById('DisponibilidadeEstoque').innerHTML == undefined){
                document.getElementById("BtnPagamentoAviso").innerText = "ESCOLHA MÉTRICAS DO PRODUTO";

            } else{
                $("#BtnPagamentoAviso").text("REALIZAR PAGAMENTO");
            }



    }
}
function mostrarmaismetrics(Y_Name){

    $("#DisponibilidadeEstoque").html("");

    var querymetrics =  "select * from offers_metrics inner join offers_domains offery on offery.id = offers_metrics.offer_metrics_y_id inner join offers_attributes offers_attributesy on offers_attributesy.id = offery.offer_attribute_id inner join offers_domains offerx on offerx.id = offers_metrics.offer_metrics_x_id inner join offers_attributes offers_attributesx on offers_attributesx.id = offerx.offer_attribute_id where offer_id =" + $.cookieStorage.get('Offer').id + " and offery.name = '" + Y_Name + "'";

    console.log(querymetrics);
    var conditionsMetrics={
        'General': {
            'query': querymetrics
        }
    };
    var postDataMetrics = JSON.stringify(conditionsMetrics);

    postDataMetrics = {
        'params': postDataMetrics
    };

    var urlMetrics = 'https://'+api+'/General/get/query/' + createToken();


    $.ajax({
        method: "POST",
        url: urlMetrics,
        data: postDataMetrics
    }).done(function (result) {
        if(result!= 'ImE6MDp7fSI=') {
            var objReturnMetrics = JSON.parse(JSON.stringify(result));
            var decodeObjReturnMetrics = Base64.decode(objReturnMetrics);
            var convertedReturnMetrics = unserialize(JSON.parse(decodeObjReturnMetrics));
            var offerMetrics2 = "";
            for(var j=0;j<convertedReturnMetrics.length;j++){
                var MetricsSepareted2 = convertedReturnMetrics[j].offerx.name;
                document.getElementById("BtnPagamentoAviso").innerText = "ESCOLHA METRICAS DO PRODUTO";
                $("#OfferMetrics2").html(" ");
                var isColor =  MetricsSepareted2.search("#");
                if(isColor == 0){
                    offerMetrics2 += "<input type='radio' name='metrics2' class='btn btn-primary btn-xs' id='" + convertedReturnMetrics[j].offerx.id + "'  onclick='mostrarestoque(\""+convertedReturnMetrics[j].offerx.name+"\",\""+Y_Name+"\");' value=" + MetricsSepareted2 + "><i style='border: 1px solid white; background-color: "+MetricsSepareted2+"; margin-top:5%; padding-left:10px; padding-right:10px'></i>" ;
                } else if(isColor == -1) {
                    offerMetrics2 += "<input type='radio' name='metrics2' class='btn btn-primary btn-xs' id='" + convertedReturnMetrics[j].offerx.id + "'  onclick='mostrarestoque(\""+convertedReturnMetrics[j].offerx.name+"\",\""+Y_Name+"\");' value=" + MetricsSepareted2 + ">" + MetricsSepareted2;
                }
            }

            if($.cookieStorage.get('Offer').metrics != "" && $.cookieStorage.get('Offer').metrics != "," && $.cookieStorage.get('Offer').metrics != "''" ){ //metricas dinamicas

                $("#OfferMetrics2").append(offerMetrics2);

            }



        }



    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
function mostrarestoque(Y_Name, X_Name){

    var querymetrics =  "select * from offers_metrics inner join offers_domains offery on offery.id = offers_metrics.offer_metrics_y_id inner join offers_attributes offers_attributesy on offers_attributesy.id = offery.offer_attribute_id inner join offers_domains offerx on offerx.id = offers_metrics.offer_metrics_x_id inner join offers_attributes offers_attributesx on offers_attributesx.id = offerx.offer_attribute_id where offer_id =" + $.cookieStorage.get('Offer').id + " and offery.name = '" + X_Name + "' and offerx.name = '" + Y_Name + "'";


    var conditionsMetrics={
        'General': {
            'query': querymetrics
        }
    };
    var postDataMetrics = JSON.stringify(conditionsMetrics);

    postDataMetrics = {
        'params': postDataMetrics
    };

    var urlMetrics = 'https://'+api+'/General/get/query/' + createToken();


    $.ajax({
        method: "POST",
        url: urlMetrics,
        data: postDataMetrics
    }).done(function (result) {
        if(result!= 'ImE6MDp7fSI=') {

            var objReturnMetrics = JSON.parse(JSON.stringify(result));
            var decodeObjReturnMetrics = Base64.decode(objReturnMetrics);
            var convertedReturnMetrics = unserialize(JSON.parse(decodeObjReturnMetrics));

            for(var j=0;j<convertedReturnMetrics.length;j++){
                var Amount = convertedReturnMetrics[j].offers_metrics.amount;
                var quantidadedeprodutos = 1;

                if((Amount/1) == 0){

                    $("#DisponibilidadeEstoque").append('Produto indisponível em estoque.');
                    $("#BtnPagamentoAviso").append("AVISE-ME QUANDO CHEGAR");


                } else {

                    $("#DisponibilidadeEstoque").html("");
                    $("#BtnAddEndereco").html("");
                    $("#DisponibilidadeEstoque").append("Quantidade<br/> <button type='button' class='btn btn-primary btn-xs textbuttom' id='ProductQuantPlus'>+</button> <button type='button' class='btn btn-primary btn-xs textbuttomValue' id='quantProductValue'>1</button> <button type='button' class='btn btn-primary btn-xs textbuttom' id='ProductQuantMinus'>-</button>");
                    VerificaEstoque(); //metricas dinamicas

                    $("#BtnAddEndereco").append("<button type='button' class='btn btn-info btn-block'>ALTERAR ENDEREÇO DE ENTREGA</button>");



                    $("#ProductQuantPlus").click(function () {
                        if (quantidadedeprodutos < Amount / 1) {
                            $("#quantProductValue").empty();
                            quantidadedeprodutos = quantidadedeprodutos / 1 + 1;
                            $("#quantProductValue").append(quantidadedeprodutos);
                            if(document.getElementById("sendValue") == null|| document.getElementById("sendValue").innerText == "Não foi possível calcular o valor do frete!" || document.getElementById("sendValue") == undefined){
                                var totalvaluesemfrete = document.getElementById("offerNewPrice").innerText;
                                var totalvaluemonetarysemfrete =  totalvaluesemfrete.split("R$");
                                var totalvalueatualizadosemfrete  = totalvaluemonetarysemfrete[1].replace(",", ".");
                                var totalvalueatualizado2semfrete = parseFloat(totalvalueatualizadosemfrete);
                                var totalsomacomquantidadedeprodutossemfrete = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos));
                                $("#totalValue").text(totalsomacomquantidadedeprodutossemfrete);
                                var oi = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos)/$.cookieStorage.get('Offer').parcels_quantity);
                                $("#parcelsValue").text("");
                                if($.cookieStorage.get('Offer').parcels=="ACTIVE"){
                                    $("#parcelsValue").append("em até "+ $.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                }

                            }else {

                                var totalvalue = document.getElementById("offerNewPrice").innerText;
                                var totalvaluefrete = document.getElementById("sendValue").innerText;
                                var totalvaluemonetaryfrete = totalvaluefrete.split('R$');
                                var totalvaluemonetary = totalvalue.split('R$');
                                var totalvalueatualizadofrete = totalvaluemonetaryfrete[1].replace(",", ".");
                                var totalvalueatualizado = totalvaluemonetary[1].replace(",", ".");
                                var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                                var totalvalueatualizado2 = parseFloat(totalvalueatualizado);
                                var totalsomacomquantidadedeprodutos = monetary((totalvalueatualizado2 * quantidadedeprodutos) + totalvalueatualizado2frete);
                                $("#totalValue").text(totalsomacomquantidadedeprodutos);
                                var oi = monetary(((totalvalueatualizado2 * quantidadedeprodutos) + totalvalueatualizado2frete) / $.cookieStorage.get('Offer').parcels_quantity);
                                $("#parcelsValue").text("");
                                if ($.cookieStorage.get('Offer').parcels == "ACTIVE") {
                                    $("#parcelsValue").append("em até "+ $.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                }

                            }
                        }else {
                            generateModalAlert("Desculpe, há somente " + quantidadedeprodutos + " produto(s) em estoque!");
                            $('#mymodal').modal('show');
                        }

                    });

                    $("#ProductQuantMinus").click(function () {
                        if (quantidadedeprodutos > 1) {
                            $("#quantProductValue").empty();
                            quantidadedeprodutos = quantidadedeprodutos / 1 - 1;
                            $("#quantProductValue").append(quantidadedeprodutos);
                            if(document.getElementById("sendValue") == undefined  || document.getElementById("sendValue") == null  || document.getElementById("sendValue").innerText == "Não foi possível calcular o valor do frete!"){
                                var totalvaluesemfrete = document.getElementById("offerNewPrice").innerText;
                                var totalvaluemonetarysemfrete =  totalvaluesemfrete.split("R$");
                                var totalvalueatualizadosemfrete  = totalvaluemonetarysemfrete[1].replace(",", ".");
                                var totalvalueatualizado2semfrete = parseFloat(totalvalueatualizadosemfrete);
                                var totalsomacomquantidadedeprodutossemfrete = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos));
                                $("#totalValue").text(totalsomacomquantidadedeprodutossemfrete);
                                var oi = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos)/$.cookieStorage.get('Offer').parcels_quantity);
                                $("#parcelsValue").text("");
                                if($.cookieStorage.get('Offer').parcels=="ACTIVE"){
                                    $("#parcelsValue").append("em até "+ $.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                }

                            }else{
                                var totalvalue = document.getElementById("offerNewPrice").innerText;
                                var totalvaluefrete = document.getElementById("sendValue").innerText;
                                var totalvaluemonetaryfrete = totalvaluefrete.split("R$");
                                var totalvaluemonetary = totalvalue.split("R$");
                                var totalvalueatualizadofrete = totalvaluemonetaryfrete[1].replace(",", ".");
                                var totalvalueatualizado = totalvaluemonetary[1].replace(",", ".");
                                var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                                var totalvalueatualizado2 = parseFloat(totalvalueatualizado);
                                var totalsomacomquantidadedeprodutos = monetary((totalvalueatualizado2 * quantidadedeprodutos));
                                $("#totalValue").text(totalsomacomquantidadedeprodutos);
                                var oi = monetary(((totalvalueatualizado2 * quantidadedeprodutos) + totalvalueatualizado2frete) / $.cookieStorage.get('Offer').parcels_quantity);
                                $("#parcelsValue").text("");

                                if ($.cookieStorage.get('Offer').parcels == "ACTIVE") {
                                    $("#parcelsValue").append("em até "+ $.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                }

                            }

                        }
                    });


                }




            }



        }



    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}





function meuLog(msg) {
    span = document.body;
}
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

};


function sendRequest() {

    var conditions = {
        'Offer': {
            'conditions': {
                'Offer.id': id
            }
        }
    };
    var conditionsUser={
        'User': {
            'conditions': {
                'User.id':  $.cookieStorage.get('SecondaryUser').id
            }
        }
    };
    var postDataUser = JSON.stringify(conditionsUser);
    postDataUser = {
        'params': postDataUser
    };
    var urlUser = 'https://'+api+'/users/get/first/' + createToken();

    var postData = JSON.stringify(conditions);
    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/offers/get/first/' + createToken();


    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {

        $.ajax({
            method: "POST",
            url: urlUser,
            data: postDataUser
        }).done(function (result1) {


            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = JSON.parse(decodeObjReturn);
            var objReturnUser = JSON.parse(JSON.stringify(result1));
            var decodeObjReturnUser = Base64.decode(objReturnUser);
            var convertedReturnUser = JSON.parse(decodeObjReturnUser);
            var titulo = convertedReturn.Offer.title;
            var tituloMaiusculo = titulo.toUpperCase();



            if(convertedReturn.Offer.photo!=""){
                $("#offerImage").attr('src', convertedReturn.Offer.photo);
            }else{
                $("#offerImage").attr('src', icons+'ImagemIndisponivel2.png');
            }


            $("#offerName").append(tituloMaiusculo);
            $("#offerNameSubTitle").append(convertedReturn.Offer.title);
            var arredondaOldPrice =convertedReturn.Offer.value;

            var linhaoldprice = arredondaOldPrice.replace(".", ",");
            meuLog(linhaoldprice);
            if(convertedReturn.Offer.percentage_discount != 0){
                $("#unitValue").append("R$" + linhaoldprice+"<br>");
            }else{
                $("#unitValue").append('');
                $("#unitValueLabel").html('');
                $("#offerNewPriceLabel").html('Valor:');
                document.getElementById("offerNewPriceLabel").style.fontSize = "16px";
                document.getElementById("offerNewPrice").style.fontSize = "15px";
            }

            var valorComDesconto = (convertedReturn.Offer.value/100)*(100-convertedReturn.Offer.percentage_discount);

            var arredondado = valorComDesconto.toFixed(2);
            var linha = arredondado.replace(".", ",");
            meuLog(linha);
            $("#offerNewPrice").append("R$" + linha);
            $("#totalValue").append("R$"+linha+"<br>");
            var parcelas = valorComDesconto/$.cookieStorage.get('Offer').parcels_quantity;
            var parcelasarredondado = parcelas.toFixed(2);
            var linhaparcelas = parcelasarredondado.replace(".", ",");
            meuLog(linhaparcelas);
            if(convertedReturn.Offer.parcels=="ACTIVE"){
                $("#parcelsValue").append("em até "+ $.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito."+"<br>");
            }
            $("#textOffer").append(convertedReturn.Offer.resume);
            $("#offerCode").append(convertedReturn.Offer.id);
            var querymetrics =  "select distinct offery.name from offers_metrics inner join offers_domains offery on offery.id = offers_metrics.offer_metrics_y_id inner join offers_attributes offers_attributesy on offers_attributesy.id = offery.offer_attribute_id inner join offers_domains offerx on offerx.id = offers_metrics.offer_metrics_x_id inner join offers_attributes offers_attributesx on offers_attributesx.id = offerx.offer_attribute_id where offer_id =" + $.cookieStorage.get('Offer').id;


            var conditionsMetrics={
                'General': {
                    'query': querymetrics
                }
            };
            var postDataMetrics = JSON.stringify(conditionsMetrics);

            postDataMetrics = {
                'params': postDataMetrics
            };

            var urlMetrics = 'https://'+api+'/General/get/query/' + createToken();


            $.ajax({
                method: "POST",
                url: urlMetrics,
                data: postDataMetrics
            }).done(function (result) {
                if(result!= 'ImE6MDp7fSI='){

                    var objReturnMetrics = JSON.parse(JSON.stringify(result));
                    var decodeObjReturnMetrics = Base64.decode(objReturnMetrics);
                    var convertedReturnMetrics = unserialize(JSON.parse(decodeObjReturnMetrics));
                    var offerMetrics ="";
                    console.log(convertedReturnMetrics);
                    for(var j=0;j<convertedReturnMetrics.length;j++){
                        var MetricsSepareted = convertedReturnMetrics[j].offery.name;
                        var isColor =  MetricsSepareted.search("#");
                        if(isColor == 0){
                            offerMetrics += "<input type='radio' name='metrics' class='btn btn-primary btn-xs' id='" + convertedReturnMetrics[j].offerx.id + "' onclick='mostrarmaismetrics(\""+convertedReturnMetrics[j].offery.name+"\");' value=" + MetricsSepareted + "><i style='border: 1px solid white; background-color: "+MetricsSepareted+"; margin-top:5%; padding-left:10px; padding-right:10px'></i>" ;
                        } else if(isColor == -1) {
                            offerMetrics += '<input type="radio" name="metrics" class="btn btn-primary btn-xs" onclick="mostrarmaismetrics(\''+convertedReturnMetrics[j].offery.name+'\');"  value='+MetricsSepareted+'>'+MetricsSepareted;
                        }

                    }

                    if(convertedReturn.Offer.metrics!=""){ //metricas dinamicas
                        $("#OfferMetrics").append(offerMetrics);
                    }


                }else{
                    var quantidadedeprodutos = 1;
                    if((convertedReturn.Offer.amount_allowed/1) == 0){
                        $("#DisponibilidadeEstoque").append('Produto indisponível em estoque.');
                        $("#BtnPagamentoAviso").append("AVISE-ME QUANDO CHEGAR");


                    } else {

                        $("#DisponibilidadeEstoque").append("Quantidade<br/> <button type='button' class='btn btn-primary btn-xs textbuttom' id='ProductQuantPlus'>+</button> <button type='button' class='btn btn-primary btn-xs textbuttomValue' id='quantProductValue'>1</button> <button type='button' class='btn btn-primary btn-xs textbuttom' id='ProductQuantMinus'>-</button>");
                        VerificaEstoque(); //metricas dinamicas


                        $("#BtnAddEndereco").append("<button type='button' class='btn btn-info btn-block'>ALTERAR ENDEREÇO DE ENTREGA</button>");



                        $("#ProductQuantPlus").click(function () {
                            if (quantidadedeprodutos < convertedReturn.Offer.amount_allowed / 1) {
                                $("#quantProductValue").empty();
                                quantidadedeprodutos = quantidadedeprodutos / 1 + 1;
                                $("#quantProductValue").append(quantidadedeprodutos);


                                var totalvaluesemfrete = document.getElementById("offerNewPrice").innerText;
                                var totalvaluemonetarysemfrete =  totalvaluesemfrete.split("R$");
                                var totalvalueatualizadosemfrete  = totalvaluemonetarysemfrete[1].replace(",", ".");
                                var totalvalueatualizado2semfrete = parseFloat(totalvalueatualizadosemfrete);
                                var totalsomacomquantidadedeprodutossemfrete = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos));
                                $("#totalValue").text(totalsomacomquantidadedeprodutossemfrete);
                                var oi = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos)/$.cookieStorage.get('Offer').parcels_quantity);
                                $("#parcelsValue").text("");
                                if(convertedReturn.Offer.parcels=="ACTIVE"){
                                    $("#parcelsValue").append("em até  "+ $.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                }


                            }else {
                                generateModalAlert("Desculpe, há somente " + quantidadedeprodutos + " produto(s) em estoque!");
                                $('#mymodal').modal('show');
                            }

                        });

                        $("#ProductQuantMinus").click(function () {
                            if (quantidadedeprodutos > 1) {
                                $("#quantProductValue").empty();
                                quantidadedeprodutos = quantidadedeprodutos / 1 - 1;
                                $("#quantProductValue").append(quantidadedeprodutos);
                                var totalvaluesemfrete = document.getElementById("offerNewPrice").innerText;
                                var totalvaluemonetarysemfrete =  totalvaluesemfrete.split("R$");
                                var totalvalueatualizadosemfrete  = totalvaluemonetarysemfrete[1].replace(",", ".");
                                var totalvalueatualizado2semfrete = parseFloat(totalvalueatualizadosemfrete);
                                var totalsomacomquantidadedeprodutossemfrete = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos));
                                $("#totalValue").text(totalsomacomquantidadedeprodutossemfrete);
                                var oi = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos)/$.cookieStorage.get('Offer').parcels_quantity);
                                $("#parcelsValue").text("");
                                if(convertedReturn.Offer.parcels=="ACTIVE"){
                                    $("#parcelsValue").append("em até  "+ $.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                }





                            }
                        });


                    }
                }

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });

        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });




}

function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}

function generateModalAlert(mensagem) {
    if ($("#mymodal").length) {
        $("#messageModelGoesHere").html(mensagem);
    } else {
        $modalHtml =
            '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="mymodal">'
            + '<div class="modal-dialog modal-sm">'
            + '<div class="modal-content" id="messageModelGoesHere">'
            + mensagem
            + '</div>'
            + '</div>'
            + '</div>';
        $("body").append($modalHtml);
    }
}
function voltar(){
    window.history.go(-1);
}
