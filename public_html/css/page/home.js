var limitarcaracteres = 16;
var agora = moment(new Date());
agora  = agora.year()+"-"+((agora.month()/1)+1)+"-"+agora.date() + " " + agora.hour()+":"+agora.minutes()+":00";
var query = '';
var HTML = '';

function verificaSenha(){
    var password = (document.getElementById("password").value).trim();
    var confirmpassword = (document.getElementById("confirmpassword").value).trim();
    if(password != confirmpassword){
        $("#info").removeClass('hide');
    } else if(password == confirmpassword){
        $("#info").addClass('hide');
    }

}
function verificaQtdAgendamentos(){
    var Query = "SELECT count(*) as QtdServicosPendentes FROM schedules WHERE schedules.status = 1 and secondary_user_id = "+$.cookieStorage.get('SecondaryUser').id+" and DATE(schedules.date) < DATE(NOW()) or status = 1 and secondary_user_id = "+$.cookieStorage.get('SecondaryUser').id+" and DATE(schedules.date) = DATE(NOW()) and HOUR(schedules.time_end) <= HOUR(NOW());";

    var conditions = {
        'User':{
            'query':Query
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

            var objReturn = (JSON.parse(Base64.decode(JSON.parse(JSON.stringify(result)))));
            var qtd = (objReturn[0][0].QtdServicosPendentes);
            if(qtd!=0){
                $("#addBadge").append('<span class="badge badge2">'+qtd+'</span>');
            }


        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
function verificaSeHaAgendamentos(){
    var date = moment(new Date());
    var month = date.month();
    var day = date.date();
    // AGENDAMENTOS CONFIRMADOS
    var Query = 'SELECT Schedules.date, Schedules.id, Schedules.user_id, Schedules.time_begin, Schedules.time_end, Schedules.status, Schedules.subclasse_name, Schedules.voucher_id, User.name, User.gender, User.photo, User.birthday, FbProfile.chemistry, FbProfile.hair_type, Company.fancy_name FROM schedules Schedules INNER JOIN users User ON User.id = Schedules.user_id INNER JOIN companies Company ON Schedules.companie_id = Company.id INNER JOIN facebook_profiles FbProfile ON FbProfile.user_id = User.id WHERE MONTH(Schedules.date) = '+((month/1)+1)+' and DAYOFMONTH(Schedules.date) = ' + day + ' and Schedules.status = 1 and Schedules.secondary_user_id = ' + $.cookieStorage.get('SecondaryUser').id+' UNION ALL SELECT SchedulesSolicitation.date, SchedulesSolicitation.id, SchedulesSolicitation.user_id, SchedulesSolicitation.time_begin, SchedulesSolicitation.time_end, SchedulesSolicitation.status, SchedulesSolicitation.service_name, SchedulesSolicitation.voucher_id, User.name, User.gender, User.photo, User.birthday, FbProfile.chemistry, FbProfile.hair_type, Company.fancy_name FROM schedules_solicitation SchedulesSolicitation INNER JOIN users User ON User.id = SchedulesSolicitation.user_id INNER JOIN companies Company ON SchedulesSolicitation.company_id = Company.id INNER JOIN facebook_profiles FbProfile ON FbProfile.user_id = User.id WHERE MONTH(SchedulesSolicitation.date) = '+((month/1)+1)+' and DAYOFMONTH(SchedulesSolicitation.date) =  ' + day + ' and SchedulesSolicitation.secundary_user_id = ' + $.cookieStorage.get('SecondaryUser').id+' and SchedulesSolicitation.status = "WAITING_COMPANY_RESPONSE" ORDER BY time_begin;';


    var conditions = {
        'User':{
            'query':Query
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
        if(result == ''){
            $("#prev").click();
        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
function verificaSenha2(){
    var password = (document.getElementById("password").value).trim();
    var confirmpassword = (document.getElementById("confirmpassword").value).trim();
    if(password != confirmpassword && password.length >= confirmpassword.length){
        $("#info").removeClass('hide');
    } else if(password == confirmpassword){
        $("#info").addClass('hide');
    }

}
$(document).ready(function () {
    $('.carousel').carousel({
        interval: false
    });
    verificaQtdAgendamentos();
    verificaSeHaAgendamentos();
    var hammertime = new Hammer(document.getElementById('swipeaction'));
    var hammertime2 = new Hammer(document.getElementById('swipeactionright'));
    //hammertime.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL }));
    hammertime.on('swipeleft', function(ev) {
       // alert('esquerda');
        $("#next").click();
        $("#1").removeClass('active');
        $("#2").addClass('active');
        //$("#swipeaction" ).show('slide', { direction: "left" }, 2000);
        //$("#swipeaction").toggle("left");
      //  ev.preventDefault();
      // $("#swipeaction").addClass('hide');
    });
    hammertime2.on('swiperight', function(ev) {
      //  alert('direita');
        $("#prev").click();
        $("#2").removeClass('active');
        $("#1").addClass('active');
        //$("#swipeaction" ).show('slide', { direction: "left" }, 2000);
        //$("#swipeaction").toggle("left");
        //  ev.preventDefault();
        // $("#swipeaction").addClass('hide');
    });

    if($.cookieStorage.get('SecondaryUser').first_login == 0){
        $("#buttonmodalfirstlogin").click();
    }
    if(localStorage.getItem('niverseen') == 0){
        localStorage.removeItem('niverseen');
        localStorage.setItem('niverseen', 1);
    }else{
        $("#birthday").addClass('hide');
    }

   // createNotificationsSchedules();

    $("#savepassword").click(function(){
        if((document.getElementById("password").value).trim() == '' || (document.getElementById("confirmpassword").value).trim() == '' || (document.getElementById("confirmpassword").value).trim() != (document.getElementById("password").value).trim()){
            generateModalAlert(utf8_decode("As duas senhas precisam estar preenchidas igualmente!"));
            $('#mymodal').modal('show');
        }else{
            newSenha(md5((document.getElementById("password").value).trim() ));

        }
    });
    $("#niver").mask("99/99/9999");
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";
     $.cookieStorage.remove("Company");
     $.cookieStorage.remove("Offer");
     $.cookieStorage.remove("subclasses");
     $.cookieStorage.remove("classes");
     $.cookieStorage.remove("SchedulesSolicitation");
     $.cookieStorage.remove("parcels");
     $.cookieStorage.remove("shipping_value");
     $.cookieStorage.remove('paginaanterior');
     $.cookieStorage.remove('address');
     $.cookieStorage.remove('city');
     $.cookieStorage.remove('complement');
     $.cookieStorage.remove('district');
     $.cookieStorage.remove('metrics');
     $.cookieStorage.remove('number');
     $.cookieStorage.remove('quantidade');
     $.cookieStorage.remove('shipping_days');
     $.cookieStorage.remove('shipping_type');
     $.cookieStorage.remove('state');
     $.cookieStorage.remove('total_value');
     $.cookieStorage.remove('usuario');
     $.cookieStorage.remove('zip_code');
     $.cookieStorage.remove("Checkout");
     $.cookieStorage.remove("Schedules");
     $.cookieStorage.remove("Vouchers");
     $.cookieStorage.remove("secondary_users");
     $.cookieStorage.remove("service_secondary_users");
     $.cookieStorage.remove("services");

    Schedules();
    qtdVendasMes();
	CarregaAgendamentos();

    $("#agendamentos").click(function(){
        window.location.href = 'schedules_display.html';
    });
    $("#aniversarios").click(function(){
        window.location.href = 'offer_display.html';
    });
    $("#comissao").click(function(){
        window.location.href = 'offer_history.html';
    });

    $("#userName").click(function (){
            window.location.href = 'my_profile.html';
    });
    $("#calendarDisplayLink").click(function (){


        var query = 'SELECT * FROM companies_users WHERE status = "ACTIVE" and user_id = ' + $.cookieStorage.get('SecondaryUser').id;

        var conditions = {
            'General':{
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
            data: postData,
            async: false
        }).done(function(result) {
            if(result != 'ImE6MDp7fSI='){
                $.dialog({
                    title: '',
                    content: '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><button class="btn" onclick="NovoAgendamento();">Novo Agendamento</button></br></br><button class="btn" onclick="AgendamentosExistentes();" >Agendamentos Existentes</button></br></br><button class="btn" onclick="AgendamentoComVoucher();">Agendar com Voucher</button>',
                    animation: 'zoom',
                    closeIcon:false,
                    closeAnimation: 'scale',
                    animationBounce: 1.5,
                    backgroundDismiss:true,
                    theme: 'supervan',
                    keyboardEnabled: true

                });
            }else{
                var salao = 'salão';
                var servicos = 'serviço.';
                var voce = 'Você';
                var saloes = 'salões';
                $.dialog({
                    title: 'Sem '+utf8_decode(saloes)+' favoritos.</br>'+utf8_decode(voce)+' precisa seguir um '+utf8_decode(salao)+'</br>para agendar um '+utf8_decode(servicos),
                    content: '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><button class="btn" onclick="mudatela(\'bussiness_list.html\');">Seguir um '+utf8_decode(salao)+' existente</button></br></br><button class="btn" onclick="mudatela(\'formcontactcompany.html\');" >Indicar meu '+utf8_decode(salao)+'</button>',
                    animation: 'zoom',
                    closeIcon:false,
                    closeAnimation: 'scale',
                    animationBounce: 1.5,
                    backgroundDismiss:true,
                    theme: 'supervan',
                    keyboardEnabled: true

                });
            }


        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });




    });

    $("#ColorIcon").click(function (){
        generateModalAlert(utf8_decode("Em construção"));
        $('#mymodal').modal('show');
    });
    
    $("#RelatorioIcon").click(function (){
        window.location.href = "offer_history.html";
    });

    $("#TutoriaisIcon").click(function (){
        generateModalAlert(utf8_decode("Em construção"));
        $('#mymodal').modal('show');
    });

    $("#NewsIcon").click(function (){
            window.location.href = "news.html";
    });
    $("#ClientesIcon").click(function (){
            window.location.href = "secondary_users_clients.html";
    });
    $("#BirthdayIcon").click(function (){
            window.location.href = "offer_display.html";
    });
    $("#servicesHistoryLink").click(function () {
        window.location.href = "services_history.html";
    });
    $("#AgendaIcon").click(function (){
            window.location.href = "schedules_display.html";
    });

});
function mudatela(tela){
    window.location.href = tela;
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

function NovoAgendamento(){
    window.location.href = "company_selection.html";
}
function AgendamentosExistentes(){
    window.location.href = "schedules_display.html";
}
function AgendamentoComVoucher(){
    window.location.href = "vouchers_list.html";
}
function meuLog(msg) {
    div = document.body;
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


function Sair(){
    $.cookieStorage.remove('SecondaryUser');
    $.removeAllStorages();

    window.location.href = 'https://'+ip+'/jezzy-mobile-professionals/public_html/index.html';
}

function createNotificationsSchedules(){
   // var queryMENSAL = "SELECT * FROM schedules Schedules INNER JOIN secondary_users SecondaryUser ON Schedules.secondary_user_id = SecondaryUser.id INNER JOIN schedules_solicitation ON schedules.secondary_user_id = SecondaryUser.id WHERE SecondaryUser.id = " + $.cookieStorage.get('SecondaryUser').id;
  //  //console.log(queryMENSAL);
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
        if (result != "") {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = (JSON.parse(decodeObjReturn));



        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
function newSenha(senha){

    var queryMENSAL = "UPDATE secondary_users SET password = \""+senha+"\",  first_login = 1 WHERE secondary_users.id = " + $.cookieStorage.get('SecondaryUser').id;

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

        //var queryMENSAL = "SELECT * FROM secondary_users SecondaryUser WHERE SecondaryUser.excluded = 0 and SecondaryUser.id = " + $.cookieStorage.get('SecondaryUser').id;
        var queryMENSAL = "SELECT * FROM secondary_users SecondaryUser WHERE SecondaryUser.id = " + $.cookieStorage.get('SecondaryUser').id;

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


            if (result != "") {
                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);

                var convertedReturn = (JSON.parse(decodeObjReturn));


                $.cookieStorage.remove('SecondaryUser');
                $.cookieStorage.set(convertedReturn[0]);


                if ($.cookieStorage.isSet('SecondaryUser')) {

                    localStorage.setItem('niverseen', '0');
                    $('#myModal').modal('hide');
                    window.location.href='https://'+ip+'/jezzy-mobile-professionals/public_html/home.html';

                }
            }

        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });


    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}


function OpenModal(){
    var salao = 'salão';
    var servicos = 'serviço.';
    var voce = 'Você';
    var saloes = 'salões';
    $.dialog({
        title: 'Sem '+utf8_decode(saloes)+' favoritos.</br>'+utf8_decode(voce)+' precisa seguir um '+utf8_decode(salao)+'</br>para agendar um '+utf8_decode(servicos),
        content: '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><button class="btn" onclick="mudatela(\'bussiness_list.html\');">Seguir um '+utf8_decode(salao)+' existente</button></br></br><button class="btn" onclick="mudatela(\'formcontactcompany.html\');" >Indicar meu '+utf8_decode(salao)+'</button>',
        animation: 'zoom',
        closeIcon:false,
        closeAnimation: 'scale',
        animationBounce: 1.5,
        backgroundDismiss:true,
        theme: 'supervan',
        keyboardEnabled: true

    });
}
function monetary(value){
    return 'R$ ' +  parseFloat(value).toFixed(2).replace('.',',');
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

function Schedules() {
    var date = moment(new Date());
    var month = date.month();
    var day = date.date();

    var queryMENSAL = "SELECT (SELECT  count(*) FROM schedules inner join secondary_users on secondary_users.id = schedules.secondary_user_id WHERE  schedules.companie_id = "+$.cookieStorage.get('companies').id+" and MONTH(schedules.date) = "+((month/1)+1)+" and schedules.status!= 2 and secondary_users.id = "+$.cookieStorage.get('SecondaryUser').id+") AS total_mensal,(SELECT  count(*) FROM schedules inner join secondary_users on secondary_users.id = schedules.secondary_user_id WHERE schedules.status!= 2 and schedules.companie_id = "+$.cookieStorage.get('companies').id+" and secondary_users.id = "+$.cookieStorage.get('SecondaryUser').id+" and MONTH(schedules.date) = "+((month/1)+1)+"  AND DAYOFMONTH(schedules.date) >= "+day+") AS total_passado,(SELECT  count(*) FROM schedules inner join secondary_users on secondary_users.id = schedules.secondary_user_id WHERE schedules.status!= 2 and schedules.companie_id = "+$.cookieStorage.get('companies').id+" and secondary_users.id = "+$.cookieStorage.get('SecondaryUser').id+" and MONTH(schedules.date) = "+((month/1)+1)+" AND YEARWEEK(schedules.date)=YEARWEEK(NOW())) AS total_semanal;";

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

        var objReturn = JSON.parse(Base64.decode(result));
        $("#agendamentospendentesnestemes").html(objReturn[0][0].total_passado);
        $("#agendamentosnestemes").html("/"+objReturn[0][0].total_mensal);
        $("#agendamentosnestasemana").html(objReturn[0][0].total_semanal);




    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });



    var query = "SELECT count(DISTINCT user_id) AS birthday FROM users inner join schedules ON schedules.secondary_user_id = "+$.cookieStorage.get('SecondaryUser').id+" WHERE schedules.user_id = users.id and MONTH(users.birthday) = "+((month/1)+1) + " and DAYOFMONTH(users.birthday) = "+day+"";

    var conditions = {
        'General':{
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
        data: postData,
        async: false
    }).done(function(result) {
        var objReturn = JSON.parse(Base64.decode(result));
        $("#todaysbirthdays").attr('onclick', 'window.location.href = "offer_display.html"');
        if(unserialize(objReturn)[0][0].birthday == '1'){
            $("#todaysbirthdays").html(unserialize(objReturn)[0][0].birthday + ' aniversariante hoje!');

        }else if(unserialize(objReturn)[0][0].birthday != '1' && unserialize(objReturn)[0][0].birthday != '0'){
            $("#todaysbirthdays").html(unserialize(objReturn)[0][0].birthday + ' aniversariantes hoje!');
        }else{
            var naoha = utf8_decode('Não há');
            $("#todaysbirthdays").html(naoha+' aniversariantes hoje!');
        }


    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

    var queryMENSAL = "SELECT count(DISTINCT user_id) AS aniversariosdomes FROM users inner join schedules ON schedules.secondary_user_id = "+$.cookieStorage.get('SecondaryUser').id+" WHERE schedules.user_id = users.id and MONTH(users.birthday) = "+((month/1)+1);

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
        $("#allbirthdayinmonth").html("/"+objReturn[0][0].aniversariosdomes);


            var queryMENSAL = "SELECT count(DISTINCT user_id) AS nextaniversariosdomes FROM users inner join schedules ON schedules.secondary_user_id = "+$.cookieStorage.get('SecondaryUser').id+" WHERE schedules.user_id = users.id and MONTH(users.birthday) = "+((month/1)+1) + " and DAYOFMONTH(users.birthday) >=" + day;

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
                $("#nextbirthdayinmonth").html(objReturn[0][0].nextaniversariosdomes);


                var queryMENSAL = "SELECT count(DISTINCT user_id) AS weekbirthdays FROM users inner join schedules ON schedules.secondary_user_id =  "+$.cookieStorage.get('SecondaryUser').id+" WHERE schedules.user_id = users.id and MONTH(users.birthday) = "+((month/1)+1) + " AND YEARWEEK(DATE_ADD(users.birthday,INTERVAL ROUND((YEAR(NOW()) * 10000 + MONTH(NOW()) * 100 + DAY(NOW()) - YEAR(users.birthday) * 10000 - MONTH(users.birthday) * 100 - DAY(users.birthday)) / 10000) YEAR))=YEARWEEK(NOW())";

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
                        $("#weekbirthdays").html(objReturn[0][0].weekbirthdays);
                    }

                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });

            }

        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });
        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });


}
function qtdVendasMes(){
    var date = moment(new Date());
    var month = date.month();
    var day = date.date();
    var queryMENSAL = "select sum(secondary_user_commission)  as sum from financial_parameters_results INNER JOIN checkouts ON checkouts.id = financial_parameters_results.checkout_id WHERE checkouts.payment_state_id = 1 and secondary_user_id = " + $.cookieStorage.get('SecondaryUser').id;
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

            $("#qtdvendas").html(monetary(objReturn[0][0].sum));
            RendaMensal();
        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}



function RendaMensal(){

    var date = moment(new Date());
    var month = date.month();
    var day = date.date();
    var soma = 0;
    var queryMENSAL = "select sum(secondary_user_commission)  as sum from financial_parameters_results INNER JOIN checkouts ON checkouts.id = financial_parameters_results.checkout_id WHERE checkouts.payment_state_id = 4 and secondary_user_id = " + $.cookieStorage.get('SecondaryUser').id;
    console.log(queryMENSAL);
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
            console.log((objReturn[0][0].sum));
            $("#valorcomissao").html(monetary(objReturn[0][0].sum));
        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
function expand(id, service, status, hour){
    if($("#"+id).hasClass('hide')){
        $("#"+id).removeClass('hide');
        $("#hour"+id).html('');
        $("#service"+id).html(service.toUpperCase());
        $("#changesignal"+id).attr('src', 'img/icons/Saiba-menos-313x313.png');
        status = 0;
    }else{
        $("#"+id).addClass('hide');
        $("#hour"+id).html(hour);
        if(service.length > 10){
            service = service.substring(0,18) + "...";
        }
        $("#service"+id).html(service.toUpperCase());
        $("#changesignal"+id).attr('src', 'img/icons/mais.png');
    }

}

var AllSchedules = [];
function CarregaAgendamentos(){
	 var date = moment(new Date());
    var month = date.month();
    var day = date.date();
			// AGENDAMENTOS CONFIRMADOS
			var Query = 'SELECT Schedules.date, Schedules.id, Schedules.user_id, Schedules.time_begin, Schedules.time_end, Schedules.status, Schedules.subclasse_name, Schedules.voucher_id, User.name, User.gender, User.photo, User.birthday, FbProfile.chemistry, FbProfile.hair_type, Company.fancy_name FROM schedules Schedules INNER JOIN users User ON User.id = Schedules.user_id INNER JOIN companies Company ON Schedules.companie_id = Company.id INNER JOIN facebook_profiles FbProfile ON FbProfile.user_id = User.id WHERE MONTH(Schedules.date) = '+((month/1)+1)+' and DAYOFMONTH(Schedules.date) = ' + day + ' and Schedules.status = 1 and Schedules.secondary_user_id = ' + $.cookieStorage.get('SecondaryUser').id+' UNION ALL SELECT SchedulesSolicitation.date, SchedulesSolicitation.id, SchedulesSolicitation.user_id, SchedulesSolicitation.time_begin, SchedulesSolicitation.time_end, SchedulesSolicitation.status, SchedulesSolicitation.service_name, SchedulesSolicitation.voucher_id, User.name, User.gender, User.photo, User.birthday, FbProfile.chemistry, FbProfile.hair_type, Company.fancy_name FROM schedules_solicitation SchedulesSolicitation INNER JOIN users User ON User.id = SchedulesSolicitation.user_id INNER JOIN companies Company ON SchedulesSolicitation.company_id = Company.id INNER JOIN facebook_profiles FbProfile ON FbProfile.user_id = User.id WHERE MONTH(SchedulesSolicitation.date) = '+((month/1)+1)+' and DAYOFMONTH(SchedulesSolicitation.date) =  ' + day + ' and SchedulesSolicitation.secundary_user_id = ' + $.cookieStorage.get('SecondaryUser').id+' and SchedulesSolicitation.status = "WAITING_COMPANY_RESPONSE" and HOUR(SchedulesSolicitation.time_end) >= HOUR(NOW()) and HOUR(SchedulesSolicitation.time_begin) >= HOUR(NOW()) ORDER BY status DESC, time_begin ASC;';
			

                    var conditions = {
                        'User':{
                            'query':Query
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
							
							
							for(var i=0;i<objReturn.length;i++){
								var allkindschedule = objReturn[i];
								var date = allkindschedule[0].date;
								date = (date.split('-')[2]+'/'+date.split('-')[1]);
								var hour = allkindschedule[0].time_begin;
								hour = hour.split(':')[0]+":"+hour.split(':')[1];
								
								
								
								 var data = new moment(allkindschedule[0].date+" "+allkindschedule[0].time_begin);
									var ano = data.get('year');
									var mes = data.get('month');
									var dia = data.get('date');
									var hora =  data.get('hour');
									var minuto = data.get('minute');
				
				var str_month = new String(mes+1);
                if (str_month.length < 2)
                    str_month = 0 + str_month;
                var str_minutos = new String(minuto);
                if (str_minutos.length < 2) {
                    str_minutos = 0 + str_minutos;
                }
				var empresa = allkindschedule[0].fancy_name;
                    var professional = $.cookieStorage.get('SecondaryUser').name;
                    var servico = (allkindschedule[0].subclasse_name);
								if(allkindschedule[0].status == 1 || allkindschedule[0].status == 0){
									
									
                    var textaguardando = 'CONFIRMADO';
                    var aguardando = '<span style="color:green">'+(textaguardando)+'</span>';
                    var serviceinteger = servico;
                    if(servico.length > 10){
                        servico = servico.substring(0,18) + "...";
                    }

                    str_month = new String(mes+1);
                    if (str_month.length < 2)
                        str_month = 0 + str_month;
                    str_minutos = new String(minuto);
                    if (str_minutos.length < 2) {
                        str_minutos = 0 + str_minutos;
                    }
                    var gender = 'Indefinido';
                    if(allkindschedule[0].gender != null){
                         gender = allkindschedule[0].gender;
                        if(gender == 'male'){
                            gender = 'Masculino';
                        }else{
                            gender = 'Feminino';
                        }
                    }


                    var hair = '';
                    var hairsplit = '';
                    var hairs = '';
                    if(allkindschedule[0].hair_type != null){
                        hair = allkindschedule[0].hair_type;
                        hairs = '';
                        hairsplit = hair.split(';');

                        for(var h=0;h<hairsplit.length;h++){
                            if(hairsplit[h] == 'straight'){
                                hairsplit[h] = 'Liso';
                            }else if(hairsplit[h] == 'wavy/curly/kcc'){
                                hairsplit[h] = 'Ondulado/Cacheado/Crespo';
                            }else if(hairsplit[h] == 'color/whitening'){
                                hairsplit[h] = utf8_decode('Coloração/Clareamento');
                            }else if(hairsplit[h] == 'thin'){
                                hairsplit[h] = 'Fino';
                            }else if(hairsplit[h] == 'blond/grey'){
                                hairsplit[h] = 'Loiro/Grisalho';
                            }else if(hairsplit[h] == 'normal') {
                                hairsplit[h] = 'Normal';
                            }else if(hairsplit[h] == 'chemically-treated'){
                                hairsplit[h] = 'Quimicamente Tratado';
                            }else if(hairsplit[h] == 'oily'){
                                hairsplit[h] = 'Oleoso';
                            }else if(hairsplit[h] == 'dry'){
                                hairsplit[h] = 'Seco';
                            }
                            if(hairsplit.length>1){
                                if(h == hairsplit.length-1){
                                    hairs += hairsplit[h];
                                }else{
                                    if(hairsplit[h+1]!=''){
                                        hairs += hairsplit[h]+'<br>';
                                    }else{
                                        hairs += hairsplit[h];
                                    }

                                }

                            }else{
                                hairs += hairsplit[h];
                            }

                        }

                    }

                    var chemistry = '';
                    var chemistrysplit = '';
                    var chemistrys = 'Indefinido';
                    if(allkindschedule[0].chemistry != null){
                        chemistry = allkindschedule[0].chemistry;
                        chemistrys = '';
                        chemistrysplit = chemistry.split(';');

                        for(var h=0;h<chemistrysplit.length;h++){
                            if(chemistrysplit[h] == 'straight'){
                                chemistrysplit[h] = 'Liso';
                            }else if(chemistrysplit[h] == 'wavy/curly/kcc'){
                                chemistrysplit[h] = 'Ondulado/Cacheado/Crespo';
                            }else if(chemistrysplit[h] == 'color/whitening'){
                                chemistrysplit[h] = utf8_decode('Coloração/Clareamento');
                            }else if(chemistrysplit[h] == 'thin'){
                                chemistrysplit[h] = 'Fino';
                            }else if(chemistrysplit[h] == 'blond/grey'){
                                chemistrysplit[h] = 'Loiro/Grisalho';
                            }else if(chemistrysplit[h] == 'normal') {
                                chemistrysplit[h] = 'Normal';
                            }else if(chemistrysplit[h] == 'chemically-treated'){
                                chemistrysplit[h] = 'Quimicamente Tratado';
                            }else if(chemistrysplit[h] == 'oily'){
                                chemistrysplit[h] = 'Oleoso';
                            }else if(chemistrysplit[h] == 'dry'){
                                chemistrysplit[h] = 'Seco';
                            }
                            if(chemistrysplit.length>1){
                                if(h == chemistrysplit.length-1){
                                    chemistrys += chemistrysplit[h];
                                }else{
                                    if(chemistrysplit[h+1]!=''){
                                        chemistrys += chemistrysplit[h]+'<br>';
                                    }else{
                                        chemistrys += chemistrysplit[h];
                                    }

                                }

                            }else{
                                chemistrys += chemistrysplit[h];
                            }

                        }
                        if(chemistrys == ''){

                        }
                        if(hairs == ''){
                            hairs = '';
                        }

                    }
					var cabelo =  '';
					if(hairs != ''){
						cabelo += hairs;
						if(chemistrys != ''){
						cabelo += '<br>' + chemistrys;
					}
					}else{
						if(chemistrys != ''){
						cabelo += chemistrys;
					}
					}
					
					

                  // calcular idade do usuario
                        var aniversario = moment(allkindschedule[0].birthday);

                        var ano_aniversario = aniversario.year();
                        var mes_aniversario = aniversario.month();
                        var dia_aniversario = aniversario.date();
                        var d = moment(new Date()),
                            ano_atual = d.year(),
                            mes_atual = d.month(),
                            dia_atual = d.date(),

                            ano_aniversario = +ano_aniversario,
                            mes_aniversario = +mes_aniversario,
                            dia_aniversario = +dia_aniversario,

                            quantos_anos = ano_atual - ano_aniversario;

                        if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
                            quantos_anos--;
                        }

                                    var japassou = false;

                                    var horafinaldogendamento = moment(allkindschedule[0].date + ', ' + allkindschedule[0].time_end);
                                    var horaatual = moment(new Date());

                                    if(horafinaldogendamento<horaatual){
                                        japassou = true;
                                    }


                                    if(japassou == true){
                                        if(allkindschedule[0].voucher_id==0){

                                                $("#swipeactionright").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9" style="padding-top:2vw;"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="background-color:white;padding-top:3%;font-size: 7vw;font-weight: 100;height:100%;text-align:center;padding-left:0%;padding-right: 0%;color:#2597AC;"><img src = "img/icons/check-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"  onclick="servicerealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');"><img onclick="servicedidntrealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');" src = "img/icons/cancel-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"></div></div>');

                                            //<tr><td style="padding:0%;margin:0%;float:left;text-align:left;"><span>'+utf8_decode("SERVIÇO JÁ FOI REALIZADO?")+'</span></td><td style="padding:0%;margin:0%;"><span style="padding:2%;" class="glyphicon glyphicon-ok" onclick="servicerealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');"></span><span onclick="servicedidntrealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');" style="padding:2%;" class="glyphicon glyphicon-remove"></span></td></tr>

                                            /* $("#swipeactionright").append('<tr><td style="padding-top:1%;padding-left:1%;padding-right:1%;">' +  dia + '/' + str_month + '</td><td style="padding-top:1%;text-align:center;width:60%;">'+allkindschedule[0].name+'</td><td colspan="2" style="vertical-align: middle;" valign="middle"><img id="icone'+allkindschedule[0].id+'" src="https://secure.jezzy.com.br/jezzy-mobile-professionals/public_html/img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:35px;width:35px;padding:2%;margin-left:10%;"></td></tr><tr><td style="margin-top:0%!important;padding-bottom:3%;padding-right:1%;padding-left:1%;" id="hour'+allkindschedule[0].id+'">' + hora +':'+str_minutos + '</td><td style="padding-bottom:3%;margin-top:0%!important;text-align:center;" id="service'+allkindschedule[0].id+'">'+servico.toUpperCase()+'</td></tr><div style="border: 1px solid #d3d3d3;"></div><div class="hide" id="'+allkindschedule[0].id+'" style="background-color:white;color:#A9A055;font-family: \'Open Sans\';width: 100%;font-size:1em;"><div class="col=xs=12"><div class="col-xs-10"><label style="color:#2597AC;font-size:1.3em;">Perfil do Comprador:</label></div><div class="col-xs-2"><img src="https://secure.jezzy.com.br/jezzy-mobile-professionals/public_html/img/icons/Voucher-06.png" style="height:20px;width:35px;"></div></div><div class="col-xs-12"><div class="col-xs-3"><img class="fotousuario profile-pic" src = '+allkindschedule[0].photo+'></div><div class="col-xs-9"  style="margin-top:4%;"><label>'+allkindschedule[0].name+'</label></div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Gênero:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+gender+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Cabelo:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+hairs+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Mais sobre o cabelo:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+chemistrys+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Idade:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+quantos_anos+' anos</div></div><div class="col-xs-12"><div class="col-xs-10"><label style="color:#2597AC;font-size:1.3em;margin-bottom:3%;">'+utf8_decode("Informações do Serviço:")+'</label></div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Serviço:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+serviceinteger.toUpperCase()+'</div></div><div class="col-xs-12"><div class="col-xs-3"><label>Hora:</label></div><div class="col-xs-3">' + hora +':'+str_minutos + '</div><div class="col-xs-3"><label>Data:</label></div><div class="col-xs-3">' +  dia + '/' + str_month + '</div></div></div></div>');*/
                                        }else{

                                                $("#swipeactionright").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="background-color:white;padding-top:3%;font-size: 7vw;font-weight: 100;height:100%;text-align:center;padding-left:0%;padding-right: 0%;color:#2597AC;"><img src = "img/icons/check-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"  onclick="servicerealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');"><img onclick="servicedidntrealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');" src = "img/icons/cancel-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"></div></div>');



                                            /*
                                             $("#swipeactionright").append('<tr><td style="padding-top:1%;padding-left:1%;padding-right:1%;">' +  dia + '/' + str_month + '</td><td style="padding-top:1%;text-align:center;width:60%;">'+allkindschedule[0].name+'</td><td colspan="2" style="vertical-align: middle;" valign="middle"><img id="icone'+allkindschedule[0].id+'" src="https://secure.jezzy.com.br/jezzy-mobile-professionals/public_html/img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:35px;width:35px;padding:2%;margin-left:10%;"></td></tr><tr><td style="margin-top:0%!important;padding-bottom:3%;padding-right:1%;padding-left:1%;" id="hour'+allkindschedule[0].id+'">' + hora +':'+str_minutos + '</td><td style="padding-bottom:3%;margin-top:0%!important;text-align:center;" id="service'+allkindschedule[0].id+'">'+servico.toUpperCase()+'</td></tr><div style="border: 1px solid #d3d3d3;"></div><div class="hide" id="'+allkindschedule[0].id+'" style="background-color:white;color:#A9A055;font-family: \'Open Sans\';width: 100%;font-size:1em;"><div class="col=xs=12"><div class="col-xs-10"><label style="color:#2597AC;font-size:1.3em;">Perfil do Comprador:</label></div></div><div class="col-xs-12"><div class="col-xs-3"><img class="fotousuario profile-pic" src = '+allkindschedule[0].photo+'></div><div class="col-xs-9"  style="margin-top:4%;"><label>'+allkindschedule[0].name+'</label></div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Gênero:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+gender+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Cabelo:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+hairs+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Mais sobre o cabelo:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+chemistrys+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Idade:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+quantos_anos+' anos</div></div><div class="col-xs-12"><div class="col-xs-10"><label style="color:#2597AC;font-size:1.3em;;margin-bottom:3%;">'+utf8_decode("Informações do Serviço:")+'</label></div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Serviço:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+serviceinteger.toUpperCase()+'</div></div><div class="col-xs-12"><div class="col-xs-3"><label>Hora:</label></div><div class="col-xs-3">' + hora +':'+str_minutos + '</div><div class="col-xs-3"><label>Data:</label></div><div class="col-xs-3">' +  dia + '/' + str_month + '</div></div></div></div><div style="border: 1px solid #A9A055;">');
                                             */
                                        }
                                    }else{
                                        if(allkindschedule[0].voucher_id==0){
                                            if(allkindschedule[0].photo!=''){
                                                $("#swipeactionright").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="margin-top:1.5%;font-size: 7vw;font-weight: 100;"><img id="changesignal'+allkindschedule[0].id+'"  src="img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:30px;width:30px;align-items: center;margin-left: 20px;"></div></div><div id="'+allkindschedule[0].id+'" class="col-xs-12 hide" style="color:white;font-family: \'Open Sans\';margin-left:0%;margin-right:0%;"><table style="width:100%;font-size:2vh!important;padding:0%!important;text-align:center;color:#2597AC;"><tr><td colspan="2" style="padding:2%;"><img style="height:20vw!important;border-radius:20vh;width:12vh;border: 2px solid #999933;" class="fotousuario profile-pic" src = '+allkindschedule[0].photo+'></td></tr><tr style="padding:0%!important;"><td colspan="2" style="padding:2%!important;font-weight:bolder;"><div class="col-xs-12">'+allkindschedule[0].name.toUpperCase()+'</div></td></tr><tr style="padding:0%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Cabelo</td><td style="padding:2%!important;float:left;">'+cabelo+'</td></tr><tr style="padding:2%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Idade</td><td style="padding:2%!important;float:left;">'+quantos_anos+' anos</td></tr><td colspan="2" style="padding:2%!important;font-weight:bolder;">'+(allkindschedule[0].subclasse_name).toUpperCase()+'</td></tr><tr style="padding:2%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Hora</td><td style="padding:2%!important;float:left;">' + hora +':'+str_minutos + '</td></tr><tr style="padding:2%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Data</td><td style="padding:2%!important;float:left;">' +  dia + '/' + str_month + '</td></tr></table></div>');
                                            }else{
                                                $("#swipeactionright").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="margin-top:1.5%;font-size: 7vw;font-weight: 100;"><img id="changesignal'+allkindschedule[0].id+'" src="img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:30px;width:30px;align-items: center;margin-left: 20px;"></div></div><div id="'+allkindschedule[0].id+'" class="col-xs-12 hide" style="color:white;font-family: \'Open Sans\';margin-left:0%;margin-right:0%;"><table style="width:100%;font-size:2vh!important;padding:0%!important;text-align:center;color:#2597AC;"><tr style="padding:0%!important;"><td colspan="2" style="padding:2%!important;font-weight:bolder;"><div class="col-xs-1q" >'+allkindschedule[0].name.toUpperCase()+'</div></td></tr><tr style="padding:0%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Cabelo</td><td style="padding:2%!important;float:left;">'+cabelo+'</td></tr><tr style="padding:2%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Idade</td><td style="padding:2%!important;float:left;">'+quantos_anos+' anos</td></tr><td colspan="2" style="padding:2%!important;font-weight:bolder;">'+(allkindschedule[0].subclasse_name).toUpperCase()+'</td></tr><tr style="padding:2%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Hora</td><td style="padding:2%!important;float:left;">' + hora +':'+str_minutos + '</td></tr><tr style="padding:2%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Data</td><td style="padding:2%!important;float:left;">' +  dia + '/' + str_month + '</td></tr></table></div>');
                                            }



                                            /* $("#swipeactionright").append('<tr><td style="padding-top:1%;padding-left:1%;padding-right:1%;">' +  dia + '/' + str_month + '</td><td style="padding-top:1%;text-align:center;width:60%;">'+allkindschedule[0].name+'</td><td colspan="2" style="vertical-align: middle;" valign="middle"><img id="icone'+allkindschedule[0].id+'" src="https://secure.jezzy.com.br/jezzy-mobile-professionals/public_html/img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:35px;width:35px;padding:2%;margin-left:10%;"></td></tr><tr><td style="margin-top:0%!important;padding-bottom:3%;padding-right:1%;padding-left:1%;" id="hour'+allkindschedule[0].id+'">' + hora +':'+str_minutos + '</td><td style="padding-bottom:3%;margin-top:0%!important;text-align:center;" id="service'+allkindschedule[0].id+'">'+servico.toUpperCase()+'</td></tr><div style="border: 1px solid #d3d3d3;"></div><div class="hide" id="'+allkindschedule[0].id+'" style="background-color:white;color:#A9A055;font-family: \'Open Sans\';width: 100%;font-size:1em;"><div class="col=xs=12"><div class="col-xs-10"><label style="color:#2597AC;font-size:1.3em;">Perfil do Comprador:</label></div><div class="col-xs-2"><img src="https://secure.jezzy.com.br/jezzy-mobile-professionals/public_html/img/icons/Voucher-06.png" style="height:20px;width:35px;"></div></div><div class="col-xs-12"><div class="col-xs-3"><img class="fotousuario profile-pic" src = '+allkindschedule[0].photo+'></div><div class="col-xs-9"  style="margin-top:4%;"><label>'+allkindschedule[0].name+'</label></div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Gênero:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+gender+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Cabelo:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+hairs+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Mais sobre o cabelo:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+chemistrys+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Idade:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+quantos_anos+' anos</div></div><div class="col-xs-12"><div class="col-xs-10"><label style="color:#2597AC;font-size:1.3em;margin-bottom:3%;">'+utf8_decode("Informações do Serviço:")+'</label></div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Serviço:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+serviceinteger.toUpperCase()+'</div></div><div class="col-xs-12"><div class="col-xs-3"><label>Hora:</label></div><div class="col-xs-3">' + hora +':'+str_minutos + '</div><div class="col-xs-3"><label>Data:</label></div><div class="col-xs-3">' +  dia + '/' + str_month + '</div></div></div></div>');*/
                                        }else{
                                            if(allkindschedule[0].photo!=''){
                                                $("#swipeactionright").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="margin-top:1.5%;font-size: 7vw;font-weight: 100;"><img id="changesignal'+allkindschedule[0].id+'"  src="img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:30px;width:30px;align-items: center;margin-left: 20px;"></div></div><div id="'+allkindschedule[0].id+'" class="col-xs-12 hide" style="color:white;font-family: \'Open Sans\';margin-left:0%;margin-right:0%;"><table style="width:100%;font-size:2vh!important;padding:0%!important;text-align:center;color:#2597AC;"><tr><td style="padding:2%;"><img style="height:20vw!important;border-radius:20vh;width:12vh;border: 2px solid #999933;" class="fotousuario profile-pic" src = '+allkindschedule[0].photo+'></td><td style="padding:2%;vertical-align: top;"><img src="https://secure.jezzy.com.br/jezzy-mobile-professionals/public_html/img/icons/Voucher-06.png" style="height:20px;width:35px;"></td></tr><tr style="padding:0%!important;"><td colspan="2" style="padding:2%!important;font-weight:bolder;"><div class="col-xs-12">'+allkindschedule[0].name.toUpperCase()+'</div></td></tr><tr style="padding:0%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Cabelo</td><td style="padding:2%!important;float:left;">'+cabelo+'</td></tr><tr style="padding:2%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Idade</td><td style="padding:2%!important;float:left;">'+quantos_anos+' anos</td></tr><td colspan="2" style="padding:2%!important;font-weight:bolder;">'+(allkindschedule[0].subclasse_name).toUpperCase()+'</td></tr><tr style="padding:2%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Hora</td><td style="padding:2%!important;float:left;">' + hora +':'+str_minutos + '</td></tr><tr style="padding:2%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Data</td><td style="padding:2%!important;float:left;">' +  dia + '/' + str_month + '</td></tr></table></div>');
                                            }else{
                                                $("#swipeactionright").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="margin-top:1.5%;font-size: 7vw;font-weight: 100;"><img id="changesignal'+allkindschedule[0].id+'"  src="img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:30px;width:30px;align-items: center;margin-left: 20px;"></div></div><div id="'+allkindschedule[0].id+'" class="col-xs-12 hide" style="color:white;font-family: \'Open Sans\';margin-left:0%;margin-right:0%;"><table style="width:100%;font-size:2vh!important;padding:0%!important;text-align:center;color:#2597AC;"><tr style="padding:0%!important;"><td colspan="2" style="padding:2%!important;font-weight:bolder;"><div class="col-xs-10" style="padding-left: 25%;">'+allkindschedule[0].name.toUpperCase()+'</div><div class="col-xs-2"><img src="https://secure.jezzy.com.br/jezzy-mobile-professionals/public_html/img/icons/Voucher-06.png" style="height:20px;width:35px;"></div></td></tr><tr style="padding:0%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Cabelo</td><td style="padding:2%!important;float:left;">'+cabelo+'</td></tr><tr style="padding:2%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Idade</td><td style="padding:2%!important;float:left;">'+quantos_anos+' anos</td></tr><td colspan="2" style="padding:2%!important;font-weight:bolder;">'+(allkindschedule[0].subclasse_name).toUpperCase()+'</td></tr><tr style="padding:2%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Hora</td><td style="padding:2%!important;float:left;">' + hora +':'+str_minutos + '</td></tr><tr style="padding:2%!important;"><td style="padding:2%!important;float:left;font-weight:bolder;">Data</td><td style="padding:2%!important;float:left;">' +  dia + '/' + str_month + '</td></tr></table></div>');
                                            }



                                            /*
                                             $("#swipeactionright").append('<tr><td style="padding-top:1%;padding-left:1%;padding-right:1%;">' +  dia + '/' + str_month + '</td><td style="padding-top:1%;text-align:center;width:60%;">'+allkindschedule[0].name+'</td><td colspan="2" style="vertical-align: middle;" valign="middle"><img id="icone'+allkindschedule[0].id+'" src="https://secure.jezzy.com.br/jezzy-mobile-professionals/public_html/img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:35px;width:35px;padding:2%;margin-left:10%;"></td></tr><tr><td style="margin-top:0%!important;padding-bottom:3%;padding-right:1%;padding-left:1%;" id="hour'+allkindschedule[0].id+'">' + hora +':'+str_minutos + '</td><td style="padding-bottom:3%;margin-top:0%!important;text-align:center;" id="service'+allkindschedule[0].id+'">'+servico.toUpperCase()+'</td></tr><div style="border: 1px solid #d3d3d3;"></div><div class="hide" id="'+allkindschedule[0].id+'" style="background-color:white;color:#A9A055;font-family: \'Open Sans\';width: 100%;font-size:1em;"><div class="col=xs=12"><div class="col-xs-10"><label style="color:#2597AC;font-size:1.3em;">Perfil do Comprador:</label></div></div><div class="col-xs-12"><div class="col-xs-3"><img class="fotousuario profile-pic" src = '+allkindschedule[0].photo+'></div><div class="col-xs-9"  style="margin-top:4%;"><label>'+allkindschedule[0].name+'</label></div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Gênero:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+gender+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Cabelo:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+hairs+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Mais sobre o cabelo:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+chemistrys+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Idade:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+quantos_anos+' anos</div></div><div class="col-xs-12"><div class="col-xs-10"><label style="color:#2597AC;font-size:1.3em;;margin-bottom:3%;">'+utf8_decode("Informações do Serviço:")+'</label></div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Serviço:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+serviceinteger.toUpperCase()+'</div></div><div class="col-xs-12"><div class="col-xs-3"><label>Hora:</label></div><div class="col-xs-3">' + hora +':'+str_minutos + '</div><div class="col-xs-3"><label>Data:</label></div><div class="col-xs-3">' +  dia + '/' + str_month + '</div></div></div></div><div style="border: 1px solid #A9A055;">');
                                             */
                                        }
                                    }



					
					}else{
                                    //AGENDAMENTOS SOLICITADOS
									$("#swipeactionright").append('<div class="col-xs-12" style="background-color: #2597AC;border:1px solid lightgrey;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9"><span class="col-xs-2">'+date+'</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">'+hour+'</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+allkindschedule[0].subclasse_name+'</span></div><div class="col-xs-3" style="margin-top:2.5%;font-size: 7vw;font-weight: 100;"><img src="img/icons/ok%20-%20check.png" onclick="aceptSchedule('+allkindschedule[0].id+', \''+utf8_decode(allkindschedule[0].subclasse_name)+'\', \''+allkindschedule[0].name+'\', \''+hora+':'+str_minutos+'\', \'' +  dia + '/' + str_month + '\')" style="height:20px;width:20px;"><img src="img/icons/Sair%20-%20branco-07.png" onclick="recuseSchedule('+allkindschedule[0].id+', \''+utf8_decode(allkindschedule[0].subclasse_name)+'\', \''+allkindschedule[0].name+'\', \''+hora+':'+str_minutos+'\', \'' +  dia + '/' + str_month + '\')" style="height:20px;width:20px;float:right;"></div></div>');
								}
								
							}
							
						
						}else{
							var noschedules = utf8_decode('Não há agendamentos para hoje!');
							$("#swipeactionright").html('<div class="row" id="centerlogojezzy2" ><div class="col-xs-12 listColorsAndFont marginTop10" style="margin-bottom: 2%;">AGENDA DO DIA</div></div><div class="col-xs-12" style="background-color: #2597AC;height: 18vw!important;color:white;font-family:\'Open Sans\';padding-top:1.5vw;margin-left:0%;margin-right:0%;padding-left:5%!important;padding-right:5%!important;text-align: center;"><span ><br>'+noschedules+'</span></div>');
						}
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                //alert(errorThrown);
            });
			
}
function servicerealized(id, client, service){

    $.confirm({
        title: 'Deseja marcar agendamento de '+service+' para '+client+' como realizado?',
        content: false,
        animation: 'zoom',
        closeAnimation: 'scale',
        animationBounce: 1.5,
        theme: 'supervan',
        confirmButton: 'Sim',
        cancelButton: utf8_decode('Não'),
        keyboardEnabled: true,
        confirm: function () {
            var query = "UPDATE schedules SET status = 0 WHERE id = " + id;


           var conditions = {
                'General': {
                    'query': query
                }
            };
            var postData = JSON.stringify(conditions);

            postData = {
                'params': postData
            };
            var url = 'https://' + api + '/General/get/query/' + createToken();

            $.ajax({
                method: "POST",
                url: url,
                data: postData

            }).done(function (result) {
                if (result == "ImE6MDp7fSI=") {


                } else {
                    $.alert({
                        title: false,
                        content: 'Houve um problema na requisição!',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        animationBounce: 1.5,
                        theme: 'supervan',
                        closeIcon: false,
                        confirmButton: false,
                        backgroundDismiss: true,
                        onClose: function () {
                            window.location.href = 'home.html';
                        }


                    });

                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
               //alert(errorThrown);
            });

        },
        cancel: function () {

        }
    });





}
function servicedidntrealized(id, client, service){

    $.confirm({
        title: 'Deseja marcar agendamento de '+service+' para '+client+' como '+utf8_decode("não")+'  realizado?',
        content: false,
        animation: 'zoom',
        closeAnimation: 'scale',
        animationBounce: 1.5,
        theme: 'supervan',
        confirmButton: 'Sim',
        cancelButton: utf8_decode('Não'),
        keyboardEnabled: true,
        confirm: function () {
            var query = "UPDATE schedules SET status = 2 WHERE id = " + id;

           //alert(query);
             var conditions = {
             'General': {
             'query': query
             }
             };
             var postData = JSON.stringify(conditions);

             postData = {
             'params': postData
             };
             var url = 'https://' + api + '/General/get/query/' + createToken();

             $.ajax({
             method: "POST",
             url: url,
             data: postData

             }).done(function (result) {
             if (result == "ImE6MDp7fSI=") {





             } else {
             $.alert({
             title: false,
             content: 'Houve um problema na requisição!',
             animation: 'zoom',
             closeAnimation: 'scale',
             animationBounce: 1.5,
             theme: 'supervan',
             closeIcon: false,
             confirmButton: false,
             backgroundDismiss: true,
             onClose: function () {
             window.location.href = 'home.html';
             }


             });

             }
             }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
             });

        },
        cancel: function () {

        }
    });

}
function aceptSchedule(id, service, client, hour, date){

    $.confirm({
        title: 'Tem certeza que deseja aceitar o agendamento de '+service+' para '+client+' no dia '+date+utf8_decode(" às ")+''+hour+'?',
        content: false,
        animation: 'zoom',
        closeAnimation: 'scale',
        animationBounce: 1.5,
        theme: 'supervan',
        confirmButton: 'Sim',
        cancelButton: utf8_decode('Não'),
        keyboardEnabled: true,

        confirm: function () {

            var query = "UPDATE schedules_solicitation SET status = 'SOLICITATION_ACCEPTED' WHERE id = " + id;

            var conditions = {
                'General': {
                    'query': query
                }
            };
            var postData = JSON.stringify(conditions);

            postData = {
                'params': postData
            };
            var url = 'https://' + api + '/General/get/query/' + createToken();

            $.ajax({
                method: "POST",
                url: url,
                data: postData

            }).done(function (result) {
                if (result == "ImE6MDp7fSI=") {
                    var query = "select * from schedules_solicitation where id =" + id;

                    var conditions = {
                        'General': {
                            'query': query
                        }
                    };
                    var postData = JSON.stringify(conditions);

                    postData = {
                        'params': postData
                    };
                    var url = 'https://' + api + '/General/get/query/' + createToken();

                    $.ajax({
                        method: "POST",
                        url: url,
                        data: postData

                    }).done(function (result) {
                        if (result == "ImE6MDp7fSI=") {

                        } else {
                            var objReturns = JSON.parse(JSON.stringify(result));
                            var decodeObjReturns = Base64.decode(objReturns);
                            var convertedReturnSchedulesSolicitation = unserialize(JSON.parse(decodeObjReturns));

                            var query = "select * from services where id =" + convertedReturnSchedulesSolicitation[0].schedules_solicitation.service_id;

                            var conditions = {
                                'General': {
                                    'query': query
                                }
                            };
                            var postData = JSON.stringify(conditions);

                            postData = {
                                'params': postData
                            };
                            var url = 'https://' + api + '/General/get/query/' + createToken();

                            $.ajax({
                                method: "POST",
                                url: url,
                                data: postData

                            }).done(function (result) {
                                if (result == "ImE6MDp7fSI=") {

                                } else {

                                    var objReturns = JSON.parse(JSON.stringify(result));
                                    var decodeObjReturns = Base64.decode(objReturns);
                                    var convertedReturnServices = unserialize(JSON.parse(decodeObjReturns));

                                    var query = " select * from subclasses inner join classes on classes.id = subclasses.classe_id where subclasses.id =" + convertedReturnServices[0].services.subclasse_id;

                                    var conditions = {
                                        'General': {
                                            'query': query
                                        }
                                    };
                                    var postData = JSON.stringify(conditions);

                                    postData = {
                                        'params': postData
                                    };
                                    var url = 'https://' + api + '/General/get/query/' + createToken();

                                    $.ajax({
                                        method: "POST",
                                        url: url,
                                        data: postData

                                    }).done(function (result) {
                                        if (result == "ImE6MDp7fSI=") {

                                        } else {
                                            var objReturns = JSON.parse(JSON.stringify(result));
                                            var decodeObjReturns = Base64.decode(objReturns);
                                            var convertedReturnsClassAndSubClass = unserialize(JSON.parse(decodeObjReturns));


                                            var query = "INSERT INTO schedules(classe_name,subclasse_name,date,service_id,time_begin,time_end,client_name,client_phone,status,valor,user_id,companie_id,secondary_user_id,voucher_id) VALUES('" + convertedReturnsClassAndSubClass[0].classes.name + "','" + convertedReturnsClassAndSubClass[0].subclasses.name + "','" + convertedReturnSchedulesSolicitation[0].schedules_solicitation.date + "'," + convertedReturnServices[0].services.id + ",'" + convertedReturnSchedulesSolicitation[0].schedules_solicitation.time_begin + "','" + convertedReturnSchedulesSolicitation[0].schedules_solicitation.time_end + "','" + convertedReturnSchedulesSolicitation[0].schedules_solicitation.user_name + "','00000000',1,'" + convertedReturnServices[0].services.value + "'," + convertedReturnSchedulesSolicitation[0].schedules_solicitation.user_id + "," + convertedReturnSchedulesSolicitation[0].schedules_solicitation.company_id + "," + convertedReturnSchedulesSolicitation[0].schedules_solicitation.secundary_user_id + "," + convertedReturnSchedulesSolicitation[0].schedules_solicitation.voucher_id + ")";

                                            var conditions = {
                                                'General': {
                                                    'query': query
                                                }
                                            };
                                            var postData = JSON.stringify(conditions);

                                            postData = {
                                                'params': postData
                                            };
                                            var url = 'https://' + api + '/General/get/query/' + createToken();

                                            $.ajax({
                                                method: "POST",
                                                url: url,
                                                data: postData

                                            }).done(function (result) {
                                                if (result == "ImE6MDp7fSI=") {

                                                    $.ajax({
                                                        method: "POST",
                                                        url: 'https://secure.jezzy.com.br/jezzy-portal/company/sendMobileNotification/'+convertedReturnSchedulesSolicitation[0].schedules_solicitation.user_id+'/Agendamento%20Confirmado!'
                                                    }).done(function(){
                                                        window.location.href = 'schedules_display.html';
                                                    });



                                                } else {


                                                }

                                            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                               //alert(errorThrown);
                                            });
                                        }


                                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                       //alert(errorThrown);
                                    });


                                }
                            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                               //alert(errorThrown);
                            });

                        }
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                       //alert(errorThrown);
                    });

                } else {


                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
               //alert(errorThrown);
            });


        },
        cancel: function () {

        }
    });



}
function recuseSchedule(id, service, client, hour, date){
    $.confirm({
        title: 'Tem certeza que deseja rejeitar o agendamento de '+service+' para '+client+' no dia '+date+utf8_decode(" às ")+''+hour+'?',
        content: false,
        animation: 'zoom',
        closeAnimation: 'scale',
        animationBounce: 1.5,
        theme: 'supervan',
        confirmButton: 'Sim',
        cancelButton: utf8_decode('Não'),
        keyboardEnabled: true,

        confirm: function () {
    var query = "UPDATE schedules_solicitation SET status = 'SOLICITATION_DOES_NOT_ACCEPTED' WHERE id = " + id;

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
        if (result == "ImE6MDp7fSI=") {
            var query = "select * from schedules_solicitation where id =" + id;

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
                if (result == "ImE6MDp7fSI=") {

                } else {
                    var objReturns = JSON.parse(JSON.stringify(result));
                    var decodeObjReturns = Base64.decode(objReturns);
                    var convertedReturnSchedulesSolicitation = unserialize(JSON.parse(decodeObjReturns));
                    var horario = utf8_decode('Horário');
                    var indisponivel = utf8_decode('indisponível');
                    if(convertedReturnSchedulesSolicitation[0].schedules_solicitation.voucher_id ==0){

                        $.ajax({
                                method: "POST",
                                url: 'https://secure.jezzy.com.br/jezzy-portal/company/sendMobileNotification/'+convertedReturnSchedulesSolicitation[0].schedules_solicitation.user_id+'/Ops!%20'+horario+'%20'+indisponivel+'!%20Escolha%20um%20outro.'
                            }
                        ).done(function(){
                                window.location.href = 'schedules_display.html';
                            });

                    }else{
                        var query = "update services_vouchers set status = 'APPROVED' where id =" + convertedReturnSchedulesSolicitation[0].schedules_solicitation.voucher_id;

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
                            if (result == "ImE6MDp7fSI=") {
                                var objReturns = JSON.parse(JSON.stringify(result));
                                var decodeObjReturns = Base64.decode(objReturns);
                                var convertedReturnSchedulesSolicitation = unserialize(JSON.parse(decodeObjReturns));

                                $.ajax({
                                        method: "POST",
                                        url: 'https://secure.jezzy.com.br/jezzy-portal/company/sendMobileNotification/'+convertedReturnSchedulesSolicitation[0].schedules_solicitation.user_id+'/Ops!%20'+horario+'%20'+indisponivel+'!%20Escolha%20um%20outro.'
                                    }
                                ).done(function(){
                                        window.location.href = 'schedules_display.html';
                                    });



                            } else {



                                $.alert({
                                    title: false,
                                    content: 'Falha ao rejeitar agendamento',
                                    animation: 'zoom',
                                    closeAnimation: 'scale',
                                    animationBounce: 1.5,
                                    theme: 'supervan',
                                    closeIcon: false,
                                    confirmButton: false,
                                    backgroundDismiss: true,
                                    onClose: function(){
                                        window.location.href = 'schedules_display.html';
                                    }
                                });



                            }
                        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                           //alert(errorThrown);
                        });
                    }


                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
               //alert(errorThrown);
            });
        }else{

        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
       //alert(errorThrown);
    });

        },
        cancel: function () {

        }
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
            + '<div class="modal-content" style="max-height: calc(100vh - 88vh);" id="messageModelGoesHere">'
            + mensagem
            + '</div>'
            + '</div>'
            + '</div>';
        $("body").append($modalHtml);
    }
}


