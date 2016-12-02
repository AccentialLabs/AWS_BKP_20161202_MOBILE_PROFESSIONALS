var limitarcaracteres = 32;
var Ofertas = new Array;
var OfertasPerfil = new Array;
var cont2 = 8;
var coont2 = 8;
var cont3Perfil = 6;
var coont3Perfil = 6;
var visualizacao = 1;
var tam = 0;
var tam2 = 0;
var Filtros = new Array;

var ajax_offers_services = '';
var ajax_click_offer_statistics = '';
var ajax_select_offers_public = '';
var ajax_select_offers_perfil = '';
var ajax_offers_filters = '';
var ajax_offers_categories = '';
var ajax_offers_subcategories = '';
var ajax_offers_show_find = '';
var typeFilter = '';

/*function clickOffer(offer){

    var query = 'SELECT * FROM offers_statistics WHERE offer_id = ' + offer;

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


    ajax_click_offer_statistics = $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function(result) {
        if(result != "ImE6MDp7fSI=") {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
            for(var i=0; i<convertedReturn.length;i++){


                var cliques = (convertedReturn[i].offers_statistics.details_click)/1 + 1;

                var query2 = 'UPDATE offers_statistics SET details_click = '+cliques+' WHERE offer_id = ' + offer;

                var conditions2 = {
                    'General':{
                        'query':query2
                    }
                };

                var postData2 = JSON.stringify(conditions2);

                postData2 = {
                    'params': postData2
                };
                var url2 = 'https://'+api+'/General/get/query/' + createToken();


                $.ajax({
                    method: "POST",
                    url: url2,
                    data: postData2
                }).done(function(result) {
                    if(result == "ImE6MDp7fSI=") {
                        var query2 = 'SELECT title, id, company_id FROM offers Offer WHERE id = ' + offer;

                        var conditions2 = {
                            'General':{
                                'query':query2
                            }
                        };

                        var postData2 = JSON.stringify(conditions2);

                        postData2 = {
                            'params': postData2
                        };
                        var url2 = 'https://'+api+'/General/get/query/' + createToken();


                        $.ajax({
                            method: "POST",
                            url: url2,
                            data: postData2
                        }).done(function(result) {
                            if(result != "ImE6MDp7fSI=") {
                                var objReturn = JSON.parse(JSON.stringify(result));
                                var decodeObjReturn = Base64.decode(objReturn);
                                var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
                                for(var i=0; i<convertedReturn.length;i++) {
                                    var oferta = convertedReturn[i];

                                    $.cookieStorage.remove('Offer');
                                    console.log(oferta);
                                    $.cookieStorage.set(oferta);

                                    if ($.cookieStorage.isSet('Offer')) {
                                        window.location.href = "offer_product_detail.html";
                                    } else {
                                        generateModalAlert("Erro ao salvar Cookie");
                                        $('#mymodal').modal('show');
                                    }
                                }

                            }

                        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        });

                    }

                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });
            }
        }else{
            var query2 = 'INSERT INTO offers_statistics (details_click, offer_id) VALUES (1, '+offer+')';

            var conditions2 = {
                'General':{
                    'query':query2
                }
            };

            var postData2 = JSON.stringify(conditions2);

            postData2 = {
                'params': postData2
            };
            var url2 = 'https://'+api+'/General/get/query/' + createToken();


            $.ajax({
                method: "POST",
                url: url2,
                data: postData2
            }).done(function(result) {
                if(result == "ImE6MDp7fSI=") {
                    var query2 = 'SELECT title, id, company_id FROM offers Offer WHERE id = ' + offer;

                    var conditions2 = {
                        'General':{
                            'query':query2
                        }
                    };

                    var postData2 = JSON.stringify(conditions2);

                    postData2 = {
                        'params': postData2
                    };
                    var url2 = 'https://'+api+'/General/get/query/' + createToken();


                    $.ajax({
                        method: "POST",
                        url: url2,
                        data: postData2
                    }).done(function(result) {
                        if(result != "ImE6MDp7fSI=") {
                            var objReturn = JSON.parse(JSON.stringify(result));
                            var decodeObjReturn = Base64.decode(objReturn);
                            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
                            for(var i=0; i<convertedReturn.length;i++) {
                                var oferta = convertedReturn[i];

                                $.cookieStorage.remove('Offer');
                                console.log(oferta);
                                $.cookieStorage.set(oferta);

                                if ($.cookieStorage.isSet('Offer')) {
                                    window.location.href = "offer_product_detail.html";
                                } else {
                                    generateModalAlert("Erro ao salvar Cookie");
                                    $('#mymodal').modal('show');
                                }
                            }

                        }

                    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });



                }
            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
        }

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });



}*/

