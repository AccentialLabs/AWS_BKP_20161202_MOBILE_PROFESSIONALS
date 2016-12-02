	var agendamentosMENSALtotal = '';
	var agendamentosMENSALpassado = '';
	
	$(function(){

	

		/**
		* PESQUISA SOLICITAÇÃOES DE AGENDAMENTOS FUTUROS - 
		* ALTERAR :  COMPANY ID & SECOND USER ID
		**/
		$("#searchSchedulesSolicitations").click(function(){
		 var query = "SELECT * FROM schedules_solicitation inner join secondary_users on secondary_users.id = schedules_solicitation.secundary_user_id WHERE schedules_solicitation.status LIKE 'WAITING_COMPANY_RESPONSE' and schedules_solicitation.company_id = 100028 and date >= CURDATE() and secondary_users.id = 111;";

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
				
				$("#recebeRetorno").html(Base64.decode(result));
			   
			}).error(function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			});
			
			});
			
			
			/**
			* PESQUISA ANIVERSÁRIANTES DO DIA 
			* ALTERAR: DIA & MES & COMPANY ID
			*/
			$("#searchBirthdays").click(function(){
			
			 var query = "select * from companies_users inner join users on users.id = companies_users.user_id WHERE  DAYOFMONTH(users.birthday) = 22 AND MONTH(users.birthday) = 8  AND companies_users.company_id = 100028 AND companies_users.status = 'ACTIVE';";
			 
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
				
				$("#recebeRetorno").html(Base64.decode(result));
			   
			}).error(function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			});
			
			});

			
			/**
			* USADO PARA LOGINI
			* PESQUISA USUÁRIO SECUNDARIO (PROFISSIONAL) POR EMAIL E SENHA 
			* ALTERAR: EMAIL & SENHA
			*/
			$("#searchLoginSecondaryUser").click(function(){
			 var query = "select * from secondary_users inner join companies on companies.id = secondary_users.company_id WHERE secondary_users.email LIKE 'mts@gmail.com' and secondary_users.password LIKE '82499b69d067887ce2d5b974d06b5ab1';";
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
				
				$("#recebeRetorno").html(Base64.decode(result));
			   
			}).error(function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			});
			
			});
			
			

			/**
			* PESQUISA TODOS OS AGENDAMENTOS SOLICITAOD PARA O MÊS PRESENTE
			* ALTERAR: ID DO SALÃO & SECONDARY USER ID & DIA & MÊS
			* 
			*/
			$("#searchSchedulesMensal").click(function(){
		var queryMENSAL = "SELECT (SELECT  count(*) FROM schedules_solicitation inner join secondary_users on secondary_users.id = schedules_solicitation.secundary_user_id WHERE  schedules_solicitation.company_id = 100028 and MONTH(schedules_solicitation.date_solicitation) = 8  and secondary_users.id = 111) AS total_mensal,(SELECT  count(*) FROM schedules_solicitation inner join secondary_users on secondary_users.id = schedules_solicitation.secundary_user_id WHERE  schedules_solicitation.company_id = 100028 and secondary_users.id = 111 and MONTH(schedules_solicitation.date_solicitation) = 8 AND DAYOFMONTH(schedules_solicitation.date_solicitation) = 22) AS total_passado,(SELECT  count(*) FROM schedules_solicitation inner join secondary_users on secondary_users.id = schedules_solicitation.secundary_user_id WHERE  schedules_solicitation.company_id = 100028 and secondary_users.id = 111 and MONTH(schedules_solicitation.date_solicitation) = 8 AND YEARWEEK(schedules_solicitation.date_solicitation)=YEARWEEK(NOW())) AS total_semanal;";

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
				
				 console.log(objReturn); 
				$("#recebeRetorno").html(objReturn);
			   
			}).error(function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			});
			
			});
			
			
			/**
			* Procura todos os clientes que já fizeram algum service com o profissional (seria o COMPANIES_USERS do usuário secundário)
			* ALTERAR: SECONDARY USER ID
			*/
		$("#searchMyClients").click(function(){
			var query = "select * from schedules inner join users on users.id = schedules.user_id where schedules.secondary_user_id = 111 GROUP BY users.id;";
			
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
				
				$("#recebeRetorno").html(Base64.decode(result));
			   
			}).error(function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			});
			
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


	function createToken() {
		var arraySend = {
			'secureNumbers': Math.floor(new Date().getTime() / 1000)
		};
		var json = JSON.stringify(arraySend);
		return Base64.encode(json);
	}