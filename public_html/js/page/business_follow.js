var favorite_id = '';
$(document).ready(function () {
    localStorage.removeItem('FavCompany');
    $("#scroll").click(function(){
        $("html, body").animate({
            scrollTop: 0
        }, 100);
    });
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";
    sendRequest();


    $('#userName').click(function () {
        window.location.href = "../../jezzy-mobile-professionals/public_html/my_profile.html";
    });
    $("#container").click(function(e){
    $("#text-search")[0].value = "";
    $("#nav-collapse3").removeClass("in");
    Search();
       

      
    });

   
});
function Limpar(){

    $("#text-search")[0].value = "";
    Search();

}
function Click(business){

    $.cookieStorage.set(business);



    generateModalAlert($.cookieStorage.get('Company').id);

    $('#mymodal').modal('show');

    if ($.cookieStorage.isSet('Company')) {

        window.location.href = "bussiness_detail.html";

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
function mostrar(id){

}

function SelecaoPreferida(id){
    var query = "SELECT * FROM favorites_companies WHERE company_id = "+id+" and user_id  = "+$.cookieStorage.get('SecondaryUser').id ;

    var conditionsD = {
        'General': {
            'query' : query
        }
    };

    var postDataD = JSON.stringify(conditionsD);
    postDataD = {
        'params': postDataD
    };

    var urlD = 'https://'+api+'/General/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: urlD,
        data: postDataD
    }).done(function (result) {
        if(result == "ImE6MDp7fSI="){
            var query = "INSERT INTO favorites_companies (company_id, user_id) VALUES ("+id+","+$.cookieStorage.get('SecondaryUser').id+" );";

            var conditionsD = {
                'General': {
                    'query' : query
                }
            };

            var postDataD = JSON.stringify(conditionsD);
            postDataD = {
                'params': postDataD
            };

            var urlD = 'https://'+api+'/General/get/query/' + createToken();

            $.ajax({
                method: "POST",
                url: urlD,
                data: postDataD
            }).done(function (result) {
                if(result != "ImE6MDp7fSI="){

                }else{



                }

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
        }else{
            var query = "UPDATE favorites_companies SET company_id= " +id+" WHERE user_id = " +$.cookieStorage.get('SecondaryUser').id;

            var conditionsD = {
                'General': {
                    'query' : query
                }
            };

            var postDataD = JSON.stringify(conditionsD);
            postDataD = {
                'params': postDataD
            };

            var urlD = 'https://'+api+'/General/get/query/' + createToken();

            $.ajax({
                method: "POST",
                url: urlD,
                data: postDataD
            }).done(function (result) {
                if(result != "ImE6MDp7fSI="){

                }else{



                }

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });




        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });



}

function Search(){
    var search = (document.getElementById("text-search").value);


    var conditions = {
        'Company': {
            'conditions': {
            }
        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/companies/get/all/' + createToken();


    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if(result == ""){
            window.location.href = "bussiness_list.html";
        }else{
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = JSON.parse(decodeObjReturn);
            var stringobj = "";
            var resultado = " ";

            for (var i = 0; i < convertedReturn.length; i++) {
                resultado = convertedReturn[i];
                var valorDaDiv = ($("#id"+resultado.Company.id).text());



                var midstring;

                var search2 = search.toUpperCase();
                var valorDaDiv2 = valorDaDiv.toUpperCase();

                if (valorDaDiv2.search(search2) != -1) {
                    midstring = 'ENCONTRADO ';
                    $("#id"+resultado.Company.id).removeClass('hide');
                    $(".bottomLine2").addClass('hide');
                } else {
                    midstring = 'NÃO ENCONTRADO ';
                    $("#id"+resultado.Company.id).addClass('hide');
                    $(".bottomLine2").addClass('hide');
                }



            }
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
function unserialize (data) {
    //  discuss at: http://phpjs.org/functions/unserialize/
    // original by: Arpad Ray (mailto:arpad@php.net)
    // improved by: Pedro Tainha (http://www.pedrotainha.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Chris
    // improved by: James
    // improved by: Le Torbi
    // improved by: Eli Skeggs
    // bugfixed by: dptr1988
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //  revised by: d3x
    //    input by: Brett Zamir (http://brett-zamir.me)
    //    input by: Martin (http://www.erlenwiese.de/)
    //    input by: kilops
    //    input by: Jaroslaw Czarniak
    //        note: We feel the main purpose of this function should be to ease the transport of data between php & js
    //        note: Aiming for PHP-compatibility, we have to translate objects to arrays
    //   example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
    //   returns 1: ['Kevin', 'van', 'Zonneveld']
    //   example 2: unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
    //   returns 2: {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}

    var that = this,
        utf8Overhead = function (chr) {
            // http://phpjs.org/functions/unserialize:571#comment_95906
            var code = chr.charCodeAt(0)
            if (code < 0x0080 || 0x00A0 <= code && code <= 0x00FF || [338, 339, 352, 353, 376, 402, 8211, 8212, 8216, 8217,
                    8218, 8220, 8221, 8222, 8224, 8225, 8226, 8230, 8240, 8364, 8482
                ].indexOf(code) != -1) {
                return 0
            }
            if (code < 0x0800) {
                return 1
            }
            return 2
        }
    error = function (type, msg, filename, line) {
        throw new that.window[type](msg, filename, line)
    }
    read_until = function (data, offset, stopchr) {
        var i = 2,
            buf = [],
            chr = data.slice(offset, offset + 1)

        while (chr != stopchr) {
            if ((i + offset) > data.length) {
                error('Error', 'Invalid')
            }
            buf.push(chr)
            chr = data.slice(offset + (i - 1), offset + i)
            i += 1
        }
        return [buf.length, buf.join('')]
    }
    read_chrs = function (data, offset, length) {
        var i, chr, buf

        buf = []
        for (i = 0; i < length; i++) {
            chr = data.slice(offset + (i - 1), offset + i)
            buf.push(chr)
            length -= utf8Overhead(chr)
        }
        return [buf.length, buf.join('')]
    }
    _unserialize = function (data, offset) {
        var dtype, dataoffset, keyandchrs, keys, contig,
            length, array, readdata, readData, ccount,
            stringlength, i, key, kprops, kchrs, vprops,
            vchrs, value, chrs = 0,
            typeconvert = function (x) {
                return x
            }

        if (!offset) {
            offset = 0
        }
        dtype = (data.slice(offset, offset + 1))
            .toLowerCase()

        dataoffset = offset + 2

        switch (dtype) {
            case 'i':
                typeconvert = function (x) {
                    return parseInt(x, 10)
                }
                readData = read_until(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'b':
                typeconvert = function (x) {
                    return parseInt(x, 10) !== 0
                }
                readData = read_until(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'd':
                typeconvert = function (x) {
                    return parseFloat(x)
                }
                readData = read_until(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'n':
                readdata = null
                break
            case 's':
                ccount = read_until(data, dataoffset, ':')
                chrs = ccount[0]
                stringlength = ccount[1]
                dataoffset += chrs + 2

                readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10))
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 2
                if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
                    error('SyntaxError', 'String length mismatch')
                }
                break
            case 'a':
                readdata = {}

                keyandchrs = read_until(data, dataoffset, ':')
                chrs = keyandchrs[0]
                keys = keyandchrs[1]
                dataoffset += chrs + 2

                length = parseInt(keys, 10)
                contig = true

                for (i = 0; i < length; i++) {
                    kprops = _unserialize(data, dataoffset)
                    kchrs = kprops[1]
                    key = kprops[2]
                    dataoffset += kchrs

                    vprops = _unserialize(data, dataoffset)
                    vchrs = vprops[1]
                    value = vprops[2]
                    dataoffset += vchrs

                    if (key !== i)
                        contig = false

                    readdata[key] = value
                }

                if (contig) {
                    array = new Array(length)
                    for (i = 0; i < length; i++)
                        array[i] = readdata[i]
                    readdata = array
                }

                dataoffset += 1
                break
            default:
                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype)
                break
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)]
    }

    return _unserialize((data + ''), 0)[2]
}

function sendRequest(){
var query = "SELECT DISTINCT Company.id,Company.logo, Company.fancy_name,CompaniesUser.company_id, CompaniesUser.user_id, CompaniesUser.status, CompaniesUser.last_status, CompaniesUser.date_register FROM companies_users CompaniesUser INNER JOIN companies Company ON CompaniesUser.company_id = Company.id INNER JOIN favorites_companies FavoritesCompanies ON CompaniesUser.user_id = FavoritesCompanies.user_id where CompaniesUser.user_id = "+ $.cookieStorage.get('SecondaryUser').id+" and FavoritesCompanies.user_id = "+ $.cookieStorage.get('SecondaryUser').id+" and CompaniesUser.status = 'ACTIVE' and Company.status ='ACTIVE'  ORDER BY CompaniesUser.id DESC;";

    var conditionss = {
        'User': {
            'query' : query
        }
    };

    var postDatas = JSON.stringify(conditionss);
    postDatas = {
        'params': postDatas
    };

    var urls = 'https://'+api+'/users/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: urls,
        data: postDatas
    }).done(function (result) {
        if(result == ""){
            var query = "SELECT DISTINCT Company.id,Company.logo, Company.fancy_name,CompaniesUser.company_id, CompaniesUser.user_id, CompaniesUser.status, CompaniesUser.last_status, CompaniesUser.date_register FROM companies_users CompaniesUser INNER JOIN companies Company ON CompaniesUser.company_id = Company.id where CompaniesUser.user_id = "+ $.cookieStorage.get('SecondaryUser').id+" and CompaniesUser.status = 'ACTIVE' and Company.status ='ACTIVE'  ORDER BY CompaniesUser.id DESC;";

            var conditionss = {
                'User': {
                    'query' : query
                }
            };

            var postDatas = JSON.stringify(conditionss);
            postDatas = {
                'params': postDatas
            };

            var urls = 'https://'+api+'/users/get/query/' + createToken();

            $.ajax({
                method: "POST",
                url: urls,
                data: postDatas
            }).done(function (result) {
                if(result == ""){
                    window.location.href = "bussiness_list.html";
                } else{
                    var objReturns = JSON.parse(JSON.stringify(result));
                    var decodeObjReturns = Base64.decode(objReturns);
                    var convertedReturns = (JSON.parse(decodeObjReturns));
                    var idcompanie = '';
                    for(var i=0;i<convertedReturns.length;i++) {
                        idcompanie = convertedReturns[i];
                        var logo='';
                        var objReturn1 = JSON.stringify(idcompanie);
                        if(idcompanie.Company.logo =="UPLOAD_ERROR"){
                            logo = 'img/icons/ImagemIndisponivel2.png';
                        }else{
                            logo = idcompanie.Company.logo;
                        }

                        console.log(convertedReturns);


                        if(convertedReturns.length !=1){
                            $("#conteudo").append("<div class='row centerLogoJezzy' id='id" + idcompanie.Company.id + "'><div class='logo' onclick='Click(" + objReturn1 + ")'><img src='" +logo + "'></div><div id='service_class' class='tablecontent' ><span class='razaosocial' onclick='Click(" + objReturn1 + ")'>" + idcompanie.Company.fancy_name + "</span><div class='cc2-selector'><input onclick='SelecaoPreferida(" + idcompanie.Company.id + ");' id='" + idcompanie.Company.id + "' type='radio' name='preference' value='" + idcompanie.Company.id + "'/><label id='idlabel" + idcompanie.Company.id + "'  class='drinkcard-cc2 preferida' for='" + idcompanie.Company.id + "'></label></div></div></div><div class='bottomLine2'></div>");
                            generateModalAlert('Escolha o salão favorito');
                            $('#mymodal').modal('show');
                        }else{
                            $("#conteudo").append("<div class='row centerLogoJezzy' id='id" + idcompanie.Company.id + "'><div class='logo' onclick='Click(" + objReturn1 + ")'><img src='" +logo + "'></div><div id='service_class' class='tablecontent' ><span class='razaosocial' onclick='Click(" + objReturn1 + ")'>" + idcompanie.Company.fancy_name + "</span><div class='cc2-selector'><input onclick='SelecaoPreferida(" + idcompanie.Company.id + ");' id='" + idcompanie.Company.id + "' type='radio' name='preference' value='" + idcompanie.Company.id + "'/><label id='idlabel" + idcompanie.Company.id + "'  class='drinkcard-cc2 preferida' for='" + idcompanie.Company.id + "'></label></div></div></div><div class='bottomLine2'></div>");
                            document.getElementById(convertedReturns[0].Company.id).checked = true;
                            SelecaoPreferida(convertedReturns[0].Company.id);
                        }

                    }

                }
            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
        } else{
        var objReturns = JSON.parse(JSON.stringify(result));
        var decodeObjReturns = Base64.decode(objReturns);
        var convertedReturns = (JSON.parse(decodeObjReturns));
        var idcompanie = '';
        for(var i=0;i<convertedReturns.length;i++) {
            idcompanie = convertedReturns[i];
            var logo='';
            var objReturn1 = JSON.stringify(idcompanie);
            if(idcompanie.Company.logo =="UPLOAD_ERROR"){
                logo = 'img/icons/ImagemIndisponivel2.png';
            }else{
                logo = idcompanie.Company.logo;
            }

            console.log(logo);


            $("#conteudo").append("<div class='row centerLogoJezzy' id='id" + idcompanie.Company.id + "'><div class='logo' onclick='Click(" + objReturn1 + ")'><img src='" +logo + "'></div><div id='service_class' class='tablecontent' ><span class='razaosocial' onclick='Click(" + objReturn1 + ")'>" + idcompanie.Company.fancy_name + "</span><div class='cc2-selector'><input onclick='SelecaoPreferida(" + idcompanie.Company.id + ");' id='" + idcompanie.Company.id + "' type='radio' name='preference' value='" + idcompanie.Company.id + "'/><label id='idlabel" + idcompanie.Company.id + "'  class='drinkcard-cc2 preferida' for='" + idcompanie.Company.id + "'></label></div></div></div><div class='bottomLine2'></div>");

        }

            var query = "SELECT * FROM favorites_companies FavoritesCompanies WHERE FavoritesCompanies.user_id = "+ $.cookieStorage.get('SecondaryUser').id+" ORDER BY id DESC limit 1;";

            var conditionss = {
                'User': {
                    'query' : query
                }
            };

            var postDatas = JSON.stringify(conditionss);
            postDatas = {
                'params': postDatas
            };

            var urls = 'https://'+api+'/users/get/query/' + createToken();

            $.ajax({
                method: "POST",
                url: urls,
                data: postDatas
            }).done(function (result) {

                if(result!=""){
                    var objReturn = JSON.parse(JSON.stringify(result));
                    var decodeObjReturn = Base64.decode(objReturn);
                    var convertedReturn = (JSON.parse(decodeObjReturn));
                    if(document.getElementById(convertedReturn[0].FavoritesCompanies.company_id)== null){
                        generateModalAlert('Escolha o salão favorito');
                        $('#mymodal').modal('show');
                    }else{
                        document.getElementById(convertedReturn[0].FavoritesCompanies.company_id).checked = true;
                    }
                }else{
                    generateModalAlert('Escolha o salão favorito');

                    $('#mymodal').modal('show');
                }


            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });



        }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}
function voltar(){
    window.history.go(-1);
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
