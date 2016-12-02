var id = '';
$(document).ready(function() {
    id = $.cookieStorage.get('Checkout').id;

    sendRequest();
    $("#backToList").click(function (){
        window.history.go(-1);
    });

        document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";

});
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(input) {
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
    decode: function(input) {
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
    _utf8_encode: function(string) {
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
    _utf8_decode: function(utftext) {
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
    var cor;
    var offer_id;
    var company_id;
    var PaymentMethod;
    var conditions = {
        'Checkout': {
            'conditions': {
                'Checkout.id': id
            }
        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/payments/get/first/' + createToken();


    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function(result)    {

        var objReturn = JSON.parse(JSON.stringify(result));
        var decodeObjReturn = Base64.decode(objReturn);
        var convertedReturn = JSON.parse(decodeObjReturn);

        var valorTotal = convertedReturn.Checkout.total_value;
        var valor = convertedReturn.Checkout.unit_value;
        var Frete = convertedReturn.Checkout.shipping_value;

        $("#unitTotalValue").append(monetary(valorTotal));
        $("#unitAddress").append(utf8_decode(convertedReturn.Checkout.address + ", " + convertedReturn.Checkout.number + " " + convertedReturn.Checkout.city + " - " +convertedReturn.Checkout.state));
        $("#unitCEP").append("CEP:" + convertedReturn.Checkout.zip_code);
        $("#unitPaymentCode").append(convertedReturn.Checkout.transaction_moip_code);
        if(Frete != 0,00){
            $("#unitSend").append(monetary(Frete));
        }else{
            $("#unitSend").append('sem frete');
        }

        $("#unitValue").append(monetary(valor));
        $("#unitQtde").append(convertedReturn.Checkout.amount);
        if(convertedReturn.Checkout.installment != 1){
            $("#unitParcel").append(convertedReturn.Checkout.installment + "x");
        }else{
            $("#unitParcel").append("Não");
        }

        $("#unitCode").append(convertedReturn.Checkout.payment_state_id);
        PaymentMethod = convertedReturn.Checkout.payment_method_id;

        offer_id = convertedReturn.Checkout.offer_id;
        company_id = convertedReturn.Checkout.company_id;
        if(convertedReturn.Checkout.delivery_time>1) {
            $("#unitDeliveryDays").append(convertedReturn.Checkout.delivery_time + " dias");
        }
        else {
            if(convertedReturn.Checkout.delivery_time == 0){
                $("#unitDeliveryDays").append('sem entrega');
                $("#unitAddress").addClass('hide');
                $("#unitCEP").addClass('hide');
                $("#tirar").addClass('hide');
            }else{
                $("#unitDeliveryDays").append(convertedReturn.Checkout.delivery_time + " dia");
            }

        }

        var metrics = convertedReturn.Checkout.metrics;

        if(metrics != "''" && metrics != "," && metrics != "" && metrics != " "){
            $("#unitOption").append(metrics.slice(0,9)+"<br>"+ metrics.slice(11,14));
            cor = metrics.slice(15,22);
            document.getElementById("square").style.background = cor;
        }else{
            $("#square").addClass('hide');
        }
        var conditionsCompany = {
            'General': {
                'query': 'SELECT * FROM companies Company WHERE Company.id = ' + company_id
            }

        };
        var postDataCompany = JSON.stringify(conditionsCompany);

        postDataCompany = {
            'params': postDataCompany
        };

        var urlCompany = 'https://'+api+'/General/get/query/' + createToken();


        $.ajax({
            method: "POST",
            url: urlCompany,
            data: postDataCompany
        }).done(function(result) {

            var objReturnCompany = JSON.parse(JSON.stringify(result));
            var decodeObjReturnCompany = Base64.decode(objReturnCompany);
            var convertedReturnCompany = unserialize(JSON.parse(decodeObjReturnCompany));

            $("#unitBussinessTitle").append(convertedReturnCompany[0].Company.corporate_name);
            $("#CompanyInfo").append(convertedReturnCompany[0].Company.site_url +"<br>"+ convertedReturnCompany[0].Company.phone+"<br>"+convertedReturnCompany[0].Company.phone_2);
            $("#logoBussinessSize").attr('src', convertedReturnCompany[0].Company.logo);




            var conditionsOffer= {

                'General': {
                    'query':  "SELECT * FROM offers Offer WHERE id = "+offer_id
                }


            };
            var postDataOffer = JSON.stringify(conditionsOffer);

            postDataOffer = {
                'params': postDataOffer
            };


            var urlOffer = 'https://'+api+'/General/get/query/' + createToken();


            $.ajax({
                method: "POST",
                url: urlOffer,
                data: postDataOffer
            }).done(function(result) {
                if(result != "ImE6MDp7fSI="){
                var objReturnOffers = JSON.parse(JSON.stringify(result));
                var decodeObjReturnOffers = Base64.decode(objReturnOffers);
                var convertedReturnOffers = unserialize(JSON.parse(decodeObjReturnOffers));
                var desconto = (convertedReturnOffers[0].Offer.percentage_discount)/1;
                $("#offerOff").append(Math.floor(desconto)+ "%<br>OFF");
                $("#imageOfferService").attr('src', convertedReturnOffers[0].Offer.photo) ;


                var conditionsComment={
                    'OffersComment': {
                        'conditions': {
                            'OffersComment.offer_id': offer_id
                        }
                    }
                };
                var postDataComment = JSON.stringify(conditionsComment);
                postDataComment = {
                    'params': postDataComment
                };

                var urlComment = 'https://'+api+'/offers/get/all/' + createToken();

                $.ajax({
                    method: "POST",
                    url: urlComment,
                    data: postDataComment
                }).done(function (result) {

                    if (result != "") {
                        var objReturnComment = JSON.parse(JSON.stringify(result));
                        var decodeObjReturnComment = Base64.decode(objReturnComment);
                        var convertedReturnComment = JSON.parse(decodeObjReturnComment);


                    var variavel=0;
                    var media=0;
                    for(var i=0;i<convertedReturnComment.length;i++){
                        variavel += (convertedReturnComment[i].OffersComment.evaluation/1);
                    }


                    media=(variavel/convertedReturnComment.length).toFixed(1);

                    switch(media){
                        case "0": $("#numberStars").attr('src','img/icons/0.png');
                            break;
                        case "0.1": $("#numberStars").attr('src','img/icons/0.png');
                            break;
                        case "0.2": $("#numberStars").attr('src','img/icons/0.png');
                            break;
                        case "0.3":$("#numberStars").attr('src', 'img/icons/0.5.png');
                            break;
                        case "0.4":$("#numberStars").attr('src', 'img/icons/0.5.png');
                            break;
                        case "0.5":$("#numberStars").attr('src', 'img/icons/0.5.png');
                            break;
                        case "0.6":$("#numberStars").attr('src', 'img/icons/0.5.png');
                            break;
                        case "0.7":$("#numberStars").attr('src', 'img/icons/0.5.png');
                            break;

                        case "0.8":$("#numberStars").attr('src', "img/icons/1.png");
                            break;
                        case "0.9":$("#numberStars").attr('src', "img/icons/1.png");
                            break;
                        case "1.0":$("#numberStars").attr('src', "img/icons/1.png");
                            break;
                        case "1.1":$("#numberStars").attr('src', "img/icons/1.png");
                            break;
                        case "1.2":$("#numberStars").attr('src', "img/icons/1.png");
                            break;

                        case "1.3": $("#numberStars").attr('src', "img/icons/1.5.png");
                            break;
                        case "1.4": $("#numberStars").attr('src', "img/icons/1.5.png");
                            break;
                        case "1.5": $("#numberStars").attr('src', "img/icons/1.5.png");
                            break;
                        case "1.6": $("#numberStars").attr('src', "img/icons/1.5.png");
                            break;
                        case "1.7": $("#numberStars").attr('src', "img/icons/1.5.png");
                            break;

                        case "1.8":$("#numberStars").attr('src', "img/icons/2.png");
                            break;
                        case "1.9":$("#numberStars").attr('src', "img/icons/2.png");
                            break;
                        case "2.0":$("#numberStars").attr('src', "img/icons/2.png");
                            break;
                        case "2.1":$("#numberStars").attr('src', "img/icons/2.png");
                            break;
                        case "2.2":$("#numberStars").attr('src', "img/icons/2.png");
                            break;

                        case "2.3": $("#numberStars").attr('src', "img/icons/2.5.png");
                            break;
                        case "2.4": $("#numberStars").attr('src', "img/icons/2.5.png");
                            break;
                        case "2.5": $("#numberStars").attr('src', "img/icons/2.5.png");
                            break;
                        case "2.6": $("#numberStars").attr('src', "img/icons/2.5.png");
                            break;
                        case "2.7": $("#numberStars").attr('src', "img/icons/2.5.png");
                            break;

                        case "2.8": $("#numberStars").attr('src', "img/icons/3.png");
                            break;
                        case "2.9": $("#numberStars").attr('src', "img/icons/3.png");
                            break;
                        case "3.0": $("#numberStars").attr('src', "img/icons/3.png");
                            break;
                        case "3.1": $("#numberStars").attr('src', "img/icons/3.png");
                            break;
                        case "3.2": $("#numberStars").attr('src', "img/icons/3.png");
                            break;

                        case "3.3": $("#numberStars").attr('src', 'img/icons/3.5.png');
                            break;
                        case "3.4": $("#numberStars").attr('src', 'img/icons/3.5.png');
                            break;
                        case "3.5": $("#numberStars").attr('src', 'img/icons/3.5.png');
                            break;
                        case "3.6": $("#numberStars").attr('src', 'img/icons/3.5.png');
                            break;
                        case "3.7": $("#numberStars").attr('src', 'img/icons/3.5.png');
                            break;

                        case "3.8":$("#numberStars").attr('src', "img/icons/4.png");
                            break;
                        case "3.9":$("#numberStars").attr('src', "img/icons/4.png");
                            break;
                        case "4.0":$("#numberStars").attr('src', "img/icons/4.png");
                            break;
                        case "4.1":$("#numberStars").attr('src', "img/icons/4.png");
                            break;
                        case "4.2":$("#numberStars").attr('src', "img/icons/4.png");
                            break;

                        case "4.3": $("#numberStars").attr('src', "img/icons/4.5.png");
                            break;
                        case "4.4": $("#numberStars").attr('src', "img/icons/4.5.png");
                            break;
                        case "4.5": $("#numberStars").attr('src', "img/icons/4.5.png");
                            break;
                        case "4.6": $("#numberStars").attr('src', "img/icons/4.5.png");
                            break;
                        case "4.7": $("#numberStars").attr('src', "img/icons/4.5.png");
                            break;

                        case "4.8":  $("#numberStars").attr('src', "img/icons/5.png");
                            break;
                        case "4.9":  $("#numberStars").attr('src', "img/icons/5.png");
                            break;
                        case "5.0":  $("#numberStars").attr('src', "img/icons/5.png");
                            break;

                        default: $("#numberStars").attr('src', "img/icons/0.png");
                    }

                    var conditionsPaymentMethod = {
                        'PaymentMethod': {
                            'conditions': {
                                'PaymentMethod.id':PaymentMethod
                            }
                        }
                    };
                    var postDataPaymentMethod = JSON.stringify(conditionsPaymentMethod);

                    postDataPaymentMethod = {
                        'params': postDataPaymentMethod
                    };
                    var urlPaymentMethod = 'https://'+api+'/payments/get/first/' + createToken();


                    $.ajax({
                        method: "POST",
                        url: urlPaymentMethod,
                        data: postDataPaymentMethod
                    }).done(function(result)    {

                        var objReturnPaymentMethod = JSON.parse(JSON.stringify(result));
                        var decodeObjReturnPaymentMethod = Base64.decode(objReturnPaymentMethod);
                        var convertedReturnPaymentMethod = JSON.parse(decodeObjReturnPaymentMethod);

                        $("#unitPaymentForm").append(convertedReturnPaymentMethod.PaymentMethod.type);


                    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });

                    }else{

                    }

                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });

                    }
            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });


        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });


    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });





}
function unserialize (data) {
    //  discuss at: http://locutusjs.io/php/unserialize/
    // original by: Arpad Ray (mailto:arpad@php.net)
    // improved by: Pedro Tainha (http://www.pedrotainha.com)
    // improved by: Kevin van Zonneveld (http://kvz.io)
    // improved by: Kevin van Zonneveld (http://kvz.io)
    // improved by: Chris
    // improved by: James
    // improved by: Le Torbi
    // improved by: Eli Skeggs
    // bugfixed by: dptr1988
    // bugfixed by: Kevin van Zonneveld (http://kvz.io)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //  revised by: d3x
    //    input by: Brett Zamir (http://brett-zamir.me)
    //    input by: Martin (http://www.erlenwiese.de/)
    //    input by: kilops
    //    input by: Jaroslaw Czarniak
    //      note 1: We feel the main purpose of this function should be
    //      note 1: to ease the transport of data between php & js
    //      note 1: Aiming for PHP-compatibility, we have to translate objects to arrays
    //   example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}')
    //   returns 1: ['Kevin', 'van', 'Zonneveld']
    //   example 2: unserialize('a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}')
    //   returns 2: {firstName: 'Kevin', midName: 'van'}

    var $global = (typeof window !== 'undefined' ? window : GLOBAL)

    var utf8Overhead = function (chr) {
        // http://locutusjs.io/php/unserialize:571#comment_95906
        var code = chr.charCodeAt(0)
        var zeroCodes = [
            338,
            339,
            352,
            353,
            376,
            402,
            8211,
            8212,
            8216,
            8217,
            8218,
            8220,
            8221,
            8222,
            8224,
            8225,
            8226,
            8230,
            8240,
            8364,
            8482
        ]
        if (code < 0x0080 || code >= 0x00A0 && code <= 0x00FF || zeroCodes.indexOf(code) !== -1) {
            return 0
        }
        if (code < 0x0800) {
            return 1
        }
        return 2
    }
    var error = function (type,
                          msg, filename, line) {
        throw new $global[type](msg, filename, line)
    }
    var readUntil = function (data, offset, stopchr) {
        var i = 2
        var buf = []
        var chr = data.slice(offset, offset + 1)

        while (chr !== stopchr) {
            if ((i + offset) > data.length) {
                error('Error', 'Invalid')
            }
            buf.push(chr)
            chr = data.slice(offset + (i - 1), offset + i)
            i += 1
        }
        return [buf.length, buf.join('')]
    }
    var readChrs = function (data, offset, length) {
        var i, chr, buf

        buf = []
        for (i = 0; i < length; i++) {
            chr = data.slice(offset + (i - 1), offset + i)
            buf.push(chr)
            length -= utf8Overhead(chr)
        }
        return [buf.length, buf.join('')]
    }
    var _unserialize = function (data, offset) {
        var dtype
        var dataoffset
        var keyandchrs
        var keys
        var contig
        var length
        var array
        var readdata
        var readData
        var ccount
        var stringlength
        var i
        var key
        var kprops
        var kchrs
        var vprops
        var vchrs
        var value
        var chrs = 0
        var typeconvert = function (x) {
            return x
        }

        if (!offset) {
            offset = 0
        }
        dtype = (data.slice(offset, offset + 1)).toLowerCase()

        dataoffset = offset + 2

        switch (dtype) {
            case 'i':
                typeconvert = function (x) {
                    return parseInt(x, 10)
                }
                readData = readUntil(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'b':
                typeconvert = function (x) {
                    return parseInt(x, 10) !== 0
                }
                readData = readUntil(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'd':
                typeconvert = function (x) {
                    return parseFloat(x)
                }
                readData = readUntil(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'n':
                readdata = null
                break
            case 's':
                ccount = readUntil(data, dataoffset, ':')
                chrs = ccount[0]
                stringlength = ccount[1]
                dataoffset += chrs + 2

                readData = readChrs(data, dataoffset + 1, parseInt(stringlength, 10))
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 2
                if (chrs !== parseInt(stringlength, 10) && chrs !== readdata.length) {
                    error('SyntaxError', 'String length mismatch')
                }
                break
            case 'a':
                readdata = {}

                keyandchrs = readUntil(data, dataoffset, ':')
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

                    if (key !== i) {
                        contig = false
                    }

                    readdata[key] = value
                }

                if (contig) {
                    array = new Array(length)
                    for (i = 0; i < length; i++) {
                        array[i] = readdata[i]
                    }
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