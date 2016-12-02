/**
 * Created by Ariany on 15/03/2016.
 */
$(document).ready(function() {

    sendRequest();

    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {


                $('.profile-pic').attr('src', e.target.result);

            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    $(".file-upload").on('change', function(){
        readURL(this);
    });

    $(".upload-button").on('click', function() {
        $(".file-upload").click();
    });


    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";


});
function meuLog(msg) {
    span = document.body;
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

function sendRequest() {

    var conditions = {
        'User': {
            'query': 'SELECT * FROM secondary_users SecondaryUser WHERE excluded = 0 and id = ' + $.cookieStorage.get('SecondaryUser').id
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
    }).done(function (result) {


        if (result != "") {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = JSON.parse(decodeObjReturn);

        }

          }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}


function VerificaSenhaClick(){
    var password = (document.getElementById('senhainput').value).trim();
    var confirmpassword = (document.getElementById('repeatsenha').value).trim();
    if(password != confirmpassword){
        generateModalAlert("Senhas não Coincidem");
        $('#mymodal').modal('show');
        return false;
    }
}

function verificaSenha(){

        var password = (document.getElementById("senhainput").value).trim();
        var confirmpassword = (document.getElementById("repeatsenha").value).trim();
        if(password != confirmpassword){
            document.getElementById("SenhaError").style.display = "block";
        } else if(password == confirmpassword){
            document.getElementById("SenhaError").style.display = "none";
        }

}


function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}



function EditUserPassword(){
    var oldpassword = $.cookieStorage.get('SecondaryUser').password;
    var senhaoldinput2 = document.getElementById('senhaoldinput').value;
    var senhaoldinput = md5(senhaoldinput2).toString();
    if(oldpassword == senhaoldinput && oldpassword != ""){
    if(document.getElementById('senhainput').value == "" || document.getElementById('repeatsenha').value==""){
        generateModalAlert("Digite a senha nos dois campos");
        $('#mymodal').modal('show');
        return false;
    } else {
        var conditionsEditUser = {
            'User': {
                    'query':  'UPDATE secondary_users SET password = "' + md5($("#senhainput").val()).toString() +'" WHERE excluded = 0 and id = ' + $.cookieStorage.get('SecondaryUser').id

            }
        };
        console.log(conditionsEditUser);
        var postDataCreateUser = JSON.stringify(conditionsEditUser);


        postDataCreateUser = {
            'params': postDataCreateUser
        };


        var urlCreateUser = 'https://'+api+'/users/get/query/' + createToken();

        $.ajax({
            method: "POST",
            url: urlCreateUser,
            data: postDataCreateUser,
            async: false
        }).done(function (result) {

            var conditions = {
                'User': {
                    'query':'SELECT * FROM secondary_users SecondaryUser WHERE excluded = 0 and id ='+ $.cookieStorage.get('SecondaryUser').id

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
            }).done(function (result) {

                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturn = JSON.parse(decodeObjReturn);

                $.cookieStorage.remove('SecondaryUser');
                $.cookieStorage.set(convertedReturn[0]);
                window.location.href = "my_profile.html";
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);

            });

            generateModalAlert("Senha atualizada!");
            $('#mymodal').modal('show');


        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });


    }

    }else{
        generateModalAlert("Digite a Senha Antiga Corretamente!");
        $('#mymodal').modal('show');
        return false;
    }

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
