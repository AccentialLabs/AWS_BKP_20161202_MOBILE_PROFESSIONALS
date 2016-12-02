var iddoservico = ' ';

$(document).ready(function () {
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";
    
    iddoservico = $.cookieStorage.get('Schedules').id;
    SendRequest();

    /*
     $("#imagemnova1").change(function () {
     console.log($("#imagemnova1"));
     var file = document.getElementById("imagemnova1");
     readURL(this, '0');


     });*/


    //  if(document.getElementById("1").src == 'https://'+ip+'/jezzy-mobile/public_html/img/icons/Mais-03.png'){


    //  }
    //  else{
    //      $("#imagemnova02").click();
    //   }


    /*
     $("#1").click(function(){
     //  if(document.getElementById("1").src == 'https://'+ip+'/jezzy-mobile/public_html/img/icons/Mais-03.png'){
     $("#imagemnova2").click();
     //  }
     //  else{
     //      $("#imagemnova02").click();
     //   }

     });
     $("#2").click(function(){
     $("#imagemnova3").click();

     });
     $("#3").click(function(){
     $("#imagemnova4").click();

     });*/

});

function carregar1(){
    document.getElementById('inputnumeroimagem1').value ="1-" + $.cookieStorage.get('Schedules').id;
    $("#fileformimagemnova1").submit();
}
function carregar2(){
    document.getElementById('inputnumeroimagem2').value ="2-" + $.cookieStorage.get('Schedules').id;
    $("#fileformimagemnova2").submit();
}
function carregar3(){
    document.getElementById('inputnumeroimagem3').value ="3-" +$.cookieStorage.get('Schedules').id;
    $("#fileformimagemnova3").submit();
}
function carregar4(){
    document.getElementById('inputnumeroimagem4').value = "4-" +  $.cookieStorage.get('Schedules').id ;
    $("#fileformimagemnova4").submit();
}
function img1clickremove(filename){



    var url = 'https://'+ip+'/jezzy-mobile/public_html/php/RemovePhoto.php';

    $.ajax({
        method: "POST",
        url: url,
        data:  {
            'filename':   filename
        }

    }).done(function(result) {
        window.location.href = 'service_galery_image.html';
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}


function img1click(number){

    $("#imagemnova"+number).click();
}


function voltar(){
    var x = document.referrer;
    window.location.href = 'secondary_users_clients.html';
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

function SendRequest(){
    var query = "SELECT*FROM services_photos INNER JOIN schedules ON services_photos.schedule_id WHERE schedules.id =" +  iddoservico + " and services_photos.schedule_id = " +  iddoservico + " and services_photos.status = 'ACTIVE' GROUP BY services_photos.id ORDER BY services_photos.idphoto;";

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
            var html = "<span class='col-xs-12 tablecontent'>SEM FOTOS PARA O SERVIÇO SELECIONADO</span>";
            $("#images").append(html);

            $("#0").click(function(){

                img1click(1);

            });
            $("#1").click(function(){

                img1click(2);

            });
            $("#2").click(function(){

                img1click(3);

            });
            $("#3").click(function(){

                img1click(4);

            });

        }else{

            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));

            for(var i=0;i<convertedReturn.length;i++){
                if(i>3){

                }else{

                    var phota = "'"+convertedReturn[i].services_photos.photo+"'";

                    $("#"+(convertedReturn[i].services_photos.idphoto-1)).attr('src','');
                    $("#"+(convertedReturn[i].services_photos.idphoto-1)).attr('src', convertedReturn[i].services_photos.photo + "?" + createToken());
                    $("#"+(convertedReturn[i].services_photos.idphoto-1)).addClass('fotinho');






                }

            }
            if(convertedReturn.length<4){
                var t = '';
                for(var g =0;g<4;g++){
                    if(convertedReturn[g]!=undefined){
                        t+=convertedReturn[g].services_photos.idphoto+",";
                        //  $("#"+convertedReturn[g].services_photos.idphoto).addClass('fotinhoclick');
                    }
                }
                t= t.split('');


                if(t.indexOf('1')==-1){
                    $("#0").addClass('fotinhoclick');
                }else if(t.indexOf('2')==-1){
                    $("#1").addClass('fotinhoclick');
                }else if(t.indexOf('3')==-1){
                    $("#2").addClass('fotinhoclick');
                }else if(t.indexOf('4')==-1){
                    $("#3").addClass('fotinhoclick');
                }
            }






            $(".fotinhoclick").click(function() {
                var number = $(this)[0].id;
                number = (number/1)+1;
                var oi = $("#imagemnova" + number).click();

            });
            $(".fotinho").click(function(){
                var photo = $(this).attr('src');
                var photo2 = "'"+$(this).attr('src')+"'";
                var number = $(this)[0].id;
                number = (number/1)+1;

                $.dialog({
                    title: '',
                    content: '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><img class="imagem" id="imgrotate" src=\"'+photo+'\"></br></br><btn class="btn k" id="img1" onclick="img1click('+number+');">TROCAR FOTO</btn></br></br><btn class="btn k" onclick="img1clickremove('+photo2+')" id="img1remove">REMOVER FOTO</btn>',
                    animation: 'zoom',
                    closeIcon:false,
                    closeAnimation: 'scale',
                    animationBounce: 1.5,
                    backgroundDismiss:true,
                    theme: 'supervan',
                    keyboardEnabled: true

                });



            });



        }

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
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
