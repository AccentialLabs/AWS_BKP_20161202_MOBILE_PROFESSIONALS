$(document).ready(function () {


    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";


});
var offer_history_ID = '';


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

function voltar(){
    window.history.go(-1);
}
function setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
}
function sendRequest() {

    var query = "select *, count(*) allServices from schedules inner join users on users.id = schedules.user_id inner join facebook_profiles on facebook_profiles.user_id = users.id where schedules.companie_id = "+$.cookieStorage.get('companies').id+" and schedules.secondary_user_id = "+ $.cookieStorage.get('SecondaryUser').id+" GROUP BY users.id ORDER BY users.name ASC;";
	
    var conditions = {
        'User': {
            'query':query
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
        data: postData

    }).done(function(result) {
        if(result!=""){
			
            var objReturn = JSON.parse(JSON.stringify(result));

            var decodeObjReturn = Base64.decode(objReturn);

            var convertedReturn = (JSON.parse(decodeObjReturn));
			

            var users;
           // var offer_history_ID;

            for(var i=0; i<convertedReturn.length;i++) {
                users = convertedReturn[i];
              
                var gender = users.users.gender;
                if(gender == 'female'){
                    gender = 'Feminino';
                }else{
                    gender = 'Masculino';
                }

                var aniversario = new Date(users.users.birthday);
                var idade = 0;
                var ano_aniversario = aniversario.getFullYear();
                var mes_aniversario = aniversario.getMonth()+1;
                var dia_aniversario = aniversario.getDate();
                var d = new Date(),
                    ano_atual = d.getFullYear(),
                    mes_atual = d.getMonth() + 1,
                    dia_atual = d.getDate(),

                    ano_aniversario = +ano_aniversario,
                    mes_aniversario = +mes_aniversario,
                    dia_aniversario = +dia_aniversario,

                    idade = ano_atual - ano_aniversario;

                if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
                    idade--;
                }


                var hair = '';
                var hairsplit = '';
                var hairs = '';
                if(users.facebook_profiles.hair_type != null){
                    hair = utf8_decode(users.facebook_profiles.hair_type);
                    hairs = '';
                    hairsplit = hair.split(';');
                 
                    for(var h=0;h<hairsplit.length;h++){
                        if(hairsplit[h] == 'straight'){
                            hairsplit[h] = ('Liso');
                        }else if(hairsplit[h] == 'wavy/curly/kcc'){
                            hairsplit[h] = 'Ondulado/Cacheado/Crespo';
                        }else if(hairsplit[h] == 'mixed'){
                            hairsplit[h] = 'Misto';
                        }else if(hairsplit[h] == 'color/whitening'){
                            hairsplit[h] = ('Coloração/Clareamento');
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
                if(users.facebook_profiles.chemistry != null){
                    chemistry = utf8_decode(users.facebook_profiles.chemistry);
                    chemistry = utf8_decode(users.facebook_profiles.chemistry);
                    chemistry = utf8_decode(users.facebook_profiles.chemistry);
                    chemistry = utf8_decode(users.facebook_profiles.chemistry);
                    chemistrys = '';
                    chemistrysplit = chemistry.split(';');

                    for(var h=0;h<chemistrysplit.length;h++){
                        if(chemistrysplit[h] == 'straight'){
                            chemistrysplit[h] = 'Liso';
                        }else if(chemistrysplit[h] == 'wavy/curly/kcc'){
                            chemistrysplit[h] = 'Ondulado/Cacheado/Crespo';
                        }else if(chemistrysplit[h] == 'color/whitening'){
                            chemistrysplit[h] = ('Coloração/Clareamento');
                        }else if(chemistrysplit[h] == 'thin'){
                            chemistrysplit[h] = 'Fino';
                        }else if(chemistrysplit[h] == 'mixed'){
                            chemistrysplit[h] = 'Misto';
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

                if(users.users.photo == ''){
                    $("#Offer_History").append('<div style="border-top: 1px solid #d3d3d3;font-family:\'Open Sans\';font-size: 2.5vh;color:#A9A055;margin-top:2%;background-color: #2597ac;" class="col-xs-12"><div class="col-xs-3"><img class="fotousuario profile-pic" src = "https://secure.jezzy.com.br/jezzy-mobile/public_html/img/icons/Foto%20do%20usuario%20-%2001.png"></div><div class="col-xs-9" style="margin-top:4%;"><span style="padding:2%;text-align: center;font-weight: bold;color: white;">'+users.users.name+'</span><img style="width: 10%;float: right;" onclick="expand('+users.users.id+')" id="changesignal'+users.users.id+'" class="buttonplus" src="img/icons/mais.png"></div></div><table class="col-xs-12 accordion hide" id="'+users.users.id+'" style="width: 80%;margin-left: 10%;color:#2597AC;text-align: center;border: 1px solid lightgrey;border-collapse: separate;font-family:\'Open Sans\';padding-bottom: 2%;margin-top: 5%;"><tr style="border-bottom: 1px solid lightgrey;"><td style="padding-left: 5%;font-weight: bolder;padding-top: 2%;text-align: left;" >Serviços realizados</td><td style="padding-top: 2%;font-weight: bold;color: gray;">'+users[0].allServices+' <span onclick="openDetailsServices('+users.users.id+')" class="glyphicon glyphicon-new-window" aria-hidden="true"></span></td></tr><tr  style="border-bottom: 1px solid lightgrey;"><td style="padding-left: 5%;font-weight: bolder;text-align: left;">Sexo</td><td colspan="2" style="font-weight: bold;color: gray;">'+gender+'</td></tr><tr style="border-bottom: 1px solid lightgrey;"><td style="padding-left: 5%;font-weight: bolder;text-align: left;">Idade</td><td colspan="2" style="font-weight: bold;color: gray;">'+idade+'</td></tr style="border-bottom: 1px solid lightgrey;"><tr><td style="padding-left: 5%;font-weight: bolder;text-align: left;">Cabelo</td><td colspan="2" style="font-weight: bold;color: gray;">'+cabelo+'</td></tr></table>');
                }else{
                    $("#Offer_History").append('<div style="border-top: 1px solid #d3d3d3;font-family:\'Open Sans\';font-size: 2.5vh;color:#A9A055;margin-top:2%;background-color: #2597ac;" class="col-xs-12"><div class="col-xs-3"><img class="fotousuario profile-pic" src = '+users.users.photo+'></div><div class="col-xs-9" style="margin-top:4%;"><span style="padding:2%;text-align: center;font-weight: bold;color: white;">'+users.users.name+'</span><img style="width: 10%;float: right;" id="changesignal'+users.users.id+'" onclick="expand('+users.users.id+')" class="buttonplus" src="img/icons/mais.png"></div></div><table class="col-xs-12 accordion hide" id="'+users.users.id+'" style="width: 80%;margin-left: 10%;color:#2597AC;text-align: center;border:1px solid lightgrey;border-collapse: separate;font-family:\'Open Sans\'!important;padding-bottom: 2%;margin-top: 5%;"><td style="padding-left: 5%;font-weight: bolder;padding-top: 2%;text-align: left;">Serviços realizados</td><td style="padding-top: 2%;font-weight: bold;color: gray;">'+users[0].allServices+' <span onclick="openDetailsServices('+users.users.id+')" class="glyphicon glyphicon-new-window" aria-hidden="true"></span></td></tr><tr style="border-bottom: 1px solid lightgrey;"><td style="padding-left: 5%;font-weight: bolder;text-align: left;">Sexo</td><td colspan="2" style="font-weight: bold;color: gray;">'+gender+'</td></tr><tr style="border-bottom: 1px solid lightgrey;"><td style="padding-left: 5%;font-weight: bolder;text-align: left;">Idade</td><td colspan="2" style="font-weight: bold;color: gray;">'+idade+'</td></tr><tr style="border-bottom: 1px solid lightgrey;"><td style="padding-left: 5%;font-weight: bolder;text-align: left;">Cabelo</td><td colspan="2" style="font-weight: bold;color: gray;">'+cabelo+'</td></tr></table>');
                }
            }
        }else{
            var txt0 = utf8_decode('você');
            var txt =  utf8_decode('não');
            $("#Offer_History").append('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Você ainda não tem clientes!</div>');


        }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}
function openDetailsServices(id){
	//mostrar detalhes dos serviços feitos por esse usuario nesse salão
	
	var query = "select * from schedules inner join secondary_users on secondary_users.id = schedules.secondary_user_id where schedules.companie_id = "+$.cookieStorage.get('companies').id+" and schedules.secondary_user_id = "+ $.cookieStorage.get('SecondaryUser').id+" and schedules.user_id = "+id+";";
	
    var conditions = {
        'User': {
            'query':query
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
        data: postData

    }).done(function(result) {
		if(result!=""){
			 var objReturn = JSON.parse(JSON.stringify(result));

            var decodeObjReturn = Base64.decode(objReturn);

            var convertedReturn = (JSON.parse(decodeObjReturn));
			
			//var html = '<span style="color:white;text-align:center;width:100%;font-size:3.5vh;font-weight:800;">SERVIÇOS\t</span><img style="color:white;width: 13%;margin-top: -5%;" src="img/icons/servicos.png"></span><br><br>';
			var html = '<div class="col-md-6 time"><ul class="timeline" id="timeline"><span style="color: #2597AC;font-size: 3vh;font-family: \'Open Sans\';font-weight: bolder;">SERVIÇOS</span>';
			for(var i=0;i<convertedReturn.length;i++){
				var service = convertedReturn[i].schedules.subclasse_name;				
				var timebegin = convertedReturn[i].schedules.time_begin;
				var secondary_user = convertedReturn[i].secondary_users.name;
				var id = convertedReturn[i].schedules.id;
				var date = convertedReturn[i].schedules.date.split('-')[2]+"/"+convertedReturn[i].schedules.date.split('-')[1]+"/"+convertedReturn[i].schedules.date.split('-')[0];
				
				//html+='<div style="border: 1px solid white;border-radius: 10vh;background-color: white;margin-bottom:2%;"><span style="color:#2597AC;font-size: 2.7vh;">'+service+'</span>\t<span style="color:#2597AC;font-size: 2.3vh;" class="glyphicon glyphicon-camera"></span><br><span style="color:#2597AC;font-size: 2.3vh;">\t'+date+'</span></div>';
				html+='<li class="timeline adminchat"><div class="timeline-badge"><img class="timelineIcon" src="img/icons/Servicos.png"></i></div><div class="timeline-panel"><div class="timeline-heading"><small class="pull-right timeline-date">' +date+ ' - ' +timebegin+ '</small><br><span class="timeline-title">' +service+'</span></div><div class="timeline-body"><div class="form-group"><img class="pull-right icon"  onclick="Click('+id+');" src="img/icons/emrpesaSemLogo.png"></div></div></div></li>';
			}
			
			html +="</u></div>";
			
			$.alert({
				title: '',
				content: html,
				animation: 'zoom',
				closeAnimation: 'scale',
				animationBounce: 1,
				theme: 'material',	
				keyboardEnabled: false,
				confirmButton:false,
				//closeIcon:false,
				backgroundDismiss:true
       
            });
			
			
		}
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
function Click(servico) {
                var query = "SELECT*FROM schedules Schedules WHERE Schedules.id =" + servico;

                var conditions = {
                    'User': {
                        'query': query
                    }
                };
                var postData = JSON.stringify(conditions);

                postData = {
                    'params': postData
                };
                var url = 'https://' + api + '/users/get/query/' + createToken();

                $.ajax({
                    method: "POST",
                    url: url,
                    data: postData

                }).done(function (result) {
                    if (result != "") {
                        var objReturn = JSON.parse(JSON.stringify(result));
                        var decodeObjReturn = Base64.decode(objReturn);
                        var convertedReturn = (JSON.parse(decodeObjReturn));

                        $.cookieStorage.remove('Schedules');

                        $.cookieStorage.set(convertedReturn[0]);

                        if ($.cookieStorage.isSet('Schedules')) {
                            window.location.href = "service_galery_image.html";
                        } else {

                        }
                    } else {

                    }
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });


            }
function expand(id){
    if($("#"+id).hasClass('hide')){
		$(".accordion").addClass('hide');
		$(".buttonplus").attr('src', 'img/icons/mais.png');
        $("#"+id).removeClass('hide');
        $("#changesignal"+id).attr('src', 'img/icons/menos.png');
		
    }else{
        $("#"+id).addClass('hide');
        $("#changesignal"+id).attr('src', 'img/icons/mais.png');
    }
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