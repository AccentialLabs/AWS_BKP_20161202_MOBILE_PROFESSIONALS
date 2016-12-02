$(document).ready(function () {


    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";


});
var offer_history_ID = '';
function Click(id){
    var conditionsOffer = {
        'Checkout': {
            'conditions' : {
                'Checkout.id':id
            }
        }
    };
    var postDataOffer = JSON.stringify(conditionsOffer);

    postDataOffer = {
        'params': postDataOffer
    };
    var urlOffer = 'https://'+api+'/payments/get/first/' + createToken();


    $.ajax({
        method: "POST",
        url: urlOffer,
        data: postDataOffer

    }).done(function(result) {

        var objReturnOffer = JSON.parse(JSON.stringify(result));
        var decodeObjReturnOffer = Base64.decode(objReturnOffer);
        var convertedReturnOffer = JSON.parse(decodeObjReturnOffer);

        $.cookieStorage.set(convertedReturnOffer);



        if ($.cookieStorage.isSet('Checkout')) {
            window.location.href = "offer_detail.html";
        } else {

        }




    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}

$(document).ready(function() {
    sendRequest();
});
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
function EnviarBoleto(email, link){

    var url = 'https://'+ip+'/jezzy-mobile-professionals/public_html/php/mailerboleto.php';
    $.ajax({
        method: "POST",
        url: url,
        //data: postData
        data: {
            password:link,
            email:email
        }

    }).done(function(result) {
        //console.log(result);
        if(result!=''){
            window.location.href = 'boletoenviosuccess.html';
        }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });


}
function voltar(){
    window.history.go(-1);
}
function setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
}
function sendRequest() {
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var soma = '';
    var queryMENSAL1 = "SELECT * FROM secondary_users_commissioning_fees WHERE secondary_user_id = " + $.cookieStorage.get('SecondaryUser').id;

    var conditions1 = {
        'User':{
            'query':queryMENSAL1
        }
    };

    var postData1 = JSON.stringify(conditions1);

    postData1 = {
        'params': postData1
    };
    var url1 = 'https://'+api+'/users/get/query/' + createToken();


    $.ajax({
        method: "POST",
        url: url1,
        data: postData1,
        async: false
    }).done(function(result) {
        if(result != ''){
            var objReturns1 = JSON.parse(Base64.decode(result));

            $.cookieStorage.set(objReturns1[0]);

            var queryMENSAL = "SELECT users.name, checkouts.id, checkouts.total_value, checkouts.payment_state_id, checkouts.company_id, offers_extra_infos.offer_type, checkouts.date, offers.title FROM checkouts INNER JOIN offers ON offers.id = checkouts.offer_id INNER JOIN offers_extra_infos ON offers_extra_infos.offer_id = checkouts.offer_id INNER JOIN users ON checkouts.user_id = users.id WHERE  MONTH(checkouts.date) = "+((month/1)+1)+" and (checkouts.payment_state_id = 1 or checkouts.payment_state_id = 4) and comissioned_secondary_user_id = " + $.cookieStorage.get('SecondaryUser').id +" ORDER BY checkouts.date DESC";
            //console.log("---");
            //console.log(queryMENSAL);
            var conditions = {
                'User':{
                    'query':queryMENSAL
                }
            };

            var postData = JSON.stringify(conditions);

            postData = {
                'params': postData
            };
            var url = 'https://'+api+'/users/get/query/' + createToken();


            $.ajax({
                method: "POST",
                url: url,
                data: postData,
                async: false
            }).done(function(result) {
                if(result != ''){
                    var objReturn = JSON.parse(Base64.decode(result));
                    var offercheckout = '';
                    for(var i =0;i<objReturn.length;i++){
                        offercheckout = objReturn[i];


                        var queryMENSAL = "SELECT * FROM financial_parameters_results WHERE checkout_id = "+offercheckout.checkouts.id;
                        //console.log(queryMENSAL);
                        var conditions = {
                            'User':{
                                'query':queryMENSAL
                            }
                        };

                        var postData = JSON.stringify(conditions);

                        postData = {
                            'params': postData
                        };
                        var url = 'https://'+api+'/users/get/query/' + createToken();


                        $.ajax({
                            method: "POST",
                            url: url,
                            data: postData,
                            async: false
                        }).done(function(result) {

                            var objReturns = JSON.parse(Base64.decode(result));



                            if(offercheckout.offers_extra_infos.offer_type == 'PRODUCT'){
                                if(offercheckout.checkouts.company_id == '99999'){
                                    soma = monetary((objReturns[0].financial_parameters_results.vl_salao*($.cookieStorage.get('secondary_users_commissioning_fees').rate_per_jezzy_product/100))/1);
                                }else{
                                    soma =  monetary((objReturns[0].financial_parameters_results.vl_salao*($.cookieStorage.get('secondary_users_commissioning_fees').rate_per_company_product/100))/1);
                                }
                            }else{
                                soma =  monetary((objReturns[0].financial_parameters_results.vl_salao*($.cookieStorage.get('secondary_users_commissioning_fees').rate_per_service/100))/1);
                            }
                            var date = new Date(offercheckout.checkouts.date);
                            var status = '';
                            if(offercheckout.checkouts.payment_state_id == 4){
                                status = '<span class="badge" style="background-color: #008000;min-height: 8px;min-width: 5px;padding:3px 4px;"> </span>';
                            }else{
                                status = '<span class="badge" style="background-color: #ff0000;min-height: 8px;min-width: 5px;padding:3px 4px;"> </span>';
                            }
                                $("#Offer_History").append("<div class='col-xs-3 tablecontent' style='padding-top: 5%;'>"+offercheckout.users.name+"</div><div class='col-xs-4 tablecontent'>"+offercheckout.offers.title+"</div><div class='col-xs-3 tablecontent' style='padding-top: 5%;'>"+soma+"</div><div class='col-xs-2 tablecontent' style='padding-top: 5%;'>"+(status)+"</div> </div>");

                        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                           //alert(errorThrown);
                        });

                    }



                }else{
                    $("#Offer_History").append('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Sem histórico de vendas</div>');
                }

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
               //alert(errorThrown);
            });

        }else {


            $("#Offer_History").append('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Não há comissões!</div>'); // sem conf de comissão

        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
       //alert(errorThrown);
    });
}


function meuLog(msg) {
    div = document.body;

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