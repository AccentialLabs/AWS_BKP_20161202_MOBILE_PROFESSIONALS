$(document).ready(function () {
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";
    sendRequest();

});

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
        data: postData,
        'beforeSend' : function(xhr) {
            xhr.overrideMimeType("text/plain; charset=iso-8859-1");
        },
        dataType: "html"
    }).done(function (result) {

        var objReturn = JSON.parse(JSON.stringify(result));
        var decodeObjReturn = Base64.decode(objReturn);

        var convertedReturn = (JSON.parse(decodeObjReturn));
        var stringobj = "";
        var resultado = " ";

        for (var i = 0; i < convertedReturn.length; i++) {
            resultado = convertedReturn[i];
            var valorDaDiv = ($("#id"+resultado.Company.id).text());
            console.log(valorDaDiv);


            var midstring;

            var search2 = search.toUpperCase();
            var valorDaDiv2 = valorDaDiv.toUpperCase();

            if (valorDaDiv2.search(search2) != -1) {
                midstring = 'ENCONTRADO ';
                $("#id"+resultado.Company.id).removeClass('hide');

                $(".bottomLine2").removeClass('hide');
            } else {
                midstring = 'NÃO ENCONTRADO ';
                $("#id"+resultado.Company.id).addClass('hide');
                $(".bottomLine2").addClass('hide');
            }

            console.log(midstring + search2);

        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}

function Click(business){


    $.cookieStorage.set(business);


    if ($.cookieStorage.isSet('Company')) {

        window.location.href = "class_list.html";

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
function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}
function sendRequest(){
    var query = 'SELECT DISTINCT company_id  FROM companies_users CompaniesUser WHERE status  = "ACTIVE" and user_id = ' + $.cookieStorage.get('SecondaryUser').id;

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
        data: postDatas,
        'beforeSend' : function(xhr) {
            xhr.overrideMimeType("text/plain; charset=iso-8859-1");
        },
        dataType: "html"

    }).done(function (result) {

        if(result!=""){
        var objReturns = JSON.parse(JSON.stringify(result));
        var decodeObjReturns = Base64.decode(objReturns);
        var convertedReturns = JSON.parse(decodeObjReturns);
        var convertedReturns2 = (convertedReturns);

        var idcompanie = 0;

        for(var i=0;i<convertedReturns2.length;i++) {
            idcompanie = convertedReturns2[i];
            console.log(idcompanie);
            idcompanielast = idcompanie.CompaniesUser.company_id;
            var conditionsCompany = {
                'Company': {
                    'conditions': {
                        'Company.id':idcompanielast,
                        'Company.status':'ACTIVE'
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
                data: postDataCompany,
                'beforeSend' : function(xhr) {
                    xhr.overrideMimeType("text/plain; charset=iso-8859-1");
                },
                dataType: "html"
            }).done(function (result) {
                if(result!= ''){


                var objReturnCompany = JSON.parse(JSON.stringify(result));
                var decodeObjReturnCompany = Base64.decode(objReturnCompany);
                var convertedReturnCompany = JSON.parse(decodeObjReturnCompany);

                    var convertedReturns2Company = (convertedReturnCompany);



                var objReturn1 = JSON.stringify(convertedReturns2Company);

                if(convertedReturns2Company !=false){
                    var logo = convertedReturns2Company.Company.logo;
                if(logo == 'UPLOAD_ERROR'){
                    logo = 'img/icons/Icon_-_Imagem_indisponivel.png'
                }


                $("#conteudo").append("<div class='row centerLogoJezzy' id='id"+convertedReturns2Company.Company.id+"'><div class='logo'><img src='"+logo+"'></div><div id='service_class' class='tablecontent' onclick='Click("+objReturn1+")'>"+convertedReturns2Company.Company.fancy_name+"</div></div><div class='bottomLine2'></div>");
                }
                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
        }
        }else{
            window.location.href="bussiness_list.html";
        }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
function serialize (mixed_value) {
    //  discuss at: http://phpjs.org/functions/serialize/
    // original by: Arpad Ray (mailto:arpad@php.net)
    // improved by: Dino
    // improved by: Le Torbi (http://www.letorbi.de/)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)
    // bugfixed by: Andrej Pavlovic
    // bugfixed by: Garagoth
    // bugfixed by: Russell Walker (http://www.nbill.co.uk/)
    // bugfixed by: Jamie Beck (http://www.terabit.ca/)
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)
    // bugfixed by: Ben (http://benblume.co.uk/)
    // bugfixed by: Codestar (http://codestarlive.com/)
    //    input by: DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html)
    //    input by: Martin (http://www.erlenwiese.de/)
    //        note: We feel the main purpose of this function should be to ease the transport of data between php & js
    //        note: Aiming for PHP-compatibility, we have to translate objects to arrays
    //   example 1: serialize(['Kevin', 'van', 'Zonneveld']);
    //   returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
    //   example 2: serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});
    //   returns 2: 'a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}'

    var val, key, okey,
        ktype = '',
        vals = '',
        count = 0,
        _utf8Size = function (str) {
            var size = 0,
                i = 0,
                l = str.length,
                code = ''
            for (i = 0; i < l; i++) {
                code = str.charCodeAt(i)
                if (code < 0x0080) {
                    size += 1
                } else if (code < 0x0800) {
                    size += 2
                } else {
                    size += 3
                }
            }
            return size
        },
        _getType = function (inp) {
            var match, key, cons, types, type = typeof inp

            if (type === 'object' && !inp) {
                return 'null'
            }

            if (type === 'object') {
                if (!inp.constructor) {
                    return 'object'
                }
                cons = inp.constructor.toString()
                match = cons.match(/(\w+)\(/)
                if (match) {
                    cons = match[1].toLowerCase()
                }
                types = ['boolean', 'number', 'string', 'array']
                for (key in types) {
                    if (cons === types[key]) {
                        type = types[key]
                        break
                    }
                }
            }
            return type
        },
        type = _getType(mixed_value)

    switch (type) {
        case 'function':
            val = ''
            break
        case 'boolean':
            val = 'b:' + (mixed_value ? '1' : '0')
            break
        case 'number':
            val = (Math.round(mixed_value) === mixed_value ? 'i' : 'd') + ':' + mixed_value
            break
        case 'string':
            val = 's:' + _utf8Size(mixed_value) + ':"' + mixed_value + '"'
            break
        case 'array':
        case 'object':
            val = 'a'
            /*
             if (type === 'object') {
             var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);
             if (objname == undefined) {
             return;
             }
             objname[1] = this.serialize(objname[1]);
             val = 'O' + objname[1].substring(1, objname[1].length - 1);
             }
             */

            for (key in mixed_value) {
                if (mixed_value.hasOwnProperty(key)) {
                    ktype = _getType(mixed_value[key])
                    if (ktype === 'function') {
                        continue
                    }

                    okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key)
                    vals += this.serialize(okey) + this.serialize(mixed_value[key])
                    count++
                }
            }
            val += ':' + count + ':{' + vals + '}'
            break
        case 'undefined':
        // Fall-through
        default:
            // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP
            val = 'N'
            break
    }
    if (type !== 'object' && type !== 'array') {
        val += ';'
    }
    return val
}
function utf8_decode (str_data) {
    //  discuss at: http://phpjs.org/functions/utf8_decode/
    // original by: Webtoolkit.info (http://www.webtoolkit.info/)
    //    input by: Aman Gupta
    //    input by: Brett Zamir (http://brett-zamir.me)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Norman "zEh" Fuchs
    // bugfixed by: hitwork
    // bugfixed by: Onno Marsman
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: kirilloid
    // bugfixed by: w35l3y (http://www.wesley.eti.br)
    //   example 1: utf8_decode('Kevin van Zonneveld');
    //   returns 1: 'Kevin van Zonneveld'

    var tmp_arr = [],
        i = 0,
        c1 = 0,
        seqlen = 0

    str_data += ''

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i) & 0xFF
        seqlen = 0

        // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
        if (c1 <= 0xBF) {
            c1 = (c1 & 0x7F)
            seqlen = 1
        } else if (c1 <= 0xDF) {
            c1 = (c1 & 0x1F)
            seqlen = 2
        } else if (c1 <= 0xEF) {
            c1 = (c1 & 0x0F)
            seqlen = 3
        } else {
            c1 = (c1 & 0x07)
            seqlen = 4
        }

        for (var ai = 1; ai < seqlen; ++ai) {
            c1 = ((c1 << 0x06) | (str_data.charCodeAt(ai + i) & 0x3F))
        }

        if (seqlen == 4) {
            c1 -= 0x10000
            tmp_arr.push(String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF)), String.fromCharCode(0xDC00 | (c1 & 0x3FF)))
        } else {
            tmp_arr.push(String.fromCharCode(c1))
        }

        i += seqlen
    }

    return tmp_arr.join('')
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

function json_encode (mixed_val) {
    //       discuss at: http://phpjs.org/functions/json_encode/
    //      original by: Public Domain (http://www.json.org/json2.js)
    // reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Michael White
    //         input by: felix
    //      bugfixed by: Brett Zamir (http://brett-zamir.me)
    //        example 1: json_encode('Kevin');
    //        returns 1: '"Kevin"'

    /*
     http://www.JSON.org/json2.js
     2008-11-19
     Public Domain.
     NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
     See http://www.JSON.org/js.html
     */
    var retVal, json = this.window.JSON
    try {
        if (typeof json === 'object' && typeof json.stringify === 'function') {
            // Errors will not be caught here if our own equivalent to resource
            retVal = json.stringify(mixed_val)
            //  (an instance of PHPJS_Resource) is used
            if (retVal === undefined) {
                throw new SyntaxError('json_encode')
            }
            return retVal
        }

        var value = mixed_val

        var quote = function (string) {
            var escapable =
                /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
            var meta = {
                // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            }

            escapable.lastIndex = 0
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a]
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0)
                    .toString(16))
                    .slice(-4)
            }) + '"' : '"' + string + '"'
        }

        var str = function (key, holder) {
            var gap = ''
            var indent = '    '
            // The loop counter.
            var i = 0
            // The member key.
            var k = ''
            // The member value.
            var v = ''
            var length = 0
            var mind = gap
            var partial = []
            var value = holder[key]

            // If the value has a toJSON method, call it to obtain a replacement value.
            if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                value = value.toJSON(key)
            }

            // What happens next depends on the value's type.
            switch (typeof value) {
                case 'string':
                    return quote(value)

                case 'number':
                    // JSON numbers must be finite. Encode non-finite numbers as null.
                    return isFinite(value) ? String(value) : 'null'

                case 'boolean':
                case 'null':
                    // If the value is a boolean or null, convert it to a string. Note:
                    // typeof null does not produce 'null'. The case is included here in
                    // the remote chance that this gets fixed someday.
                    return String(value)

                case 'object':
                    // If the type is 'object', we might be dealing with an object or an array or
                    // null.
                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.
                    if (!value) {
                        return 'null'
                    }
                    if ((this.PHPJS_Resource && value instanceof this.PHPJS_Resource) || (window.PHPJS_Resource &&
                        value instanceof window.PHPJS_Resource)) {
                        throw new SyntaxError('json_encode')
                    }

                    // Make an array to hold the partial results of stringifying this object value.
                    gap += indent
                    partial = []

                    // Is the value an array?
                    if (Object.prototype.toString.apply(value) === '[object Array]') {
                        // The value is an array. Stringify every element. Use null as a placeholder
                        // for non-JSON values.
                        length = value.length
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null'
                        }

                        // Join all of the elements together, separated with commas, and wrap them in
                        // brackets.
                        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind +
                        ']' : '[' + partial.join(',') + ']'
                        gap = mind
                        return v
                    }

                    // Iterate through all of the keys in the object.
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value)
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }

                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.
                    v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                    '{' + partial.join(',') + '}'
                    gap = mind
                    return v
                case 'undefined':
                // Fall-through
                case 'function':
                // Fall-through
                default:
                    throw new SyntaxError('json_encode')
            }
        }

        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.
        return str('', {
            '': value
        })

    } catch (err) {
        // Todo: ensure error handling above throws a SyntaxError in all cases where it could
        // (i.e., when the JSON global is not available and there is an error)
        if (!(err instanceof SyntaxError)) {
            throw new Error('Unexpected error type in json_encode()')
        }
        this.php_js = this.php_js || {}
        // usable by json_last_error()
        this.php_js.last_error_json = 4
        return null
    }
}