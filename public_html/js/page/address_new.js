$(document).ready(function() {
    $("#cep").mask("99999-999");
    var paganterior = document.referrer;
    console.log(paganterior);
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";

});
function preencher(){
    if(document.referrer == "https://"+ip+"/jezzy-mobile-professionals/public_html/my_profile.html") {
        $("#label1").attr('value', "Casa");
        $("#address").attr('value', $.cookieStorage.get('SecondaryUser').address);
        $("#bairro").attr('value', $.cookieStorage.get('SecondaryUser').district);
        $("#cep").attr('value', $.cookieStorage.get('SecondaryUser').zip_code);
        $("#complement").attr('value', $.cookieStorage.get('SecondaryUser').complement);
        $("#number").attr('value', $.cookieStorage.get('SecondaryUser').number);
        $("#city").attr('value', $.cookieStorage.get('SecondaryUser').city);
        $("#state").attr('value', $.cookieStorage.get('SecondaryUser').state);
    }
}
function VerificarFimDigitacaoCep(){
    var cep4 =  document.getElementById("cep").value;
    var cep2 = cep4.replace("-", " ");
    var cep3 = cep2.replace(" ", "");
    var cep5 = cep3.replace("_", " ");
    var cep = cep5.trim();
        if(cep.length == 8){
            var enviarcepparafuncao = cep.replace("-", " ");

            getEndereco(enviarcepparafuncao.trim());
        }else{
            $("#city").val("");
            $("#state").val("");
            $("#address").val("");
            $("#bairro").val("");
            document.getElementById("city").disabled = false;
            document.getElementById("state").disabled = false;
            document.getElementById("address").disabled = false;
            document.getElementById("bairro").disabled = false;

        }

}
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('address').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('city').value=("");
    document.getElementById('state').value=("");

}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('address').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('city').value=(conteudo.localidade);
        document.getElementById('state').value=(conteudo.uf);

    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        $("#loadingCep").html('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Aguardando preenchimento correto do CEP</div>');
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('address').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('city').value="...";
            document.getElementById('state').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();

            $("#loadingCep").html('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Aguardando preenchimento correto do CEP</div>');
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
function getEndereco(cep1) {
    var cep2 = cep1.replace("-", " ");
    var cep5 = cep2.replace(" ", "");
    var cep = cep5.replace("_", " ");

    if($.trim(cep) != "" && ($.trim(cep)).length == 8){
        var ceptrm = cep.trim();
        pesquisacep(ceptrm);
    } else{

    }
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
function mensagem(){

    generateModalAlert("Endereço Atualizado");
    $('#mymodal').modal('show');

    if(document.referrer == "https://"+ip+"/jezzy-mobile-professionals/public_html/my_profile.html"){
        var conditionsSave = {

            'User': {

                'id': $.cookieStorage.get('SecondaryUser').id,
                'label': document.getElementById("label1").value,
                'address':document.getElementById("address").value,
                'number':document.getElementById("number").value,
                'complement': document.getElementById("complement").value,
                'district': document.getElementById("bairro").value,
                'city':document.getElementById("city").value,
                'state':document.getElementById("state").value,
                'zip_code':document.getElementById("cep").value,
                'email':$.cookieStorage.get('SecondaryUser').email,
                'name':$.cookieStorage.get('SecondaryUser').name
            }
        };

        var postDataSave = JSON.stringify(conditionsSave);

        postDataSave = {
            'params': postDataSave
        };

        var urlSave = 'https://'+api+'/users/save/first/' + createToken();

        $.ajax({
            method: "POST",
            url: urlSave,
            data: postDataSave

        }).done(function (result) {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = JSON.parse(decodeObjReturn);

		  window.location.href = 'my_profile.html';

          





        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });
    } else {

    var conditionsInserirEnderecoAdicional = {

        'AditionalAddressesUser': {

            'user_id': $.cookieStorage.get('SecondaryUser').id,
            'label': document.getElementById("label1").value,
            'address':document.getElementById("address").value,
            'number':document.getElementById("number").value,
            'complement': document.getElementById("complement").value,
            'district': document.getElementById("bairro").value,
            'city':document.getElementById("city").value,
            'state':document.getElementById("state").value,
            'zip_code':document.getElementById("cep").value

                    }
    };

    var postDataInserirEnderecoAdicional = JSON.stringify(conditionsInserirEnderecoAdicional);

    postDataInserirEnderecoAdicional = {
        'params': postDataInserirEnderecoAdicional
    };

    var urlInserirEnderecoAdicional = 'https://'+api+'/users/save/first/' + createToken();

    $.ajax({
        method: "POST",
        url: urlInserirEnderecoAdicional,
        data: postDataInserirEnderecoAdicional

    }).done(function (result) {


        window.location.href="../../jezzy-mobile-professionals/public_html/address_list.html";



    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

    }

}


