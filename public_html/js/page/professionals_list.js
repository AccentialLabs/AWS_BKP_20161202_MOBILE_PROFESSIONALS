var company_id = "";
var subclass_id = "";
var service_id = " ";
$(document).ready(function () {
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";
    company_id = $.cookieStorage.get('Company').id;
    subclass_id = $.cookieStorage.get('subclasses').id;
    SendRequest();
});
function Click(professional){
    console.log(professional);
    $.cookieStorage.set(professional);

    if ($.cookieStorage.isSet('secondary_users')) {
        window.location.href = "agenda-views.html";
    } else {
        generateModalAlert("Erro ao salvar Cookie");
        $('#mymodal').modal('show');
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
function SendRequest() {
    var conditionsservice = {
        'General': {
            'query':  'SELECT * FROM services where subclasse_id =' + subclass_id + ' and companie_id = ' + company_id
        }
    };
    console.log(conditionsservice);
    var postDataservices = JSON.stringify(conditionsservice);
    postDataservices = {
        'params': postDataservices
    };
    var urlservices = 'https://'+api+'/General/get/query/' + createToken();
    $.ajax({
        method: "POST",
        url: urlservices,
        data: postDataservices
    }).done(function (result) {
        if(result == "ImE6MDp7fSI"){

            $("#ProfessionalList").append("</br><div class='row centerLogoJezzy subtitle'>Empresa atualmente sem profissionais cadastrados para este serviço</div>");

        } else{
            var objReturnservices = JSON.parse(JSON.stringify(result));
            var decodeObjReturnservices = Base64.decode(objReturnservices);
            var convertedReturnservices = unserialize(JSON.parse(decodeObjReturnservices));

            for(var i=0; i<convertedReturnservices.length;i++){
              var service = convertedReturnservices[i];

                service_id = convertedReturnservices[i].services.id;
            }

            var conditions = {
                'General': {
                    'query':  'SELECT * FROM service_secondary_users LEFT OUTER JOIN secondary_users ON secondary_users.id = service_secondary_users.secondary_user_id LEFT OUTER JOIN companies ON companies.id = secondary_users.company_id WHERE secondary_users.company_id =' + company_id + ' and service_secondary_users.service_id =' + service_id + ' and secondary_users.excluded = 0 GROUP BY secondary_users.id'
                }
            };
            console.log(conditions);
            var postData = JSON.stringify(conditions);

            postData = {
                'params': postData
            };
            var url = 'https://'+api+'/General/get/query/' + createToken();


            $.ajax({
                method: "POST",
                url: url,
                data: postData
            }).done(function (result) {
                if(result == "ImE6MDp7fSI="){

                    $("#ProfessionalList").append("</br><div class='row centerLogoJezzy subtitle'>Empresa atualmente sem profissionais cadastrados para este serviço</div>");

                } else{
                    var objReturn = JSON.parse(JSON.stringify(result));
                    var decodeObjReturn = Base64.decode(objReturn);
                    var convertedReturn = unserialize(JSON.parse(decodeObjReturn));

                    var resultado = " ";

                    for (var i = 0; i < convertedReturn.length; i++) {
                        resultado = convertedReturn[i];
                        var resultparametro = JSON.stringify(resultado);
                        $("#ProfessionalList").append("<div class='row centerLogoJezzy'  onclick='Click("+resultparametro+");'><div class='col-xs-12  marginTop20'><div class='fotousuario col-xs-4'><img src='"+icons+"Foto%20do%20usuario%20-%2002.png' onclick='Click("+resultparametro+");' class='fotousuario'></div><div class='col-xs-8 subtitle' onclick='Click("+resultparametro+");'><span>"+ resultado.secondary_users.name + '<br>' + resultado.companies.fancy_name+"</span></div></div> </div> <div class='bottomLine1'></div>");
                    }
                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });



        }
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


