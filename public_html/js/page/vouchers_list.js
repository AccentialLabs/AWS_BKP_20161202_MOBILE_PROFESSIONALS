$(document).ready(function () {
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";
    var queryvouchers = "  SELECT * FROM services_vouchers Vouchers INNER JOIN services ON services.id = Vouchers.service_id INNER JOIN subclasses ON services.subclasse_id = subclasses.id INNER JOIN offers Offer ON Vouchers.offer_id = Offer.id INNER JOIN companies Company ON Offer.company_id = Company.id WHERE Vouchers.user_id =  "+ $.cookieStorage.get('SecondaryUser').id + " and Vouchers.status = 'APPROVED' ORDER BY Offer.ends_at;";

    console.log(queryvouchers);
    var conditionsvouchers = {
        'General': {
            'query':queryvouchers
        }
    };
    var postDatavouchers = JSON.stringify(conditionsvouchers);

    postDatavouchers = {
        'params': postDatavouchers
    };
    var urlvouchers = 'https://'+api+'/General/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: urlvouchers,
        data: postDatavouchers

    }).done(function(result) {
        $("#conteudo").fadeOut(200);
        if(result!="ImE6MDp7fSI=") {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
            var voucher = '';
            var HTML = '';
            for (var j = 0; j < convertedReturn.length; j++) {
                voucher = convertedReturn[j];


                var expiracao = voucher.Offer.ends_at;



                var stringexpiracao= expiracao.split("-");

                var anoexpiracao = stringexpiracao[0];
                var mesexpiracao = stringexpiracao[1];
                var diaexpiracao = stringexpiracao[2];
                var diaexpiracaofinal = diaexpiracao.split(' ');
                var id = voucher.Vouchers.id;
                var cookie = (voucher);

                $("#conteudo").append("<div id="+id+" class='vouchertext' onclick= 'selecionar("+cookie.services.id+", "+cookie.services.subclasse_id+", "+cookie.Vouchers.id+", "+cookie.Company.id+");' ><div class='vouchertextcod'># "+id+"</br></div></br><img class='icons' src='img/icons/service-voucher-02.png'>SERVIÇO: "+voucher.subclasses.name+"</br><img class='icons' src='img/icons/date-voucher-03.png'>VALIDADE: "+diaexpiracaofinal[0]+"/"+mesexpiracao+"/"+anoexpiracao+"</br><img class='icons' src='img/icons/company-voucher-04.png'>"+voucher.Company.fancy_name+"</br><img class='icons' src='img/icons/telefone_voucher.png'>"+voucher.Company.responsible_phone+"</div><div class='textvoucherinfocompanie'></div><img id='img"+id+"' class='voucher' onclick= 'selecionar("+cookie.services.id+", "+cookie.services.subclasse_id+", "+cookie.Vouchers.id+", "+cookie.Company.id+");' src='img/icons/Voucher-01.png'>");

                var query = 'SELECT * FROM schedules_solicitation WHERE user_id = ' + $.cookieStorage.get('SecondaryUser').id+' and voucher_id = ' +id+ ' and status = "WAITING_COMPANY_RESPONSE";';

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
                    if(result == "ImE6MDp7fSI="){

                    }else{
                        var objReturn = JSON.parse(JSON.stringify(result));
                        var decodeObjReturn = Base64.decode(objReturn);
                        var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
                        for(var j=0;j<convertedReturn.length;j++){
                            $("#"+convertedReturn[j].schedules_solicitation.voucher_id).css('opacity', '0.3');

                            document.getElementById("img"+convertedReturn[0].schedules_solicitation.voucher_id).setAttribute('onclick', '');
                            document.getElementById(convertedReturn[0].schedules_solicitation.voucher_id).setAttribute('onclick', '');

                        }


                    }




            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
                $("#conteudo").fadeIn(1000);
            }

        }else{

            $("#conteudo").append('<div class="sans">Você ainda não comprou nenhum serviço antecipado.</br></br>Um novo voucher de serviço é criado sempre que você adquire uma oferta de serviço do salão.</div>');
            $("#conteudo").fadeIn(800);
        }

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
    });
});
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
function selecionar(service,subclasse,voucher,company){

var query = "SELECT * FROM services WHERE services.id = " + service;
    var query2 = "SELECT * FROM subclasses WHERE subclasses.id = " + subclasse;
        var query3 = "SELECT * FROM services_vouchers Vouchers WHERE Vouchers.id = " + voucher;

    var conditionsCompany = {
        'Company': {
            'conditions': {
                'Company.id':company
            }
        }
    };

    var postDataCompany = JSON.stringify(conditionsCompany);

    postDataCompany = {
        'params': postDataCompany
    };

    var urlCompany = 'https://'+api+'/companies/get/first/' + createToken();

    $.ajax({
        method: "POST",
        url: urlCompany,
        data: postDataCompany
    }).done(function (result) {
        var objReturnCompany = JSON.parse(JSON.stringify(result));
        var decodeObjReturnCompany = Base64.decode(objReturnCompany);
        var convertedReturnCompany = (JSON.parse(decodeObjReturnCompany));



        var objReturn1 = JSON.stringify(convertedReturnCompany);

        $.cookieStorage.remove('Company');

        $.cookieStorage.set(convertedReturnCompany);

        if ($.cookieStorage.isSet('Company')) {
            $.cookieStorage.remove('services');
            var conditionsservices = {
                'General': {
                    'query':query
                }

            };
            var postDataCompany = JSON.stringify(conditionsservices);

            postDataCompany = {
                'params': postDataCompany
            };

            var urlCompany = 'https://'+api+'/General/get/query/' + createToken();

            $.ajax({
                method: "POST",
                url: urlCompany,
                data: postDataCompany
            }).done(function (result) {
                var objReturns = JSON.parse(JSON.stringify(result));
                var decodeObjReturns = Base64.decode(objReturns);
                var convertedReturns = unserialize(JSON.parse(decodeObjReturns));


            $.cookieStorage.set(convertedReturns[0]);

            if ($.cookieStorage.isSet('services')) {
                $.cookieStorage.remove('subclasses');

                var conditionssubclasses = {
                    'General': {
                        'query':query2
                    }

                };
                var postDataCompany = JSON.stringify(conditionssubclasses);

                postDataCompany = {
                    'params': postDataCompany
                };

                var urlCompany = 'https://'+api+'/General/get/query/' + createToken();

                $.ajax({
                    method: "POST",
                    url: urlCompany,
                    data: postDataCompany
                }).done(function (result) {
                    var objReturns = JSON.parse(JSON.stringify(result));
                    var decodeObjReturns = Base64.decode(objReturns);
                    var convertedReturns = unserialize(JSON.parse(decodeObjReturns));


                    $.cookieStorage.set(convertedReturns[0]);
                    var conditionsvouchers = {
                        'General': {
                            'query':query3
                        }

                    };
                    var postDatavouchers = JSON.stringify(conditionsvouchers);

                    postDatavouchers = {
                        'params': postDatavouchers
                    };

                    var urlvouchers = 'https://'+api+'/General/get/query/' + createToken();

                    $.ajax({
                        method: "POST",
                        url: urlvouchers,
                        data: postDatavouchers
                    }).done(function (result) {
                        var objReturns = JSON.parse(JSON.stringify(result));
                        var decodeObjReturns = Base64.decode(objReturns);
                        var convertedReturns = unserialize(JSON.parse(decodeObjReturns));

                if ($.cookieStorage.isSet('subclasses')) {
                    $.cookieStorage.remove('Vouchers');

                    $.cookieStorage.set((convertedReturns[0]));
                    if ($.cookieStorage.isSet('Vouchers')) {
								window.location.href = 'professionals_list.html'
                    } else {
                        generateModalAlert("Erro ao salvar Cookievoucher");
                        $('#mymodal').modal('show');
                    }
                } else {
                    generateModalAlert("Erro ao salvar Cookiesub");
                    $('#mymodal').modal('show');
                }
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });
            } else {
                generateModalAlert("Erro ao salvar Cookieser");
                $('#mymodal').modal('show');
            }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
        } else {
            generateModalAlert("Erro ao salvar Cookie");
            $('#mymodal').modal('show');
        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

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