var Ofertas = '';
var ckoDiv = '';
$(document).ready(function() {

	/**
	* Carrega ofertas na memória para serem concatenadas 
	* à lista automáticamente logo após a primeira rolagem
	* Matheus Odilon - 10/08/2016

	PesquisarOfertas();
	//
	*/



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

    sendRequest();
    $("#userName").click(function (){
        window.location.href = 'my_profile.html';
    });
    [].forEach.call( document.querySelectorAll('.hide-radio'), function(element) {
        element.style.display = 'none';
    });
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";

    $(window).on("scroll", function() {
	
        var scrollHeight = $(document).height();

        var scrollPosition = $(window).height() + $(window).scrollTop();
        scrollPosition = scrollPosition;

        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            if($("#normals")[0].checked == true){
			
               	//sendRequest();
                //PesquisarOfertas();
				
			}

        }
    });




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

/*
function PesquisarOfertas(){



    var query = '';
    var queryPerfil = '';
        query = 'SELECT DISTINCT Offer.id, Offer.title, Offer.photo, Offer.percentage_discount, Offer.value, Offer.parcels, Offer.parcels_quantity FROM offers_users RIGHT OUTER JOIN offers Offer ON Offer.id = offers_users.offer_id WHERE offers_users.user_id = ' + $.cookieStorage.get('SecondaryUser').id + ' and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.company_id != 99999 and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.status = "ACTIVE" and Offer.public ="ACTIVE" or  Offer.company_id = 99999 and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.status = "ACTIVE" and Offer.public ="ACTIVE" ORDER BY Offer.id DESC LIMIT '+(cont2+1)+','+(coont2)+';';

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
		
		

    ajax_select_offers_public = $.ajax({
            method: "POST",
            url: url,
            data: postData
        }).done(function (result) {
            if (result != '') {
                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturne = (JSON.parse(decodeObjReturn));
                var tamanho = Ofertas.length + convertedReturne.length;
                var tamanhoVetorOffers = Ofertas.length;
                tam2 = Ofertas.length;
                for (var i = Ofertas.length; i < tamanho; i++) {
                    Ofertas[i] = convertedReturne[i - tamanhoVetorOffers];
                }

                    cont2  = cont2 + 8;



            }

        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });


    queryPerfil = 'SELECT DISTINCT Offer.id, Offer.title, Offer.photo, Offer.percentage_discount, Offer.value, Offer.parcels_quantity FROM offers_users INNER JOIN offers Offer ON Offer.id = offers_users.offer_id RIGHT OUTER JOIN offers_filters ON offers_filters.offer_id = Offer.id WHERE  offers_users.user_id = ' + $.cookieStorage.get('SecondaryUser').id +'  and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.status = "ACTIVE" and Offer.public ="INACTIVE" and offers_filters.gender = "'+ gender+'" and offers_filters.religion = '+ religion+' and offers_filters.political = '+ political+' and offers_filters.location = '+locationss+' and offers_filters.relationship_status = '+ relationship_status+' and Offer.company_id !=99999 or offers_users.user_id = ' + $.cookieStorage.get('SecondaryUser').id +' and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.status = "ACTIVE" and Offer.public ="INACTIVE" and offers_filters.gender = "'+ gender+'" and offers_filters.religion = '+ religion+' and offers_filters.political = '+ political+' and offers_filters.location = '+locationss+' and offers_filters.relationship_status = '+ relationship_status+' and Offer.company_id = 99999  ORDER BY Offer.id DESC LIMIT ' +(cont3Perfil+1)+ ',' +coont3Perfil+';';




    var conditionsPerfil = {
        'User': {
            'query': queryPerfil
        }
    };

    var postDataPerfil = JSON.stringify(conditionsPerfil);

    postDataPerfil = {
        'params': postDataPerfil
    };
    var urlPerfil = 'https://' + api + '/users/get/query/' + createToken();

    ajax_select_offers_perfil = $.ajax({
        method: "POST",
        url: urlPerfil,
        data: postDataPerfil
    }).done(function (result) {
        if (result != '') {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = (JSON.parse(decodeObjReturn));
            var tamanho = OfertasPerfil.length + convertedReturne.length;
            var tamanhoVetorOffers = OfertasPerfil.length;
            tam3 = OfertasPerfil.length;
            console.log(OfertasPerfil);
            for (var i = OfertasPerfil.length; i < tamanho; i++) {
                console.log(OfertasPerfil[i]);
                OfertasPerfil[i] = convertedReturne[i - tamanhoVetorOffers];
            }

            cont3Perfil  = cont3Perfil + 6;

        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

	

}
var contador = 0;
var filtrinhos = new Array;
function Filter(select, filter){
    var cookie = '';
    if($.cookieStorage.isSet('OfferFilters')){
        cookie = $.cookieStorage.get('OfferFilters');
    }
    var filtro = select.value;
    var filtromestre = filter;

    filtrinhos[contador] = {'Filtro': filtro, 'FiltroMestre': filtromestre};

    contador++;

    Filtros = JSON.stringify(filtrinhos);

    $.cookieStorage.set('OfferFilters', filtrinhos);

    if($("#"+filtromestre).length){
       $("#"+filtromestre).html('<button type="button" class="close" data-dismiss="alert" id="fechar" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+filtro);
        $("#filtros").val('1');
        $("#Filtro2").val('1');
        $("#botao").remove();
        $("#offerDisplay").append('<button id="botao" class="btn btn-info btn-block">Pesquisar</button>');
    }else{
        $("#offerDisplay").append('<div id="offerfilter"><div id="'+filtromestre+'" class="alert alert-info alert-dismissible fade in" role="alert"><button type="button" id="fechar" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+filtro+'</div></div>');
        $("#filtros").val('1');
        $("#Filtro2").val('1');
        $("#botao").remove();
        $("#offerDisplay").append('<button id="botao" class="btn btn-info btn-block">Pesquisar</button>');
    }

   //
    var query = '';
    query = 'SELECT DISTINCT '+filtro+' filter FROM offers_filters WHERE '+filtro+' != "";';
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
        if (result != '') {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = (JSON.parse(decodeObjReturn));




        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
//
}
function Filtrar(select){
    var filtro = select.value;
    $("#Filtro2").remove();

    var query = '';
    query = 'SELECT DISTINCT '+filtro+' filter FROM offers_filters WHERE '+filtro+' != "";';
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

    ajax_offers_filters = $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if (result != '') {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = (JSON.parse(decodeObjReturn));
            if($("#offerfilter").length){
                $("#offerfilter").before('<select onchange="Filter(this,\''+filtro+'\');" class="form-control" id="Filtro2"><option value="1" selected disabled>Selecione uma opção</option></select>');
            }else{
                $("#offerDisplay").append('<select onchange="Filter(this,\''+filtro+'\');" class="form-control" id="Filtro2"><option value="1" selected disabled>Selecione uma opção</option></select>');
            }
            for(var i=0;i<convertedReturne.length;i++){
                $("#Filtro2").append('<option value='+convertedReturne[i].offers_filters.filter+'>'+convertedReturne[i].offers_filters.filter+'</option>');

            }

        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });




}

*/

function sendRequest() {
    var date  = new Date();
    var month = ((date.getMonth())/1)+1;
    var query = "select * from schedules inner join users on users.id = schedules.user_id  where schedules.secondary_user_id = "+ $.cookieStorage.get('SecondaryUser').id+"  and MONTH(users.birthday) = "+month+" GROUP BY users.id ORDER by DAYOFMONTH(users.birthday) ASC;";
    
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
        var objReturn = unserialize(JSON.parse(Base64.decode(result)));

        var html = '';
        for(var i=0; i<objReturn.length;i++){
            var nome = objReturn[i].users.name;
            var aniversario = objReturn[i].users.birthday;
            aniversario = new moment(aniversario);
			var idadess = idade(aniversario.years(), aniversario.months(), aniversario.dates());
			aniversario = aniversario.format('D/MM');
            if(nome.indexOf(' ')!=-1){
                nome = (nome.split(' ')[0])+" "+(nome.split(' ')[1]);
            }
			var foto="";
			
            if(objReturn[i].users.photo != ''){
				
               foto = objReturn[i].users.photo;
				
            }else{
				
				foto = "https://secure.jezzy.com.br/jezzy-mobile/public_html/img/icons/Foto%20do%20usuario%20-%2001.png";
                
            }
			
			var stats = "enable";
			var txt = "ENVIAR OS PARABÉNS";
			var query = "select * from log_emails_enviados_aniversariantes where user_id = "+objReturn[i].users.id+" and secondary_user_id = "+$.cookieStorage.get('SecondaryUser').id+" and YEAR(data_envio)=YEAR(NOW());";
			
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
					stats = "disabled";
					txt = "ENVIADO"+"<i class='fa fa-check'></i>"
				}
			}).error(function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			});
			var hoje = "Hoje!";
			var query = "select * from schedules inner join users on users.id = schedules.user_id  where schedules.secondary_user_id = "+ $.cookieStorage.get('SecondaryUser').id+" AND user_id = "+objReturn[i].users.id+"  and MONTH(users.birthday) = "+month+" and DAYOFMONTH(users.birthday) != DAYOFMONTH(NOW())";
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
					stats = "disabled";
					hoje = "";					
				}
			}).error(function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			});
			
			
				html += '<div style="border-top: 1px solid #d3d3d3;font-family:\'Open Sans\';font-size: 2.5vh;color:#A9A055;margin-top:2%;background-color: #2597ac;" class="col-xs-12"><div class="col-xs-3"><img class="fotousuario profile-pic" src = '+foto+'></div><div class="col-xs-9" style="margin-top:4%;"><span style="padding:2%;text-align: center;font-weight: bold;color: white;">'+nome+' <font style="font-style: italic;font-weight:100;">'+hoje+'</font></span><img style="width: 10%;float: right;" id="changesignal'+objReturn[i].users.id+'" onclick="expand('+objReturn[i].users.id+')" class="buttonplus" src="img/icons/mais.png"></div></div><table class="col-xs-12 accordion hide" id="'+objReturn[i].users.id+'" style="width: 80%;margin-left: 10%!important;color:#2597AC;text-align: center;font-family:\'Open Sans\'!important;padding-bottom: 2%;margin-top: 5%;"><tr><td class="col-xs-6"><img style="width: 18%;margin-top: -5%;" src="img/icons/aniversariantes2.png">'+aniversario+'</td><td class="col-xs-6">'+idadess+' anos</td></tr><tr><td colspan="2"><button class="btn" style="margin-top: 5%;width: 100%;background-color: #2597AC;color: white;font-family: \'Open Sans\';font-size: 2.2vh;" id="congrats'+objReturn[i].users.id+'" '+stats+' onclick="enviarparabens(\''+objReturn[i].users.id+'\',\''+objReturn[i].users.email+'\',\''+nome.split(" ")[0]+'\',\''+idadess+'\',\''+aniversario+'\')">'+txt+'</button></td></tr></table>';
				
				
        }

            $("#offerDisplay").html(html);
        }else{
            $("#offerDisplay").html('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Sem aniversariantes esse mês</div>');

        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });


}
function voltar(){

        window.history.go(-1);

}
function enviarparabens(id, email, nome, idade, datanascimento){
	var date  = new Date();
	var dataaniversario = date.getFullYear()+"-"+((date.getMonth()/1)+1)+"-"+date.getDate();
	$("#congrats"+id).html("ENVIANDO"+"<i class='fa fa-spinner fa-pulse fa-1x fa-fw'></i>");
	$("#congrats"+id).attr("disabled","disabled");
	
			var query = "INSERT INTO log_emails_enviados_aniversariantes (user_id, secondary_user_id, data_envio) VALUES ("+id+", "+$.cookieStorage.get('SecondaryUser').id+", '"+dataaniversario+"')";
				
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
				if(result == 'ImE6MDp7fSI='){
					
					envianotificacaoparabens(id,dataaniversario); //envia os parabens via notificação
					
					
				}
			}).error(function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			});
	
}

function envianotificacaoparabens(user_id, dataaniversario){
		
			var query ='INSERT INTO notifications_company VALUES("FELIZ ANIVERSARIO", "'+dataaniversario+'", '+$.cookieStorage.get("companies").id+', 0, 0, '+user_id+', 0, "", 1, "'+dataaniversario+'", 1, '+$.cookieStorage.get("SecondaryUser").id+', 0);';
		
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
				
				if(result == 'ImE6MDp7fSI='){
					 $.ajax({
                        method: "POST",
                         url: 'https://secure.jezzy.com.br/jezzy-portal/company/sendMobileNotification/'+user_id+'/Feliz%20Aniversario!'
                      }).done(function(){
                         $("#congrats"+user_id).html("ENVIADO"+"<i class='fa fa-check'></i>");//após enviar o email e salvar no banco de dados, mudar botão para botão de concluido
                      });
				}
			}).error(function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			});
}


function idade(ano_aniversario, mes_aniversario, dia_aniversario) {
    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),

        ano_aniversario = +ano_aniversario,
        mes_aniversario = +mes_aniversario,
        dia_aniversario = +dia_aniversario,

        quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
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