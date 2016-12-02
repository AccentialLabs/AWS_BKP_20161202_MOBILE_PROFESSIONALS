var idcompany = "";

var lat = null;
var lng = null;
var map = null;
var geocoder = null;
var marker = null;
var cep = '';
$(document).ready(function() {
    $("#acc1").click(function(){
        if($("#acc1").hasClass("active")){
            $("#acc1").removeClass("active");
            $("#panel1").addClass("hide");
            return false;
        }else{
            $("#acc1").addClass("active");
            $("#panel1").removeClass("hide");
            return false;
        }

    });
    $("#acc2").click(function(){
        if($("#acc2").hasClass("active")){
            $("#acc2").removeClass("active");
            $("#panel2").addClass("hide");
            return false;
        }else{
            $("#acc2").addClass("active");
            $("#panel2").removeClass("hide");
            return false;
        }

    });
    $("#acc3").click(function(){
        if($("#acc3").hasClass("active")){
            $("#acc3").removeClass("active");
            $("#panel3").addClass("hide");
            return false;
        }else{
            $("#acc3").addClass("active");
            $("#panel3").removeClass("hide");
            return false;
        }

    });

    $("#acc4").click(function(){
        if($("#acc4").hasClass("active")){
            $("#acc4").removeClass("active");
            $("#panel4").addClass("hide");
            return false;
        }else{
            $("#acc4").addClass("active");
            $("#panel4").removeClass("hide");
            return false;
        }

    });

    idcompany = $.cookieStorage.get('Company').id;
    sendRequest();

    document.getElementById("userName").innerText = $.cookieStorage.get('User').name;

    lat = $('#lat').val();
    lng = $('#long').val();

});
function voltarBusiness(){
    window.history.go(-1);
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

function initialize() {


    geocoder = new google.maps.Geocoder();

    var latLng = '';
    if(lat !='' && lng != '')
    {
        latLng = new google.maps.LatLng(lat,lng);
    }
    else
    {
        latLng = new google.maps.LatLng(0.0);
    }

    var mapCanvas = document.getElementById('map');
    var myOptions = {
        center: latLng,
        zoom:17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(mapCanvas, myOptions);


    marker = new google.maps.Marker({
        map: map,
        position: latLng,
        draggable: false,
        icon: 'img/icons/Widgetgoogle-01.png'

    });



    updatePosition(latLng);



}
function updatePosition(latLng)
{
    $('#lat').val(latLng.lat());
    $('#long').val(latLng.lng());

}


function codeAddress() {

    var address = document.getElementById("direccion").value;

    geocoder.geocode( {
        'address': address
    }, function(results, status) {


        if (status == google.maps.GeocoderStatus.OK) {

            map.setCenter(results[0].geometry.location);

            marker.setPosition(results[0].geometry.location);

            updatePosition(results[0].geometry.location);


            google.maps.event.addListener(marker, 'dragend', function(){
                updatePosition(marker.getPosition());
            });
        } else {
            generateModalAlert("Salão sem endereço válido cadastrado!");
            $('#mymodal').modal('show');
        }
    });
}




function sendRequest(){
    var conditions = {
        'Company': {
            'conditions':{
                'Company.id':idcompany,
                'Company.status':'ACTIVE'
            }

        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://'+api+'//companies/get/first/' + createToken();


    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {

        var objReturn = JSON.parse(JSON.stringify(result));
        var decodeObjReturn = Base64.decode(objReturn);
        var convertedReturn = (JSON.parse(decodeObjReturn));



        cep = convertedReturn.Company.zip_code;
        $("#direccion").attr('value', cep + ", " + convertedReturn.Company.address + ", " + convertedReturn.Company.number+ ", " + convertedReturn.Company.city+ ", " + convertedReturn.Company.state + ", Brasil");


        $("#corporatename").append(convertedReturn.Company.fancy_name);
        $("#corporateaddress").append(convertedReturn.Company.address+ ', ' + convertedReturn.Company.number+ ' - ' +convertedReturn.Company.district+ ', '+convertedReturn.Company.city+' - ' +convertedReturn.Company.state + "</br>" +  convertedReturn.Company.zip_code);
        $("#corporateemail").append('Email: <a href="mailto:'+convertedReturn.Company.email+'">'+convertedReturn.Company.email+'</a>');
        $("#corporatephone").append("Tel: <a href='tel:"+(convertedReturn.Company.phone).trim()+"'>"+convertedReturn.Company.phone+"</a><br>Tel: <a href='tel:"+(convertedReturn.Company.phone_2).trim()+"'>"+convertedReturn.Company.phone_2+"</a>");
        $("#corporatehours").append("Site: <a href='linkto:"+convertedReturn.Company.site_url+"'>"+convertedReturn.Company.site_url+"</a>");
        $("#corporatelogo").attr('src', convertedReturn.Company.logo);
        var abertura = (convertedReturn.Company.open_hour).split(":");
        var fechamento = (convertedReturn.Company.close_hour).split(":");
        var diasabertura = convertedReturn.Company.work_days;

        $.cookieStorage.set(convertedReturn);

        if (diasabertura == "seg,ter,qua,qui,sex") {
            diasabertura = "Seg a Sex";
        } else if (diasabertura == "ter,qua,qui,sex,sab,dom") {
            diasabertura = "Ter a Dom";
        } else if (diasabertura == "seg,ter,qua,qui,sex,sab,dom") {
            diasabertura = "Todos os Dias";
        }else if (diasabertura == "ter,qua,qui,sex,sab") {
            diasabertura = "Ter a Sab";
        }else if (diasabertura == "qua,qui,sex,sab,dom") {
            diasabertura = "Qua a Dom";
        }else if (diasabertura == "qui,sex,sab,dom") {
            diasabertura = "Qui a Dom";
        }else if (diasabertura == "sex,sab,dom") {
            diasabertura = "Sex a Dom";
        }else if (diasabertura == "sab,dom") {
            diasabertura = "Sab e Dom";
        }else if (diasabertura == "seg,ter,qua") {
            diasabertura = "Seg a Qua";
        }else if (diasabertura == "seg,ter,qua,qui") {
            diasabertura = "Seg a Qui";
        }else if (diasabertura == "ter,qua,qui,sex") {
            diasabertura = "Ter a Sex";
        }else if (diasabertura == "sex,sab,dom,seg") {
            diasabertura = "Sex a Seg";
        }
        $("#corporatedays").append(diasabertura);
        $("#corporatetime").append(abertura[0] + ":" + abertura[1] + "h" + " - " + fechamento[0] + ":" + fechamento[1] + "h");

        var query = 'SELECT * FROM subclasses INNER JOIN services ON services.subclasse_id = subclasses.id INNER JOIN companies ON services.companie_id = companies.id WHERE companies.id =' + idcompany + ";";
        var conditions = {
            'General': {
                'query': query

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
        }).done(function (result) {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));

            for(var i = 0;i<convertedReturn.length;i++){
                $("#services").append(convertedReturn[i].subclasses.name+"</br>");
            }


        initialize();
        codeAddress();
        return false;


        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });


}

function GoogleGo(){

    var cep = $.cookieStorage.get('Company').zip_code;
    var rua = $.cookieStorage.get('Company').address;
    var estado = $.cookieStorage.get('Company').state;
    var number = $.cookieStorage.get('Company').number;
    if (navigator.appVersion.indexOf("Android")!=-1) {
		
        window.location.href=mapsios+cep+','+estado+','+rua+','+number+', "_blank"';
    }else{
        window.open(mapsgeral+cep+','+estado+','+rua+','+number+'', '_blank');
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
function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}