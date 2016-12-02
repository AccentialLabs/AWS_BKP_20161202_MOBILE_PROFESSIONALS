$(document).ready(function() {
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";
    //pendingconfirmations();
	
});
var agenda = '';
var ArraySugestoes = new Array;
function excluirschedulesolicitation(id){
    var nao = "Não";
    var nao2 =  "não";
    nao = utf8_decode(nao);
    $.confirm({
        title: 'Tem certeza que deseja cancelar o agendamento?',
        content: false,
        animation: 'zoom',
        closeAnimation: 'scale',
        animationBounce: 1.5,
        theme: 'supervan',
        confirmButton: 'Sim',
        cancelButton: nao,
        keyboardEnabled: true,

        confirm: function () {
            $.alert({
                title: "",
                content: 'Agendamento Cancelado!',
                animation: 'zoom',
                closeAnimation: 'scale',
                animationBounce: 1.5,
                theme: 'supervan',
                closeIcon: false,
                confirmButton: false,
                backgroundDismiss: true
            });


            var query = "UPDATE schedules_solicitation SET status = 'CANCELLED_BY_USER' WHERE id = " + id;

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


                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
            window.location.href='schedules_display.html';

        },
        cancel: function () {
        $.alert({
            title: false,
            content: 'Cancelamento '+utf8_decode(nao2)+' foi realizado!',
            animation: 'zoom',
            closeAnimation: 'scale',
            animationBounce: 1.5,
            theme: 'supervan',
            closeIcon: false,
            confirmButton: false,
            backgroundDismiss: true

        });

    }
});
}
/*function excluir(id){
    var nao = "Não";
    var nao2 =  "não";
    nao = utf8_decode(nao);
    $.confirm({
        title: 'Tem certeza que deseja cancelar o agendamento?',
        content: false,
        animation: 'zoom',
        closeAnimation: 'scale',
        animationBounce: 1.5,
        theme: 'supervan',
        confirmButton: 'Sim',
        cancelButton: nao,
        keyboardEnabled: true,

    confirm: function () {
        $.alert({
            title: "",
            content: 'Agendamento Cancelado!',
            animation: 'zoom',
            closeAnimation: 'scale',
            animationBounce: 1.5,
            theme: 'supervan',
            closeIcon: false,
            confirmButton: false,
            backgroundDismiss: true
        });

       //CODIGO PARA MUDAR STATUS DE AGENDAMENTO CONCLUIDO PARA CANCELADO
        var query11 = "SELECT * FROM schedules Schedules WHERE id =" + id;

        var conditions3 = {
            'General': {
                'query': query11
            }
        };
        var postData3 = JSON.stringify(conditions3);

        postData3 = {
            'params': postData3
        };
        var url3 = 'https://'+api+'/General/get/query/' + createToken();

        $.ajax({
            method: "POST",
            url: url3,
            data: postData3
        }).done(function (result) {

                if(result !='ImE6MDp7fSI='){
                    var objReturns4 = JSON.parse(JSON.stringify(result));
                    var decodeObjReturns4 = Base64.decode(objReturns4);
                    var convertedReturns4 = unserialize(JSON.parse(decodeObjReturns4));

                    if(convertedReturns4[0].Schedules.voucher_id!=null&&convertedReturns4[0].Schedules.voucher_id!=0 ){
                        var query3 = "UPDATE services_vouchers SET services_vouchers.status = 'APPROVED' WHERE services_vouchers.id = " + convertedReturns4[0].Schedules.voucher_id + ";";

                        var conditions3 = {
                            'General': {
                                'query': query3
                            }
                        };
                        var postData3 = JSON.stringify(conditions3);

                        postData3 = {
                            'params': postData3
                        };
                        var url3 = 'https://'+api+'/General/get/query/' + createToken();

                        $.ajax({
                            method: "POST",
                            url: url3,
                            data: postData3

                        }).done(function (result) {

                            if(result =='ImE6MDp7fSI='){
                                var query = "UPDATE schedules SET status = 2 WHERE id = " + id+';';

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

                                        window.location.href='schedules_display.html';

                                    }
                                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                    alert(errorThrown);
                                });

                            }else{
                                window.location.href='schedules_display.html';
                            }

                        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        });

                    }else{
                        var query = "UPDATE schedules SET status = 2 WHERE id = " + id+';';

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
                                window.location.href='schedules_display.html';

                            }
                        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        });

                    }
                    window.location.href='schedules_display.html';

                }
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });




    },
    cancel: function () {
        $.alert({
            title: false,
            content: 'Cancelamento '+utf8_decode(nao2)+' foi realizado!',
            animation: 'zoom',
            closeAnimation: 'scale',
            animationBounce: 1.5,
            theme: 'supervan',
            closeIcon: false,
            confirmButton: false,
            backgroundDismiss: true

        })

    }

});

    window.location.href='schedules_display.html';

}*/
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
function ClickSugestedScheduling(element){
	for(var i=0; i< document.getElementsByClassName('list-group-item').length; i++){
			if((document.getElementsByClassName('list-group-item')[i].className).replace(/[\n\t]/g," ").indexOf('active') !=-1){
				
					
					(document.getElementsByClassName('list-group-item')[i]).className = 'list-group-item col-xs-2'; // sets className to the new string
				
			}
		}
		element.className = 'list-group-item active col-xs-2'; // sets className to the new string
}
function Schedules() {
    var date = moment();
    var month = date.month();
    var day = date.date();
	var horarios = "";		
    // AGENDAMENTOS CONFIRMADOS
    var Query = 'SELECT Schedules.date, Schedules.id, Schedules.user_id, Schedules.time_begin, Schedules.time_end, Schedules.status, Schedules.subclasse_name, Schedules.voucher_id, User.name, User.gender, User.photo, User.birthday, FbProfile.chemistry, FbProfile.hair_type, Company.fancy_name, Service.subclasse_id FROM schedules Schedules INNER JOIN users User ON User.id = Schedules.user_id INNER JOIN services Service ON Schedules.service_id = Service.id INNER JOIN companies Company ON Schedules.companie_id = Company.id INNER JOIN facebook_profiles FbProfile ON FbProfile.user_id = User.id WHERE  DATE(Schedules.date) >= DATE(NOW()) and Schedules.status = 1 and Schedules.secondary_user_id = ' + $.cookieStorage.get('SecondaryUser').id+' or  Schedules.status =1 and Schedules.secondary_user_id = '+ $.cookieStorage.get('SecondaryUser').id+'  and DATE(Schedules.date) < DATE(NOW()) or Schedules.status =1 and Schedules.secondary_user_id = '+ $.cookieStorage.get('SecondaryUser').id+'  and DATE(Schedules.date) = DATE(NOW()) and TIME(Schedules.time_end) <= TIME(NOW())  UNION ALL SELECT SchedulesSolicitation.date, SchedulesSolicitation.id, SchedulesSolicitation.user_id, SchedulesSolicitation.time_begin, SchedulesSolicitation.time_end, SchedulesSolicitation.status, SchedulesSolicitation.service_name, SchedulesSolicitation.voucher_id, User.name, User.gender, User.photo, User.birthday, FbProfile.chemistry, FbProfile.hair_type, Company.fancy_name, Service.subclasse_id FROM schedules_solicitation SchedulesSolicitation INNER JOIN users User ON User.id = SchedulesSolicitation.user_id INNER JOIN companies Company ON SchedulesSolicitation.company_id = Company.id INNER JOIN services Service ON SchedulesSolicitation.service_id = Service.id INNER JOIN facebook_profiles FbProfile ON FbProfile.user_id = User.id WHERE  SchedulesSolicitation.secundary_user_id = ' + $.cookieStorage.get('SecondaryUser').id+' and SchedulesSolicitation.status = "WAITING_COMPANY_RESPONSE" and DATE(SchedulesSolicitation.date) >= DATE(NOW()) and TIME(SchedulesSolicitation.time_end) >= TIME(NOW()) and TIME(SchedulesSolicitation.time_begin) >= TIME(NOW()) or  SchedulesSolicitation.secundary_user_id = ' + $.cookieStorage.get('SecondaryUser').id+' and SchedulesSolicitation.status = "WAITING_COMPANY_RESPONSE" ORDER BY status DESC, date ASC, time_begin ASC;';
  

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

            var HTML = '';
            for(var i=0;i<objReturn.length;i++){
                var allkindschedule = objReturn[i];
				
                var date = allkindschedule[0].date;
                date = (date.split('-')[2]+'/'+date.split('-')[1]);
                var hour = allkindschedule[0].time_begin;
                hour = hour.split(':')[0]+":"+hour.split(':')[1];
       
				var have = false;

                var data = new moment((allkindschedule[0].date+" "+allkindschedule[0].time_begin));
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
				var OriginalColor = "";
					var HairLength = "";
					var Nuance = "";
					var WhiteHairPercentage = "";
					var OriginalColorImg = "";
					var HairLengthImg = "";
					var NuanceImg = "";
					var WhiteHairPercentageImg = "";
					//pesquisar schedules_solicitation_parameters se o serviço for de coloração
					if(allkindschedule[0].subclasse_id >=15 || allkindschedule[0].subclasse_id <=23){
					var Query = 'SELECT * FROM schedules_solicitation_parameters SSParameters INNER JOIN schedules_solicitation SS ON SSParameters.schedules_solicitation_id = SS.id WHERE SS.user_id ='+allkindschedule[0].user_id+' and SS.secundary_user_id = '+$.cookieStorage.get("SecondaryUser").id+'  and SS.time_begin = "'+allkindschedule[0].time_begin+'";';
					
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
						
							OriginalColor = objReturn[0].SSParameters.OriginalColor;
							HairLength = objReturn[0].SSParameters.hair_length;
							Nuance = objReturn[0].SSParameters.nuance;
							WhiteHairPercentage = objReturn[0].SSParameters.white_hair_percentage;
							have = true;
						}
					}).error(function (XMLHttpRequest, textStatus, errorThrown) {
						//alert(errorThrown);
					});
					}
					
					if(HairLength!="" && Nuance !="" && WhiteHairPercentage!=""){
						switch(HairLength){
							case "cabelosLongos":
								HairLengthImg = 4; //ADICIONAR SRC DE IMAGEM CABELOS LONGOS
								HairLength = 'Longos';
							break;
							case "cabelosCurtos":
								HairLengthImg = 2; //ADICIONAR SRC DE IMAGEM CABELOS CURTOS
								HairLength = 'Curtos';
							break;
							case "cabelosMedios":
								HairLengthImg = 3; //ADICIONAR SRC DE IMAGEM CABELOS MEDIOS
								HairLength = 'Médios';
							break;
							case "retoquedaRaiz":
								HairLengthImg = 1; //ADICIONAR SRC DE IMAGEM RETOQUE DA RAIZ
								HairLength = 'Raizes';
							break;
						}
						
						HairLengthImg = "https://secure.jezzy.com.br/jezzy-colorimetria/img/materials/HairLength"+HairLengthImg+".jpg";
						OriginalColorImg = "https://secure.jezzy.com.br/jezzy-colorimetria/img/Cores/Jezzy-Materiais%20Coloracao-"+pad(OriginalColor)+".jpg";
						WhiteHairPercentageImg = "https://secure.jezzy.com.br/jezzy-colorimetria/img/Porcentagens%20Cabelos%20Brancos/Niveis%20de%20Cabelos%20Brancos%20-%20"+WhiteHairPercentage+"%20porcento.jpg"; //ADICIONAR CAMINHO
						NuanceImg = "https://secure.jezzy.com.br/jezzy-colorimetria/img/nuances%20desejadas/"+Nuance+".png"; //ADICIONAR CAMINHO
					}
					
				
				
			
			
				
                if(allkindschedule[0].status == 1 || allkindschedule[0].status == 0){
				if(i!=objReturn.length-1){
					horarios += dia+"/"+((mes/1)+1)+"-"+allkindschedule[0].time_begin+"_"+allkindschedule[0].time_end+",";
				}else{
					horarios += dia+"/"+((mes/1)+1)+"-"+allkindschedule[0].time_begin+"_"+allkindschedule[0].time_end;
				}

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
                    var aniversario = moment((allkindschedule[0].birthday));

                    var ano_aniversario = aniversario.year();
                    var mes_aniversario = aniversario.month();
                    var dia_aniversario = aniversario.date();
                    var d = moment(),
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

                    var horafinaldogendamento = moment((allkindschedule[0].date + ' ' + allkindschedule[0].time_end));
                    var horaatual = moment();

                    if(horafinaldogendamento<horaatual){
                        japassou = true;
                    }
if(allkindschedule[0].subclasse_id >=15 && allkindschedule[0].subclasse_id <=23 && have == true){//verifica se é agendamento de coloração para preparar visualização dos parametros
										
                                    if(japassou == true){
                                        if(allkindschedule[0].voucher_id==0){

                                                $("#conteudo").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9" style="padding-top:2vw;"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="background-color:white;padding-top:3%;font-size: 7vw;font-weight: 100;height:100%;text-align:center;padding-left:0%;padding-right: 0%;color:#2597AC;"><img src = "img/icons/check-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"  onclick="servicerealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');"><img onclick="servicedidntrealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');" src = "img/icons/cancel-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"></div></div>');
                                           
                                        }else{

                                                $("#conteudo").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="background-color:white;padding-top:3%;font-size: 7vw;font-weight: 100;height:100%;text-align:center;padding-left:0%;padding-right: 0%;color:#2597AC;"><img src = "img/icons/check-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"  onclick="servicerealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');"><img onclick="servicedidntrealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');" src = "img/icons/cancel-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"></div></div>');                                           
										}
										
                                    }else{
                                        if(allkindschedule[0].voucher_id==0){
											var pic = '';
                                            if(allkindschedule[0].photo!=''){
                                               pic = allkindschedule[0].photo;
                                            }else{
												pic = "img/icons/Foto%20do%20usuario%20-%2001.png";
                                            }

											$("#conteudo").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="margin-top:1%;font-size: 7vw;font-weight: 100;"><img id="changesignal'+allkindschedule[0].id+'"  src="img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:30px;width:30px;align-items: center;margin-left: 30px;"></div></div><div id="'+allkindschedule[0].id+'" class="col-xs-12 hide" style="color:white;font-family: \'Open Sans\';margin-left:0%;margin-right:0%;"><div class="col-xs-12" style="color:#2597AC;padding:2%;"><div class="col-xs-3" style="padding:2%;"><img style="height:20vw!important;border-radius:20vh;width:12vh;border: 1px solid #2597AC;" class="fotousuario profile-pic" src = '+pic+'></div><div class="col-xs-9"><div class="col-xs-12" style="padding:2%;font-weight:bolder;"">'+allkindschedule[0].name.toUpperCase()+'</div><div class="col-xs-12" style="padding:1%;"><div class="col-xs-4" style="font-weight:bolder;">SEXO</div><div class="col-xs-8">Feminino</div></div><div class="col-xs-12"  style="padding:1%;"><div class="col-xs-4" style="font-weight:bolder;">IDADE</div><div class="col-xs-8">'+quantos_anos+' anos</div></div><div class="col-xs-12"  style="padding:1%;"><div class="col-xs-4" style="font-weight:bolder;">CABELO</div><div class="col-xs-8">'+cabelo+'</div></div></div></div><div class="col-xs-12" style="color:#2597AC;text-align:center;padding:2%;font-weight:bolder;border-top:1px solid #2597AC;">'+allkindschedule[0].subclasse_name.toUpperCase()+'</div><div class="col-xs-12" style="color:#2597AC;"><div class="col-xs-9" style="padding:0%;margin:0%;padding-left:2%;"><div class="col-xs-3" style="padding:0%;margin:0%;z-index:999999;"><img style="width: 100%;border-radius: 50%;border:1px solid #2597AC;"src='+OriginalColorImg+'><br><div style="width: 100%;text-align: center;">'+OriginalColor+'</div></div><div class="col-xs-3" style="padding:0%;margin:0%;margin-left:-5%;"><img style="width: 100%;border-radius: 50%;border:1px solid #2597AC;"src='+HairLengthImg+'><br><div style="width: 100%;text-align: center;">'+HairLength+'</div></div><div class="col-xs-3" style="padding:0%;margin:0%;z-index:-1;margin-left:-5%;"><img style="width: 100%;border-radius: 50%;"src='+WhiteHairPercentageImg+'><br><div style="width: 100%;text-align: center;">'+WhiteHairPercentage+'%</div></div><div class="col-xs-3" style="padding:0%;margin:0%;"><img src="img/icons/ChevronTurquesaDireita.png" style="margin-top: 25%;    width: 40%;margin-left: 50%;"></div></div><div class="col-xs-3" style="padding: 0%;"><img style="width: 70%;border-radius: 50%;border:1px solid #2597AC;"src='+NuanceImg+'><br><div style="width: 70%;text-align: center;">'+Nuance+'</div></div></div></div></div>'); 

                                        }else{
											var pic = '';
                                             if(allkindschedule[0].photo!=''){
                                               pic = allkindschedule[0].photo;
                                            }else{
												pic = "img/icons/Foto%20do%20usuario%20-%2001.png";
                                            }
											$("#conteudo").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="margin-top:1%;font-size: 7vw;font-weight: 100;"><img id="changesignal'+allkindschedule[0].id+'"  src="img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:30px;width:30px;align-items: center;margin-left: 30px;"></div></div><div id="'+allkindschedule[0].id+'" class="col-xs-12 hide" style="color:white;font-family: \'Open Sans\';margin-left:0%;margin-right:0%;"><div class="col-xs-12" style="color:#2597AC;padding:2%;"><div class="col-xs-3" style="padding:2%;"><img style="height:20vw!important;border-radius:20vh;width:12vh;border: 1px solid #999933;" class="fotousuario profile-pic" src ="img/icons/Foto%20do%20usuario%20-%2001.png"></div><div class="col-xs-9"><div class="col-xs-12"><div class="col-xs-11" style="padding:2%;font-weight:bolder;"">'+allkindschedule[0].name.toUpperCase()+'</div><div class="col-xs-1" style="padding:2%;vertical-align: top;"><img src="https://secure.jezzy.com.br/jezzy-mobile-professionals/public_html/img/icons/Voucher-06.png" style="height:20px;width:35px;"></div></div><div class="col-xs-12" style="padding:1%;"><div class="col-xs-4" style="font-weight:bolder;">SEXO</div><div class="col-xs-8">Feminino</div></div><div class="col-xs-12"  style="padding:1%;"><div class="col-xs-4" style="font-weight:bolder;">IDADE</div><div class="col-xs-8">'+quantos_anos+' anos</div></div><div class="col-xs-12"  style="padding:1%;"><div class="col-xs-4" style="font-weight:bolder;">CABELO</div><div class="col-xs-8">'+cabelo+'</div></div></div></div><div class="col-xs-12" style="color:#2597AC;text-align:center;padding:2%;font-weight:bolder;border-top:1px solid #2597AC;">'+allkindschedule[0].subclasse_name.toUpperCase()+'</div><div class="col-xs-12" style="color:#2597AC;"><div class="col-xs-9" style="padding:0%;margin:0%;padding-left:2%;"><div class="col-xs-3" style="padding:0%;margin:0%;z-index:999999;"><img style="width: 100%;border-radius: 50%;border:1px solid #2597AC;"src='+OriginalColorImg+'><br><div style="width: 100%;text-align: center;">'+OriginalColor+'</div></div><div class="col-xs-3" style="padding:0%;margin:0%;margin-left:-5%;"><img style="width: 100%;border-radius: 50%;border:1px solid #2597AC;"src='+HairLengthImg+'><br><div style="width: 100%;text-align: center;">'+HairLength+'</div></div><div class="col-xs-3" style="padding:0%;margin:0%;z-index:-1;margin-left:-5%;"><img style="width: 100%;border-radius: 50%;"src='+WhiteHairPercentageImg+'><br><div style="width: 100%;text-align: center;">'+WhiteHairPercentage+'%</div></div><div class="col-xs-3" style="padding:0%;margin:0%;"><img src="img/icons/ChevronTurquesaDireita.png" style="margin-top: 25%;    width: 40%;margin-left: 50%;"></div></div><div class="col-xs-3" style="padding: 0%;"><img style="width: 70%;border-radius: 50%;border:1px solid #2597AC;"src='+NuanceImg+'><br><div style="width: 70%;text-align: center;">'+Nuance+'</div></div></div></div></div>');
                                          
                                        }
                                    }

								}else{
									
									 if(japassou == true){
                                        if(allkindschedule[0].voucher_id==0){

                                                $("#conteudo").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9" style="padding-top:2vw;"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="background-color:white;padding-top:3%;font-size: 7vw;font-weight: 100;height:100%;text-align:center;padding-left:0%;padding-right: 0%;color:#2597AC;"><img src = "img/icons/check-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"  onclick="servicerealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');"><img onclick="servicedidntrealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');" src = "img/icons/cancel-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"></div></div>');
                                          
                                        }else{

                                                $("#conteudo").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="background-color:white;padding-top:3%;font-size: 7vw;font-weight: 100;height:100%;text-align:center;padding-left:0%;padding-right: 0%;color:#2597AC;"><img src = "img/icons/check-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"  onclick="servicerealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');"><img onclick="servicedidntrealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');" src = "img/icons/cancel-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"></div></div>');



                                           
                                        }
                                    }else{
                                        if(allkindschedule[0].voucher_id==0){
											
											var pic = '';
                                            if(allkindschedule[0].photo!=''){
                                               pic = allkindschedule[0].photo;
                                            }else{
												pic = "img/icons/Foto%20do%20usuario%20-%2001.png";
                                            }

											$("#conteudo").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="margin-top:1%;font-size: 7vw;font-weight: 100;"><img id="changesignal'+allkindschedule[0].id+'"  src="img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:30px;width:30px;align-items: center;margin-left: 30px;"></div></div><div id="'+allkindschedule[0].id+'" class="col-xs-12 hide" style="color:white;font-family: \'Open Sans\';margin-left:0%;margin-right:0%;"><div class="col-xs-12" style="color:#2597AC;padding:2%;"><div class="col-xs-3" style="padding:2%;"><img style="height:20vw!important;border-radius:20vh;width:12vh;border: 1px solid #2597AC;" class="fotousuario profile-pic" src = '+pic+'></div><div class="col-xs-9"><div class="col-xs-12" style="padding:2%;font-weight:bolder;"">'+allkindschedule[0].name.toUpperCase()+'</div><div class="col-xs-12" style="padding:1%;"><div class="col-xs-4" style="font-weight:bolder;">SEXO</div><div class="col-xs-8">Feminino</div></div><div class="col-xs-12"  style="padding:1%;"><div class="col-xs-4" style="font-weight:bolder;">IDADE</div><div class="col-xs-8">'+quantos_anos+' anos</div></div><div class="col-xs-12"  style="padding:1%;"><div class="col-xs-4" style="font-weight:bolder;">CABELO</div><div class="col-xs-8">'+cabelo+'</div></div></div></div></div>'); 
                                         
									
											
											
                                        }else{
											var pic = '';
                                             if(allkindschedule[0].photo!=''){
                                               pic = allkindschedule[0].photo;
                                            }else{
												pic = "img/icons/Foto%20do%20usuario%20-%2001.png";
                                            }
											$("#conteudo").append('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule[0].subclasse_name)+'</span></div><div class="col-xs-3" style="margin-top:1%;font-size: 7vw;font-weight: 100;"><img id="changesignal'+allkindschedule[0].id+'"  src="img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:30px;width:30px;align-items: center;margin-left: 30px;"></div></div><div id="'+allkindschedule[0].id+'" class="col-xs-12 hide" style="color:white;font-family: \'Open Sans\';margin-left:0%;margin-right:0%;"><div class="col-xs-12" style="color:#2597AC;padding:2%;"><div class="col-xs-3" style="padding:2%;"><img style="height:20vw!important;border-radius:20vh;width:12vh;border: 1px solid #999933;" class="fotousuario profile-pic" src ="img/icons/Foto%20do%20usuario%20-%2001.png"></div><div class="col-xs-9"><div class="col-xs-12"><div class="col-xs-11" style="padding:2%;font-weight:bolder;"">'+allkindschedule[0].name.toUpperCase()+'</div><div class="col-xs-1" style="padding:2%;vertical-align: top;"><img src="https://secure.jezzy.com.br/jezzy-mobile-professionals/public_html/img/icons/Voucher-06.png" style="height:20px;width:35px;"></div></div><div class="col-xs-12" style="padding:1%;"><div class="col-xs-4" style="font-weight:bolder;">SEXO</div><div class="col-xs-8">Feminino</div></div><div class="col-xs-12"  style="padding:1%;"><div class="col-xs-4" style="font-weight:bolder;">IDADE</div><div class="col-xs-8">'+quantos_anos+' anos</div></div><div class="col-xs-12"  style="padding:1%;"><div class="col-xs-4" style="font-weight:bolder;">CABELO</div><div class="col-xs-8">'+cabelo+'</div></div></div></div></div>');
                                          
                                        }
                                    }
								

								}
					}else{			
								//AGENDAMENTOS SOLICITADOS
								var hour2 = allkindschedule[0].time_end;
								time_end = hour2.split(':')[0]+":"+hour2.split(':')[1];
								
								if(allkindschedule[0].subclasse_id >=15 && allkindschedule[0].subclasse_id <=23 && have == true){ //verifica se é agendamento de coloração para preparar visualização dos parametros
									$("#conteudo").append('<div class="col-xs-12" style="background-color: #2597AC;border:1px solid lightgrey;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-8" style="padding-left: 4%!important;margin-top:2.5%!important;"><span class="col-xs-2">'+date+'</span><span class="col-xs-10" style="padding-left: 10%;">'+allkindschedule[0].name+'</span><span class="col-xs-2">'+hour+'</span><span style="overflow: hidden;white-space: nowrap;padding-left: 10%;" class="col-xs-10">'+allkindschedule[0].subclasse_name+'</span></div><div class="col-xs-4" style="font-size: 7vw;font-weight: 100;padding:0%;"><div class="col-xs-12" style="padding:0%;margin-top:2.5%!important;"><img class="col-xs-4" onclick="infocoloracao(\''+Nuance+'\', \''+WhiteHairPercentage+'\', \''+OriginalColor+'\', \''+HairLength+'\')" src="img/icons/mais.png" style="height:35px;width:35px;padding-top:5%!important;padding-left: 2%!important;padding-right: 2%!important; padding-bottom: 2%!important;"><img class="col-xs-4" src="img/icons/ok%20-%20check.png" onclick="aceptSchedule('+allkindschedule[0].id+', \''+utf8_decode(allkindschedule[0].subclasse_name)+'\', \''+allkindschedule[0].name+'\', \''+hora+':'+str_minutos+'\', \'' +  dia + '/' + str_month + '\', \''+time_end+'\')" style="height:40px;width:40px;padding: 8%!important;padding-top:7%!important;"><img class="col-xs-4" src="img/icons/Sair%20-%20branco-07.png" onclick="recuseSchedule('+allkindschedule[0].id+', \''+utf8_decode(allkindschedule[0].subclasse_name)+'\', \''+allkindschedule[0].name+'\', \''+hora+':'+str_minutos+'\', \'' +  dia + '/' + str_month + '\')" style="height:30px;width:40px;padding-top:7%!important;padding-left:2%!important;"></div></div></div>');
								}else{
									$("#conteudo").append('<div class="col-xs-12" style="background-color: #2597AC;border:1px solid lightgrey;height: 15vw!important;color:white;font-family: \'Open Sans\';padding-top:2vw;margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9" style="margin-top:2%;"><span class="col-xs-2">'+date+'</span><span class="col-xs-10">'+allkindschedule[0].name+'</span><span class="col-xs-2">'+hour+'</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+allkindschedule[0].subclasse_name+'</span></div><div class="col-xs-3" style="margin-top:2.5%;font-size: 7vw;font-weight: 100;"><img src="img/icons/ok%20-%20check.png" onclick="aceptSchedule('+allkindschedule[0].id+', \''+utf8_decode(allkindschedule[0].subclasse_name)+'\', \''+allkindschedule[0].name+'\', \''+hora+':'+str_minutos+'\', \'' +  dia + '/' + str_month + '\',\''+time_end+'\')" style="height:22px;width:22px;margin-top: -10%;"><img src="img/icons/Sair%20-%20branco-07.png" onclick="recuseSchedule('+allkindschedule[0].id+', \''+utf8_decode(allkindschedule[0].subclasse_name)+'\', \''+allkindschedule[0].name+'\', \''+hora+':'+str_minutos+'\', \'' +  dia + '/' + str_month + '\')" style="height:22px;width:22px;float:right;margin-top:10%;"></div></div>');
								}
							}
								
						}
							if(horarios != ""){
								agenda = new Array;
								horarios = horarios.split(',');
								for(var k=0;k<horarios.length;k++){
									agenda[k] = horarios[k];
								}
								
							}

        }else{
            var noschedules = utf8_decode('Não há agendamentos para esta semana!');
            $("#conteudo").html('<div class="col-xs-12" style="background-color: #2597AC;height: 18vw!important;color:white;font-family:\'Open Sans\';padding-top:1.5vw;margin-left:0%;margin-right:0%;padding-left:5%!important;padding-right:5%!important;text-align: center;"><span ><br>'+noschedules+'</span></div>');
        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });


}
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
function infocoloracao(nuance, whitehair, originalcolor, hairlength){
	var HairLengthImg = '';
	var OriginalColorImg = '';
	var WhiteHairPercentageImg = '';
	var NuanceImg = '';
	
	if(hairlength!="" && nuance !="" && whitehair!=""){
						switch(hairlength){
							case "Longos":
								HairLengthImg = 4; //ADICIONAR SRC DE IMAGEM CABELOS LONGOS
								hairlength = 'Longos';
							break;
							case "Curtos":
								HairLengthImg = 2; //ADICIONAR SRC DE IMAGEM CABELOS CURTOS
								hairlength = 'Curtos';
							break;
							case "Médios":
								HairLengthImg = 3; //ADICIONAR SRC DE IMAGEM CABELOS MEDIOS
								hairlength = 'Médios';
							break;
							case "Raizes":
								HairLengthImg = 1; //ADICIONAR SRC DE IMAGEM RETOQUE DA RAIZ
								hairlength = 'Raizes';
							break;
						}
						
						HairLengthImg = "https://secure.jezzy.com.br/jezzy-colorimetria/img/materials/HairLength"+HairLengthImg+".jpg";
						OriginalColorImg = "https://secure.jezzy.com.br/jezzy-colorimetria/img/Cores/Jezzy-Materiais%20Coloracao-"+pad(originalcolor)+".jpg";
						WhiteHairPercentageImg = "https://secure.jezzy.com.br/jezzy-colorimetria/img/Porcentagens%20Cabelos%20Brancos/Niveis%20de%20Cabelos%20Brancos%20-%20"+whitehair+"%20porcento.jpg"; //ADICIONAR CAMINHO
						NuanceImg = "https://secure.jezzy.com.br/jezzy-colorimetria/img/nuances%20desejadas/"+nuance+".png"; //ADICIONAR CAMINHO
					}
	
	 $.dialog({
        title: utf8_decode('Informações'),
        content: '<div class="col-xs-12" style="color:white;"><div class="col-xs-9" style="padding:0%;margin:0%;padding-left:2%;"><div class="col-xs-3" style="padding:0%;margin:0%;z-index:999999;"><img style="width: 100%;border-radius: 50%;border:1px solid #2597AC;"src='+OriginalColorImg+'><br><div style="width: 100%;text-align: center;">'+originalcolor+'</div></div><div class="col-xs-3" style="padding:0%;margin:0%;margin-left:-5%;"><img style="width: 100%;border-radius: 50%;border:1px solid #2597AC;"src='+HairLengthImg+'><br><div style="width: 100%;text-align: center;">'+hairlength+'</div></div><div class="col-xs-3" style="padding:0%;margin:0%;z-index:-1;margin-left:-5%;"><img style="width: 100%;border-radius: 50%;"src='+WhiteHairPercentageImg+'><br><div style="width: 100%;text-align: center;">'+whitehair+'%</div></div><div class="col-xs-3" style="padding:0%;margin:0%;"><img src="img/icons/ChevronTurquesaDireita.png" style="margin-top: 25%; width: 40%;margin-left: 50%;"></div></div><div class="col-xs-3" style="padding: 0%;"><img style="width: 70%;border-radius: 50%;border:1px solid #2597AC;"src='+NuanceImg+'><br><div style="width: 70%;text-align: center;">'+nuance+'</div></div></div></div>',
        animation: 'zoom',
        closeIcon:false,
        closeAnimation: 'scale',
        animationBounce: 1.5,
        backgroundDismiss:true,
        theme: 'supervan',
        keyboardEnabled: true

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
function pendingconfirmations(){
    var query = "SELECT * FROM schedules PendingConfirmations INNER JOIN users User ON User.id = PendingConfirmations.user_id WHERE PendingConfirmations.status = 1 and PendingConfirmations.secondary_user_id = "+ $.cookieStorage.get('SecondaryUser').id+"  and DATE(PendingConfirmations.date) < DATE(NOW()) or PendingConfirmations.status = 1 and PendingConfirmations.secondary_user_id = "+ $.cookieStorage.get('SecondaryUser').id+"  and DATE(PendingConfirmations.date) = DATE(NOW()) and TIME(PendingConfirmations.time_end) <= TIME(NOW());";
  
    var HTML = '';
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
            var objReturns = unserialize(JSON.parse(Base64.decode(JSON.parse(JSON.stringify(result)))));

            for(var i =0;i<objReturns.length;i++){
                var allkindschedule = objReturns[i].PendingConfirmations;
                var data =  moment((allkindschedule.date+" "+allkindschedule.time_begin));
                var str_month = '';
                var ano = data.get('year');
                var mes = data.get('month');
                var dia = data.get('date');
                var hora =  data.get('hour');
                var minuto = data.get('minute');
                var nome = objReturns[i].User;
                str_month = new String(mes+1);
                if (str_month.length < 2)
                    str_month = 0 + str_month;
                str_minutos = new String(minuto);
                if (str_minutos.length < 2) {
                    str_minutos = 0 + str_minutos;
                }
                    HTML += ('<div class="col-xs-12" style="border:1px solid lightgrey;background-color: #78BDCA;height: 15vw!important;color:white;font-family: \'Open Sans\';margin-left:0%;margin-right:0%;padding-left:0%;padding-right:0%;"><div class="col-xs-9" style="padding-top:2vw;"><span class="col-xs-2">' +  dia + '/' + str_month + '</span><span class="col-xs-10">'+nome.name+'</span><span class="col-xs-2">' + hora +':'+str_minutos + '</span><span style="overflow: hidden;white-space: nowrap;" class="col-xs-10">'+(allkindschedule.subclasse_name)+'</span></div><div class="col-xs-3" style="background-color:white;padding-top:3%;font-size: 7vw;font-weight: 100;height:100%;text-align:center;padding-left:0%;padding-right: 0%;color:#2597AC;"><img src = "img/icons/check-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"  onclick="servicerealized('+allkindschedule.id+',\''+nome.name+'\', \''+allkindschedule.subclasse_name+'\');"><img onclick="servicedidntrealized('+allkindschedule.id+',\''+nome.name+'\', \''+allkindschedule.subclasse_name+'\');" src = "img/icons/cancel-mark-green.png" style="padding: 3%;float: left;margin-left: 10%;width: 35%;"></div></div>');

                    //<tr><td style="padding:0%;margin:0%;float:left;text-align:left;"><span>'+utf8_decode("SERVIÇO JÁ FOI REALIZADO?")+'</span></td><td style="padding:0%;margin:0%;"><span style="padding:2%;" class="glyphicon glyphicon-ok" onclick="servicerealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');"></span><span onclick="servicedidntrealized('+allkindschedule[0].id+',\''+allkindschedule[0].name+'\', \''+allkindschedule[0].subclasse_name+'\');" style="padding:2%;" class="glyphicon glyphicon-remove"></span></td></tr>

                    /* $("#conteudo").append('<tr><td style="padding-top:1%;padding-left:1%;padding-right:1%;">' +  dia + '/' + str_month + '</td><td style="padding-top:1%;text-align:center;width:60%;">'+allkindschedule[0].name+'</td><td colspan="2" style="vertical-align: middle;" valign="middle"><img id="icone'+allkindschedule[0].id+'" src="https://secure.jezzy.com.br/jezzy-mobile-professionals/public_html/img/icons/mais.png" onclick="expand('+allkindschedule[0].id+',\''+serviceinteger+'\', 1, \''+hora +':'+str_minutos+'\');" style="height:35px;width:35px;padding:2%;margin-left:10%;"></td></tr><tr><td style="margin-top:0%!important;padding-bottom:3%;padding-right:1%;padding-left:1%;" id="hour'+allkindschedule[0].id+'">' + hora +':'+str_minutos + '</td><td style="padding-bottom:3%;margin-top:0%!important;text-align:center;" id="service'+allkindschedule[0].id+'">'+servico.toUpperCase()+'</td></tr><div style="border: 1px solid #d3d3d3;"></div><div class="hide" id="'+allkindschedule[0].id+'" style="background-color:white;color:#A9A055;font-family: \'Open Sans\';width: 100%;font-size:1em;"><div class="col=xs=12"><div class="col-xs-10"><label style="color:#2597AC;font-size:1.3em;">Perfil do Comprador:</label></div><div class="col-xs-2"><img src="https://secure.jezzy.com.br/jezzy-mobile-professionals/public_html/img/icons/Voucher-06.png" style="height:20px;width:35px;"></div></div><div class="col-xs-12"><div class="col-xs-3"><img class="fotousuario profile-pic" src = '+allkindschedule[0].photo+'></div><div class="col-xs-9"  style="margin-top:4%;"><label>'+allkindschedule[0].name+'</label></div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Gênero:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+gender+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Cabelo:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+hairs+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Mais sobre o cabelo:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+chemistrys+'</div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Idade:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+quantos_anos+' anos</div></div><div class="col-xs-12"><div class="col-xs-10"><label style="color:#2597AC;font-size:1.3em;margin-bottom:3%;">'+utf8_decode("Informações do Serviço:")+'</label></div></div><div class="col-xs-12"><div class="col-xs-4"><label style="color:#A9A055;margin-top:2%;">'+utf8_decode("Serviço:")+'</label></div><div class="col-xs-8" style="text-align: left;">'+serviceinteger.toUpperCase()+'</div></div><div class="col-xs-12"><div class="col-xs-3"><label>Hora:</label></div><div class="col-xs-3">' + hora +':'+str_minutos + '</div><div class="col-xs-3"><label>Data:</label></div><div class="col-xs-3">' +  dia + '/' + str_month + '</div></div></div></div>');*/



            }
            $("#conteudo").prepend(HTML);
        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}
function servicerealized(id, client, service){


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
                    window.location.href = 'schedules_display.html';

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
                            window.location.href = 'schedules_display.html';
                        }


                    });

                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
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

            alert(query);
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

                    window.location.href = 'schedules_display.html';



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
                            window.location.href = 'schedules_display.html';
                        }


                    });

                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });

        },
        cancel: function () {

        }
    });

}
function findsugestions(iniciosolicitacao,fimsolicitacao,datasolicitacao){ // cria array de horarios sugeridos baseado nos horarios livres no dia solicitado

	var aberturaSalao = moment($.cookieStorage.get('companies').open_hour, 'h:mm:ss'); // pega o horario que o salao abre
	var fechamentoSalao = moment($.cookieStorage.get('companies').close_hour, 'h:mm:ss'); // pega horario que o salao fecha
	var tamanhoServico = fimsolicitacao.diff(iniciosolicitacao, 'minutes'); // pega o tamanho do serviço em minutos
	
	if(agenda!=""){ // se houverem elementos na agenda de confirmados
		for(var a=0;a<agenda.length;a++){ // remove elementos de horarios já passados deixando array apenas com elementos possiveis para agendamento
			
			var t = new Date();
			t.setMonth(((agenda[a].split('-')[0]).split("/")[1])-1);
			t.setDate(pad((agenda[a].split('-')[0]).split("/")[0]));
			dataDoAgendamentoParaComparacao = (moment.utc(t));
			dataDeHojeParaComparacao = (moment.utc(new Date(), 'D/mm'));
			
		
			if(dataDoAgendamentoParaComparacao._i>=(dataDeHojeParaComparacao._i)){
			
			}else{
				removed = agenda.splice(a,1);
				
				a--;
			}
		}
		
		for(var i=0;i<agenda.length;i++){ // passa no novo array pegando os espaços disponiveis entre os agendamentos confirmados
			
			var inicioagendado = (moment((agenda[i].split('-')[1]).split('_')[0], 'h:mm:ss')); // pega horario de inicio do elemento(agendamento confirmado) atual
			var fimagendado = (moment((agenda[i].split('-')[1]).split('_')[1], 'h:mm:ss'));// pega horario de fim do elemento(agendamento confirmado) atual
			var dataagendado = moment(agenda[i].split('-')[0], 'D/mm'); // pega data do elemento(agendamento confirmado) atual
	
		
			
				
				
			if(i==0){ // se for o primeiro elemento da lista
					
				if(tamanhoServico <= (inicioagendado.diff(aberturaSalao, 'minutes'))){ // verifica se o tempo de serviço é menor que a diferença de tempo entre a abertura e o primeiro agendammento confirmado
							
							
					if(moment(datasolicitacao, 'D/mm')._i<=(moment(new Date(), 'D/mm'))._i){ // se a data da solicitacao for para hoje
						
						if(inicioagendado.isSameOrAfter(moment(new Date, 'h:mm:ss'))){ //  se o horario do agendamento confirmado for o mesmo ou depois que a hora atual
							datasolicitacao = datasolicitacao.format('DD/MM');
							datasolicitacao = datasolicitacao.split("/")[0]+"/"+((datasolicitacao.split("/")[1]/1)+1);
							ArraySugestoes[(ArraySugestoes.length/1)] = aberturaSalao.format('HH:mm:ss')+"-"+inicioagendado.format('HH:mm:ss')+">"+datasolicitacao+"/"+tamanhoServico;
						}
						
					}else{
							
						if(moment(datasolicitacao, 'D/mm')._i>(moment(new Date(), 'D/mm'))._i){ // verifica se a data solicitada é maior que hoje
							
							datasolicitacao = datasolicitacao.format('DD/MM');
							datasolicitacao = datasolicitacao.split("/")[0]+"/"+((datasolicitacao.split("/")[1]/1)+1);
						
							ArraySugestoes[(ArraySugestoes.length/1)] = aberturaSalao.format('HH:mm:ss')+"-"+inicioagendado.format('HH:mm:ss')+">"+datasolicitacao+"/"+tamanhoServico;
						}
					}
					
				
				}
				
				
				if(agenda.length>1){
					var inicioagendadoprox = (moment((agenda[i+1].split('-')[1]).split('_')[0], 'h:mm:ss'));
					var fimagendadoprox = (moment((agenda[i+1].split('-')[1]).split('_')[1], 'h:mm:ss'));
					var dataagendadoprox = moment(agenda[i+1].split('-')[0], 'D/mm');
				
					if(tamanhoServico<= inicioagendadoprox.diff(fimagendado, 'minutes')){
					if(moment(datasolicitacao, 'D/mm')._i<=(moment(new Date(), 'D/mm'))._i){
						if(inicioagendadoprox.isSameOrAfter(moment(new Date, 'h:mm:ss'))){
							datasolicitacao = datasolicitacao.format('DD/MM');
							datasolicitacao = datasolicitacao.split("/")[0]+"/"+datasolicitacao.split("/")[1]+1;
							ArraySugestoes[(ArraySugestoes.length/1)] = fimagendado.format('HH:mm:ss')+"-"+inicioagendadoprox.format('HH:mm:ss')+">"+datasolicitacao+"/"+tamanhoServico;
						}
					}else{
						if(moment(datasolicitacao, 'D/mm').isAfter(moment(new Date, 'D/mm'))){
							
						ArraySugestoes[(ArraySugestoes.length/1)] = fimagendado.format('HH:mm:ss')+"-"+inicioagendadoprox.format('HH:mm:ss')+">"+datasolicitacao+"/"+tamanhoServico;
						}
						}
					}
				}
				
			}else if(i+1==agenda.length){ //verifica se estamos no ultimo elemento(agendamento confirmado)
				if(tamanhoServico <= (fechamentoSalao.diff(fimagendado, 'minutes'))){
					if(moment(datasolicitacao, 'D/mm')._i<=(moment(new Date(), 'D/mm'))._i){
						if(fechamentoSalao.isSameOrAfter(moment(new Date, 'h:mm:ss'))){
							ArraySugestoes[(ArraySugestoes.length/1)] = fimagendado.format('HH:mm:ss')+"-"+fechamentoSalao.format('HH:mm:ss')+">"+datasolicitacao+"/"+tamanhoServico;
						}
					}else{
						if(moment(datasolicitacao, 'D/mm').isAfter(moment(new Date, 'D/mm'))){
							
							ArraySugestoes[(ArraySugestoes.length/1)] = fimagendado.format('HH:mm:ss')+"-"+fechamentoSalao.format('HH:mm:ss')+">"+datasolicitacao+"/"+tamanhoServico;
						}
					}
				}
			}else{  // se não for o primeiro nem o ultimo elemento
					
				var inicioagendadoprox = (moment((agenda[i+1].split('-')[1]).split('_')[0], 'h:mm:ss'));
				var fimagendadoprox = (moment((agenda[i+1].split('-')[1]).split('_')[1], 'h:mm:ss'));
				var dataagendadoprox = moment(agenda[i+1].split('-')[0], 'D/mm');
				
				if(tamanhoServico<= inicioagendadoprox.diff(fimagendado, 'minutes')){
					if(moment(datasolicitacao, 'D/mm')._i<=(moment(new Date(), 'D/mm'))._i){
						if(inicioagendadoprox.isSameOrAfter(moment(new Date, 'h:mm:ss'))){
							datasolicitacao = datasolicitacao.format('DD/MM');
							datasolicitacao = datasolicitacao.split("/")[0]+"/"+datasolicitacao.split("/")[1]+1;
							ArraySugestoes[(ArraySugestoes.length/1)] = fimagendado.format('HH:mm:ss')+"-"+inicioagendadoprox.format('HH:mm:ss')+">"+datasolicitacao+"/"+tamanhoServico;
						}
					}else{
						if(moment(datasolicitacao, 'D/mm').isAfter(moment(new Date, 'D/mm'))){
							
						ArraySugestoes[(ArraySugestoes.length/1)] = fimagendado.format('HH:mm:ss')+"-"+inicioagendadoprox.format('HH:mm:ss')+">"+datasolicitacao+"/"+tamanhoServico;
						}
					}
				}
			}
		}
		//10:00:00-11:30:00>01/11/60
		/*var arraydehorariospordata  = new Array;
		var objeto  = new Array;
		var data = 0;
		var cont = 0;
			
			for(var l=0;l<ArraySugestoes.length;l++){
			
			data = (ArraySugestoes[l].split(">")[1]).split("/")[0]+"/"+(ArraySugestoes[l].split(">")[1]).split("/")[1];
			var tempodeservico = (ArraySugestoes[l].split(">")[1]).split("/")[2];
			
			
				for(var cont=0;cont<ArraySugestoes.length;cont++){
					
					datac = (ArraySugestoes[cont].split(">")[1]).split("/")[0]+"/"+(ArraySugestoes[l].split(">")[1]).split("/")[1];
					
					if(datac == data){
						var inicio = (ArraySugestoes[cont].split("-")[0]);
						var fim = (ArraySugestoes[cont].split("-")[1]).split(">")[0];
						objeto[cont] = {horarioinicialintervalo:inicio, horariofinalintervalo:fim};
					}
					
					
				}
				arraydehorariospordata[data] = objeto;
				
				
				
			}
			console.log(arraydehorariospordata);
		
		/**********************************************************************************************/
		
		
		for(var l=0;l<ArraySugestoes.length;l++){
			console.log(ArraySugestoes[l]);
		}
		
			
		
		
	}
}
function aceptSchedule(id, service, client, hour, date, timeend){
		
	var bool = false;
	//var bool = false;
	if(agenda!=""){
	
		iniciosolicitacao = (moment(hour+":00", 'h:mm:ss'));
		fimsolicitacao =  (moment(timeend+":00", 'h:mm:ss'));
		var date1 = new Date();
		date1.setMonth(date.split('/')[1]-1);
		date1.setDate(pad(date.split('/')[0]));
		datasolicitacao = moment(date1, 'DD/mm');
	
		/*findsugestions(iniciosolicitacao,fimsolicitacao, datasolicitacao);
		
		
		for(var i=0;i<agenda.length;i++){
			
			var data = agenda[i].split('-')[0];
			var hora = agenda[i].split('-')[1];
			endtime = hora.split('_')[1];
			hora = hora.split('_')[0];
			
			inicioagendado = (moment(hora, 'h:mm:ss'));
			fimagendado = (moment(endtime, 'h:mm:ss'));
			var date2 = new Date();
			date2.setMonth(data.split('/')[1]-1);
			date2.setDate(pad(data.split('/')[0]));
			dataagendado = moment(date2, 'DD/mm');
			
			
			if((moment.utc(dataagendado)._i)>=((moment.utc()._d))){
			
				if(datasolicitacao.isSame(dataagendado) && ((iniciosolicitacao.isBetween(inicioagendado, fimagendado))||(fimsolicitacao.isBetween(inicioagendado, fimagendado))||(iniciosolicitacao == inicioagendado && fimsolicitacao == fimagendado))){
				bool = true;
				
			}
			}
			
		}*/
		if(bool == true){
				//sugerir novo horario?
				var aberto = false;
				
				var txtfixed = "<a href='#' class='list-group-item active col-xs-4'><h4 class='list-group-item-heading'>"+(ArraySugestoes[0].split(">")[1]).split("/")[0]+"/"+(ArraySugestoes[0].split(">")[1]).split("/")[1]+"</h4><p class='list-group-item-text'>"+(ArraySugestoes[0].split("-")[0])+"</p></a>";
				var txt = '<div class="col-xs-12"><a href="#" class="list-group-item active  col-xs-2" onclick="ClickSugestedScheduling(this);"><h4 class="list-group-item-heading">10/10</h4><p class="list-group-item-text">15:00</p></a><a href="#" class="list-group-item col-xs-2" onclick="ClickSugestedScheduling(this);" ><h4 class="list-group-item-heading">15/10</h4><p class="list-group-item-text">20:00</p></a><a href="#" class="list-group-item  col-xs-2" onclick="ClickSugestedScheduling(this);"><h4 class="list-group-item-heading">25/10</h4><p class="list-group-item-text">16:00</p></a><a href="#" class="list-group-item  col-xs-2" onclick="ClickSugestedScheduling(this);" ><h4 class="list-group-item-heading">25/10</h4><p class="list-group-item-text">22:00</p></a><a href="#" class="list-group-item  col-xs-2" onclick="ClickSugestedScheduling(this);"><h4 class="list-group-item-heading">25/10</h4><p class="list-group-item-text">16:00</p></a><a href="#" class="list-group-item  col-xs-2" onclick="ClickSugestedScheduling(this);"><h4 class="list-group-item-heading">25/10</h4><p class="list-group-item-text">22:00</p></a></div>';
			    $.confirm({
					  title: false,
                      content:	 utf8_decode('Já')+" existe um "+utf8_decode('serviço')+" agendado para este "+utf8_decode('horário')+".<br>O "+utf8_decode('próximo horário disponível é:')+"<br><br><div class='col-xs-12'><div class='col-xs-4'></div><div class='list-group'>"+txtfixed+"<div class='col-xs-4'></div></div><br></div>",
							animation: 'top',
							closeAnimation: 'opacity',
							animationSpeed: 1200,
							animationBounce: 1.2,
						    columnClass: 'col-md-6 col-md-offset-3',
							theme: 'supervan',
                            closeIcon: true,
                            confirmButton: 'Confirmar',
							cancelButton:'Escolher outro',
                            backgroundDismiss: false,
							confirm: function(){
								
								
							

	
								
							}, cancel: function(){
								if(aberto == false){
								this.setContent('<br><div class="jumbotron" style="color:#2597AC;padding-top:0%!important;"><div class="list-group">'+txt+'</div></div>');
								
								aberto = true;
								}else{
									this.setContent(utf8_decode('Já')+" existe um "+utf8_decode('serviço')+" agendado para este "+utf8_decode('horário')+".<br>O "+utf8_decode('próximo horário disponível é:')+"<br><br><div class='col-xs-12'><div class='col-xs-4'></div><div class='list-group'>"+txtfixed+"<div class='col-xs-4'></div></div><br></div>");
									
									aberto = false;
								}
								
								return false; // prevent modal from closing
							}
								
                });
		}else{
			
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
                            window.location.href = 'schedules_display.html';
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
                                    window.location.href = 'schedules_display.html';
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
                                            window.location.href = 'schedules_display.html';
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

                                                    if(convertedReturnSchedulesSolicitation[0].schedules_solicitation.voucher_id ==0){
                                                        $.ajax({
                                                            method: "POST",
                                                            url: 'https://secure.jezzy.com.br/jezzy-portal/company/sendMobileNotification/'+convertedReturnSchedulesSolicitation[0].schedules_solicitation.user_id+'/Agendamento%20Confirmado!'
                                                        }).done(function(){
                                                            window.location.href = 'schedules_display.html';
                                                        });
                                                    }else {
                                                        var query = "update services_vouchers set status = 'USED' where id =" + convertedReturnSchedulesSolicitation[0].schedules_solicitation.voucher_id;

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
                                                                    url: 'https://secure.jezzy.com.br/jezzy-portal/company/sendMobileNotification/' + convertedReturnSchedulesSolicitation[0].schedules_solicitation.user_id + '/Agendamento%20Confirmado!'
                                                                }).done(function () {
                                                                    window.location.href = 'schedules_display.html';
                                                                });
                                                            } else {


                                                                $.alert({
                                                                    title: false,
                                                                    content: 'Falha ao aceitar agendamento',
                                                                    animation: 'zoom',
                                                                    closeAnimation: 'scale',
                                                                    animationBounce: 1.5,
                                                                    theme: 'supervan',
                                                                    closeIcon: false,
                                                                    confirmButton: false,
                                                                    backgroundDismiss: true,
                                                                    onClose: function () {
                                                                        window.location.href = 'schedules_display.html';
                                                                    }


                                                                });
                                                            }
                                                        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                                            alert(errorThrown);
                                                        });


                                                    }





                                                } else {
                                                    $.alert({
                                                        title: false,
                                                        content: 'Erro na confirmação!',
                                                        animation: 'zoom',
                                                        closeAnimation: 'scale',
                                                        animationBounce: 1.5,
                                                        theme: 'supervan',
                                                        closeIcon: false,
                                                        confirmButton: false,
                                                        backgroundDismiss: true,
                                                        onClose: function () {
                                                            window.location.href = 'schedules_display.html';
                                                        }


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
                            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                alert(errorThrown);
                            });

                        }
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });

                } else {

                    window.location.href = 'schedules_display.html';
                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });


        },
        cancel: function () {

        }
    });
		}
		
	}else{
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
                            window.location.href = 'schedules_display.html';
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
                                    window.location.href = 'schedules_display.html';
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
                                            window.location.href = 'schedules_display.html';
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

                                                    if(convertedReturnSchedulesSolicitation[0].schedules_solicitation.voucher_id ==0){
                                                        $.ajax({
                                                            method: "POST",
                                                            url: 'https://secure.jezzy.com.br/jezzy-portal/company/sendMobileNotification/'+convertedReturnSchedulesSolicitation[0].schedules_solicitation.user_id+'/Agendamento%20Confirmado!'
                                                        }).done(function(){
                                                            window.location.href = 'schedules_display.html';
                                                        });
                                                    }else {
                                                        var query = "update services_vouchers set status = 'USED' where id =" + convertedReturnSchedulesSolicitation[0].schedules_solicitation.voucher_id;

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
                                                                    url: 'https://secure.jezzy.com.br/jezzy-portal/company/sendMobileNotification/' + convertedReturnSchedulesSolicitation[0].schedules_solicitation.user_id + '/Agendamento%20Confirmado!'
                                                                }).done(function () {
                                                                    window.location.href = 'schedules_display.html';
                                                                });
                                                            } else {


                                                                $.alert({
                                                                    title: false,
                                                                    content: 'Falha ao aceitar agendamento',
                                                                    animation: 'zoom',
                                                                    closeAnimation: 'scale',
                                                                    animationBounce: 1.5,
                                                                    theme: 'supervan',
                                                                    closeIcon: false,
                                                                    confirmButton: false,
                                                                    backgroundDismiss: true,
                                                                    onClose: function () {
                                                                        window.location.href = 'schedules_display.html';
                                                                    }


                                                                });
                                                            }
                                                        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                                            alert(errorThrown);
                                                        });


                                                    }





                                                } else {
                                                    $.alert({
                                                        title: false,
                                                        content: 'Erro na confirmação!',
                                                        animation: 'zoom',
                                                        closeAnimation: 'scale',
                                                        animationBounce: 1.5,
                                                        theme: 'supervan',
                                                        closeIcon: false,
                                                        confirmButton: false,
                                                        backgroundDismiss: true,
                                                        onClose: function () {
                                                            window.location.href = 'schedules_display.html';
                                                        }


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
                            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                alert(errorThrown);
                            });

                        }
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });

                } else {

                    window.location.href = 'schedules_display.html';
                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });


        },
        cancel: function () {

        }
    });
	}
   



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
                            alert(errorThrown);
                        });
                    }


                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
        }else{
            $.alert({
                title: false,
                content: 'O agendamento foi rejeitado!',
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
        alert(errorThrown);
    });

        },
        cancel: function () {
            $.alert({
                title: false,
                content: utf8_decode('Rejeição não') + ' foi realizada!',
                animation: 'zoom',
                closeAnimation: 'scale',
                animationBounce: 1.5,
                theme: 'supervan',
                closeIcon: false,
                confirmButton: false,
                backgroundDismiss: true

            });
        }
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