$(document).ready(function () {
    localStorage.removeItem('FavCompany');
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";
    $("#scroll").click(function(){
        $("html, body").animate({
            scrollTop: 0
        }, 100);
    });
    $("#container").click(function(){
        $("#text-search")[0].value = "";
        $("#nav-collapse3").removeClass("in");
        Search();
    });
    $('#userName').click(function () {
        window.location.href = "../../jezzy-mobile-professionals/public_html/my_profile.html";
    });

});
function Sair(){
    $.cookieStorage.remove('User');
    $.removeAllStorages();
    window.location.href = 'https://'+ip+'/jezzy-mobile-professionals/public_html/index.html';
}
function Limpar(){

        $("#text-search")[0].value = "";
        Search();

}
function mostrar(id) {
    if (document.getElementById(id).disabled == false) {

    document.getElementById(id).disabled = true;

    $("label[for=" + id + "]").addClass('disabled');

    var data = new Date();

    var mes = data.getMonth();

    str_month = new String(mes);

    if (str_month.length < 2)
        str_month = 0 + str_month;

    var fulldata = data.getFullYear() + "-" + str_month + "-" + data.getDate();
    //se o check estiver true significa que a empresa já está sendo seguida pelo usuário logado
    if (document.getElementById(id).checked == true) {
        //ao clicar no botão checado, verificar se há registros dessa empresa para o id desse usuário
        var conditionsD = {
            'CompaniesUser': {
                'conditions': {
                    'CompaniesUser.company_id': id,
                    'CompaniesUser.status': 'INACTIVE',
                    'CompaniesUser.user_id': $.cookieStorage.get('SecondaryUser').id
                }
            }
        };
        var postDataD = JSON.stringify(conditionsD);
        postDataD = {
            'params': postDataD
        };

        var urlD = 'https://' + api + '/companies/get/all/' + createToken();
        $.ajax({
            method: "POST",
            url: urlD,
            data: postDataD
        }).done(function (result) {

                if (result == "") { // caso não encontrem registros da empresa que deixou de ser seguida, adiciona-se um registro para esse usuario e essa empresa com status ativo

                    var conditionsD = {
                        'CompaniesUser': {
                            'conditions': {
                                'CompaniesUser.company_id': id,
                                'CompaniesUser.status': 'ACTIVE',
                                'CompaniesUser.user_id': $.cookieStorage.get('SecondaryUser').id
                            }
                        }
                    };
                    var postDataD = JSON.stringify(conditionsD);
                    postDataD = {
                        'params': postDataD
                    };

                    var urlD = 'https://' + api + '/companies/get/all/' + createToken();
                    $.ajax({
                        method: "POST",
                        url: urlD,
                        data: postDataD
                    }).done(function (result) {
                        if (result == "") {


                            var conditionss = {
                                'CompaniesUser': {
                                    'company_id': id,
                                    'date_register': fulldata,
                                    'status': 'ACTIVE',
                                    'user_id': $.cookieStorage.get('SecondaryUser').id
                                }
                            };

                            var postDatas = JSON.stringify(conditionss);
                            postDatas = {
                                'params': postDatas
                            };

                            var urls = 'https://' + api + '/companies/save/first/' + createToken();
                            $.ajax({
                                method: "POST",
                                url: urls,
                                data: postDatas
                            }).done(function (result) {
                                if (result == "") {
                                    document.getElementById(id).disabled = false;
                                    $("label[for=" + id + "]").removeClass('disabled');
                                } else {
                                    var objReturn = JSON.parse(JSON.stringify(result));
                                    var decodeObjReturn = Base64.decode(objReturn);
                                    var convertedReturn = JSON.parse(decodeObjReturn);

                                    //adicionar codigo para adicionar ofertas da empresa a tabela offers_users
                                    var query = 'SELECT * FROM offers WHERE offers.company_id = ' + id;

                                    var conditionss = {
                                        'User': {
                                            'query': query
                                        }
                                    };


                                    var postData = JSON.stringify(conditionss);

                                    postData = {
                                        'params': postData
                                    };
                                    var url = 'https://' + api + '/users/get/query/' + createToken();

                                    $.ajax({
                                        method: "POST",
                                        url: url,
                                        data: postData
                                    }).done(function (result) {
                                        if (result == 'ImE6MDp7fSI=') {
                                            document.getElementById(id).disabled = false;
                                            $("label[for=" + id + "]").removeClass('disabled');
                                        } else {
                                            var cont = 0;
                                            var objReturnD = JSON.parse(JSON.stringify(result));
                                            var decodeObjReturnD = Base64.decode(objReturnD);
                                            var convertedReturnD = (JSON.parse(decodeObjReturnD));
                                            if (convertedReturnD.length > 100) {
                                                cont = 100;
                                            } else {
                                                cont = convertedReturnD.length;
                                            }
                                            for (var b = 0; b < cont; b++) {
                                                var offer = convertedReturnD[b];
                                                var date = moment(new Date()).format('YYYY-MM-DD');
                                                var query = 'INSERT INTO offers_users (offer_id, user_id, date_register, target) VALUES (' + offer.offers.id + ", " + $.cookieStorage.get('SecondaryUser').id + ", '" + date + "', '');";

                                                var conditionss = {
                                                    'General': {
                                                        'query': query
                                                    }
                                                };

                                                var postData = JSON.stringify(conditionss);

                                                postData = {
                                                    'params': postData
                                                };
                                                var url = 'https://' + api + '/General/get/query/' + createToken();

                                                $.ajax({
                                                    method: "POST",
                                                    url: url,
                                                    data: postData
                                                }).done(function (result) {
                                                    document.getElementById(id).disabled = false;
                                                    $("label[for=" + id + "]").removeClass('disabled');

                                                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                                    alert(errorThrown);
                                                });
                                            }
                                        }
                                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                        alert(errorThrown);
                                    });

                                    // fim do if
                                }

                            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                alert(errorThrown);
                            });
                        }

                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });

            } else {// encontrado registro de status inativo para essa empresa e esse usuario
                var objReturnD = JSON.parse(JSON.stringify(result));
                var decodeObjReturnD = Base64.decode(objReturnD);
                var convertedReturnD = JSON.parse(decodeObjReturnD);

                for (var b = 0; b < convertedReturnD.length; b++) {
                    var companys = (convertedReturnD);
                    var company = companys[b].CompaniesUser.id;


                    var conditionss = { //  muda-se o status do registro e também a data
                        'CompaniesUser': {
                            'id': company,
                            'company_id': id,
                            'date_register': fulldata,
                            'status': 'ACTIVE',
                            'user_id': $.cookieStorage.get('SecondaryUser').id
                        }
                    };
                    var postDatas = JSON.stringify(conditionss);
                    postDatas = {
                        'params': postDatas
                    };

                    var urls = 'https://' + api + '/companies/save/first/' + createToken();
                    $.ajax({
                        method: "POST",
                        url: urls,
                        data: postDatas
                    }).done(function (result) {
                        if (result == "") {
                            document.getElementById(id).disabled = false;
                            $("label[for=" + id + "]").removeClass('disabled');
                        } else {
                            var objReturn = JSON.parse(JSON.stringify(result));
                            var decodeObjReturn = Base64.decode(objReturn);
                            var convertedReturn = JSON.parse(decodeObjReturn);
                            // inicio do código de seleção das ofertas dessa companhia para criação da tabela offers_users
                            var query = 'SELECT offers.id FROM offers WHERE offers.company_id = ' + id;

                            var conditionss = {
                                'General': {
                                    'query': query
                                }
                            };


                            var postData = JSON.stringify(conditionss);

                            postData = {
                                'params': postData
                            };
                            var url = 'https://' + api + '/General/get/query/' + createToken();

                            $.ajax({
                                method: "POST",
                                url: url,
                                data: postData
                            }).done(function (result) {

                                if (result == 'ImE6MDp7fSI=') {
                                    document.getElementById(id).disabled = false;
                                    $("label[for=" + id + "]").removeClass('disabled');

                                } else {
                                    var cont = 0;
                                    var objReturnD = JSON.parse(JSON.stringify(result));
                                    var decodeObjReturnD = Base64.decode(objReturnD);
                                    var convertedReturnD = unserialize(JSON.parse(decodeObjReturnD));

                                    if (convertedReturnD.length > 100) {
                                        cont = 100;
                                    } else {
                                        cont = convertedReturnD.length;
                                    }
                                    for (var b = 0; b < cont; b++) {

                                        var offer = convertedReturnD[b];
                                        var date = moment(new Date()).format('YYYY-MM-DD');
                                        var query = 'INSERT INTO offers_users (offer_id, user_id, date_register, target) VALUES (' + offer.offers.id + ", " + $.cookieStorage.get('SecondaryUser').id + ", '" + date + "', '');";

                                        var conditionss = {
                                            'General': {
                                                'query': query
                                            }
                                        };

                                        var postData = JSON.stringify(conditionss);

                                        postData = {
                                            'params': postData
                                        };
                                        var url = 'https://' + api + '/General/get/query/' + createToken();

                                        $.ajax({
                                            method: "POST",
                                            url: url,
                                            data: postData
                                        }).done(function (result) {
                                            document.getElementById(id).disabled = false;
                                            $("label[for=" + id + "]").removeClass('disabled');

                                        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                            alert(errorThrown);
                                        });
                                    }
                                }
                            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                alert(errorThrown);
                            });


                            // fim do código


                        }

                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });


                }
            }

        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });


    } else { //botão que estava checado
        var conditionsD = { //verificar se há registro ativo para esse usuario seguindo essa empresa
            'CompaniesUser': {
                'conditions': {
                    'CompaniesUser.company_id': id,
                    'CompaniesUser.status': 'ACTIVE',
                    'CompaniesUser.user_id': $.cookieStorage.get('SecondaryUser').id
                }
            }
        };
        var postDataD = JSON.stringify(conditionsD);
        postDataD = {
            'params': postDataD
        };

        var urlD = 'https://' + api + '/companies/get/first/' + createToken();
        $.ajax({
            method: "POST",
            url: urlD,
            data: postDataD
        }).done(function (result) {
            if (result == "") {
                //caso não haja não fazer nada
            } else {
                var objReturnD = JSON.parse(JSON.stringify(result));
                var decodeObjReturnD = Base64.decode(objReturnD);
                var convertedReturnD = JSON.parse(decodeObjReturnD);
                // em caso de haver, deixar de seguir a empresa
                var conditionss = {
                    'CompaniesUser': {
                        'id': (convertedReturnD).CompaniesUser.id,
                        'status': 'INACTIVE',
                        'user_id': $.cookieStorage.get('SecondaryUser').id
                    }
                };
                var postDatas = JSON.stringify(conditionss);
                postDatas = {
                    'params': postDatas
                };

                var urls = 'https://' + api + '/companies/save/first/' + createToken();
                $.ajax({
                    method: "POST",
                    url: urls,
                    data: postDatas
                }).done(function (result) {
                    if (result == "") {
                        document.getElementById(id).disabled = false;
                        $("label[for=" + id + "]").removeClass('disabled');
                    } else {
                        var objReturn = JSON.parse(JSON.stringify(result));
                        var decodeObjReturn = Base64.decode(objReturn);
                        var convertedReturn = JSON.parse(decodeObjReturn);
                        //adicionar codigo para adicionar ofertas da empresa a tabela offers_users
                        var query = 'SELECT offers.id FROM offers WHERE offers.company_id = ' + id;

                        var conditionss = {
                            'General': {
                                'query': query
                            }
                        };


                        var postData = JSON.stringify(conditionss);

                        postData = {
                            'params': postData
                        };
                        var url = 'https://' + api + '/General/get/query/' + createToken();

                        $.ajax({
                            method: "POST",
                            url: url,
                            data: postData
                        }).done(function (result) {
                            if (result != 'ImE6MDp7fSI=') {
                                var cont = 0;
                                var objReturnD = JSON.parse(JSON.stringify(result));
                                var decodeObjReturnD = Base64.decode(objReturnD);
                                var convertedReturnD = unserialize(JSON.parse(decodeObjReturnD));
                                if (convertedReturnD.length > 100) {
                                    cont = 100;
                                } else {
                                    cont = convertedReturnD.length;
                                }
                                for (var b = 0; b < cont; b++) {
                                    var offer = convertedReturnD[b];
                                    var query = 'DELETE FROM offers_users WHERE offers_users.offer_id = ' + offer.offers.id + " and offers_users.user_id = " + $.cookieStorage.get('SecondaryUser').id + ";";

                                    var conditionss = {
                                        'General': {
                                            'query': query
                                        }
                                    };

                                    var postData = JSON.stringify(conditionss);

                                    postData = {
                                        'params': postData
                                    };
                                    var url = 'https://' + api + '/General/get/query/' + createToken();

                                    $.ajax({
                                        method: "POST",
                                        url: url,
                                        data: postData
                                    }).done(function (result) {
                                        document.getElementById(id).disabled = false;
                                        $("label[for=" + id + "]").removeClass('disabled');

                                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                        alert(errorThrown);
                                    });
                                }
                            } else {
                                document.getElementById(id).disabled = false;
                                $("label[for=" + id + "]").removeClass('disabled');
                            }
                        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        });

                        // fim do if


                    }
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });


            }

        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });


    }
}
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
function Search(){
    var search = (document.getElementById("text-search").value);


    var conditions = {
        'Company': {
            'conditions': {
                'Company.status':'ACTIVE'
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

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}

function clicar(business){

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


function SendRequest() {


    var conditions = {
        'Company': {
            'conditions': {
                'Company.status':'ACTIVE'
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

        var objReturn = JSON.parse(JSON.stringify(result));

        var decodeObjReturn = Base64.decode(objReturn);

        var convertedReturn = (JSON.parse(decodeObjReturn));

        var stringobj = "";
        var resultado = " ";

        for (var i = 0; i < convertedReturn.length; i++) {
            resultado = convertedReturn[i];
            if(resultado.Company.id != 99999){
           stringobj =  JSON.stringify(resultado);
            var logo='';

            if(resultado.Company.logo =="UPLOAD_ERROR"){
                logo = 'img/icons/ImagemIndisponivel2.png';
            }else{
                logo = resultado.Company.logo;
            }


            $("#conteudo").append("<div class='row centerLogoJezzy' id='id"+resultado.Company.id+"'><div class='logo' onclick='clicar("+stringobj+")'><img src='"+logo+"'></div><div class='subtitle'   onclick='clicar("+stringobj+");'>"+ resultado.Company.fancy_name+"</div><div class='cc-selector'><input id='"+resultado.Company.id+"' onclick='mostrar("+resultado.Company.id+");' type='checkbox' name='"+resultado.Company.id+"' value='"+resultado.Company.id+"'/><label class='drinkcard-cc follow' id='followlabel' for='"+resultado.Company.id+"'></label></div></div><div class='bottomLine2'></div>");

            var conditionss = {
                'CompaniesUser': {
                    'conditions' : {
                        'CompaniesUser.company_id':resultado.Company.id,
                        'CompaniesUser.status':'ACTIVE'
                    }
                }
            };
            var postDatas = JSON.stringify(conditionss);
            postDatas = {
                'params': postDatas
            };

            var urls = 'https://'+api+'/companies/get/all/' + createToken();
            $.ajax({
                method: "POST",
                url: urls,
                data: postDatas
            }).done(function (result) {
                if(result == ""){

                }else{
                    var objReturn = JSON.parse(JSON.stringify(result));
                    var decodeObjReturn = Base64.decode(objReturn);
                    var convertedReturn = (JSON.parse(decodeObjReturn));

                    for(var n=0;n<convertedReturn.length;n++){
                        var companieuser = convertedReturn[n];
                        if(companieuser.CompaniesUser.user_id == $.cookieStorage.get('SecondaryUser').id){
                            document.getElementById(companieuser.CompaniesUser.company_id).checked = true;

                        }
                    }


                }

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });

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


