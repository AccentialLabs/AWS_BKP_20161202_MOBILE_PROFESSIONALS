var id='';
function deleteComment(id){
    $.confirm({
        title: 'Excluir Comentario?',
        content: false,
        animation: 'zoom',
        closeAnimation: 'scale',
        animationBounce: 1.5,
        theme: 'supervan',
        confirmButton: "Sim",
        cancelButton:"Não",
        keyboardEnabled: true,
        backgroundDismiss: true,
        confirm: function() {
            var conditionsInserirComentario = {
                'OffersComment': {
                    'id': id,
                    'status':"INACTIVE"
                }
            };

            var postDataInserirComentario = JSON.stringify(conditionsInserirComentario);

            postDataInserirComentario = {
                'params': postDataInserirComentario
            };

            var urlInserirComentario = 'https://'+api+'/offers/save/first/' + createToken();

            $.ajax({
                method: "POST",
                url: urlInserirComentario,
                data: postDataInserirComentario

            }).done(function (result) {
                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturn = JSON.parse(decodeObjReturn);
                console.log(convertedReturn);
                window.location.href="comments.html";
                //     document.getElementById("companyListNames6").src = "https://'+ip+'/jezzy-mobile-professionals/public_html/img/icons/0.png"

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
        },
        cancel: function(){

        }
    });




}
function VerificarSeFoiComprado(){
    var conditions = {
        'Checkout': {
            'conditions': {
                'Checkout.offer_id': id,
                'Checkout.user_id':$.cookieStorage.get('SecondaryUser').id
            }
        },
        'User':{}
    };
    console.log(conditions);
    var postData = JSON.stringify(conditions);
    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/payments/get/all/' + createToken();

    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if(result != ""){
            document.getElementById("formcomments").style.display = "block";
        }else{
            document.getElementById("formcomments").style.display = "none";
        }



    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}
$(document).ready(function() {


    if($.cookieStorage.get('paginaanterior') ==  "https://"+ip+"/jezzy-mobile-professionals/public_html/home.html"){
        id = $.cookieStorage.get('Offer').id;

    }else{
        id = $.cookieStorage.get('Offer').id;

    }
    VerificarSeFoiComprado();
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";
    sendRequest();

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
        'OffersComment': {
            'conditions': {
                'OffersComment.offer_id': id,
                'OffersComment.status':"ACTIVE"
            }
        },
        'User':{}
    };

    var postData = JSON.stringify(conditions);
    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/offers/get/all/' + createToken();


    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {



        if(result!="") {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = JSON.parse(decodeObjReturn);
            var HTML = "";

            for (var i = 0; i < convertedReturn.length; i++) {
                var Retorno = convertedReturn[i];
                idComment = Retorno.OffersComment.id;
                var nota = Retorno.OffersComment.evaluation;

                var notas = " ";
                switch(nota){
                    case "0": notas = icons+'0.png';
                        break;
                    case "1":notas = icons+"1.png";
                        break;
                    case "2":notas = icons+"2.png";
                        break;
                    case "3": notas =icons+"3.png";
                        break;
                    case "4":notas =icons+"4.png";
                        break;
                    case "5":  notas =icons+"5.png";
                        break;
                    default: notas =icons+"0.png";
                }
                if(Retorno.User.name != $.cookieStorage.get('SecondaryUser').name) {
                    HTML = "<div><img src='" + Retorno.User.photo + "' id = 'photoUser" + Retorno.OffersComment.id + "' class='photoUser'></div><span class='fontSizeClass tituloa name_user' id='name_user'>" + Retorno.User.name + "</span><div class='row numberOfStarsLine' id='commentstars3'><div class='col-xs-12 newAddressInfo marginTop10' id='commentstars2'><img src='"+notas+"' class='numberOfStars2' id='commentstars'/></div><div id='commentdescriptiontitle' class='commentdescriptiontitle'>"+Retorno.OffersComment.title + "</div><div id='commentdescription' class='commentdescription'>'"+Retorno.OffersComment.description + "'</div><div id='date' class='date'>"+Retorno.OffersComment.date_register + "</div><div class='bottomLine'></div></div>";
                }else if(Retorno.User.name == $.cookieStorage.get('SecondaryUser').name){
                    HTML = "<div><img src='" + Retorno.User.photo + "' id = 'photoUser" + Retorno.OffersComment.id + "' class='photoUser'></div><span class='fontSizeClass tituloa name_user' id='name_user'>" + Retorno.User.name + "</span><div class='row numberOfStarsLine' id='commentstars3'><div class='col-xs-12 newAddressInfo marginTop10' id='commentstars2'><img src='"+notas+"' class='numberOfStars2' id='commentstars'/><span id='"+Retorno.User.id+"' class='glyphicon glyphicon-remove' onclick='deleteComment("+Retorno.OffersComment.id+");'></span></div><div id='commentdescriptiontitle' class='commentdescriptiontitle'>"+Retorno.OffersComment.title + "</div><div id='commentdescription' class='commentdescription'>'"+Retorno.OffersComment.description + "'</div><div id='date' class='date'>"+Retorno.OffersComment.date_register + "</div><div class='bottomLine'></div></div>";
                }
                $("#comments").append(HTML);


            }

        }else{
            var Aviso = "<div class='commentdescriptiontitles'>Não há comentarios para esse produto!</div>";
            $("#comments").append(Aviso);
        }




    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

        var conditionsoffer = {
            'Offer': {
                'conditions': {
                    'Offer.id': id
                }
            }
        };


        var postDataoffer = JSON.stringify(conditionsoffer);

        postDataoffer = {
            'params': postDataoffer
        };

        var urloffer = 'https://'+api+'/offers/get/first/' + createToken();

        $.ajax({
            method: "POST",
            url: urloffer,
            data: postDataoffer
        }).done(function (result) {

            if(result!=""){
                var objReturnoffer = JSON.parse(JSON.stringify(result));
                var decodeObjReturnoffer = Base64.decode(objReturnoffer);
                var convertedReturnoffer = JSON.parse(decodeObjReturnoffer);

            }
            console.log(convertedReturnoffer);
            document.getElementById("companyListNames").innerHTML = convertedReturnoffer.Offer.title;





}).error(function (XMLHttpRequest, textStatus, errorThrown) {
    alert(errorThrown);
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
            + '<div class="modal-content" id="messageModelGoesHere">'
            + mensagem
            + '</div>'
            + '</div>'
            + '</div>';
        $("body").append($modalHtml);
    }
}


function umaestrela(){
    document.getElementById("companyListName1").src = "img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName2").src = "img/icons/Estrelinhas-02.png";
    document.getElementById("companyListName3").src = "img/icons/Estrelinhas-02.png";
    document.getElementById("companyListName4").src = "img/icons/Estrelinhas-02.png";
    document.getElementById("companyListName5").src = "img/icons/Estrelinhas-02.png";
    document.getElementById('companyListNames3').value = "NÃO GOSTEI";
}
function duasestrelas(){
    document.getElementById("companyListName1").src = "img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName2").src = "img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName3").src = "img/icons/Estrelinhas-02.png";
    document.getElementById("companyListName4").src = "img/icons/Estrelinhas-02.png";
    document.getElementById("companyListName5").src = "img/icons/Estrelinhas-02.png";
    document.getElementById('companyListNames3').value = "RAZOÁVEL";
}
function tresestrelas(){
    document.getElementById("companyListName1").src = "img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName2").src = "img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName3").src = "img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName4").src = "img/icons/Estrelinhas-02.png";
    document.getElementById("companyListName5").src = "img/icons/Estrelinhas-02.png";
    document.getElementById('companyListNames3').value = "BOM";
}
function quatroestrelas(){
    document.getElementById("companyListName1").src ="img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName2").src = "img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName3").src ="img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName4").src = "img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName5").src = "img/icons/Estrelinhas-02.png";
    document.getElementById('companyListNames3').value = "MUITO BOM";
}
function cincoestrelas(){
    document.getElementById("companyListName1").src ="img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName2").src = "img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName3").src = "img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName4").src = "img/icons/Estrelinhas-01.png";
    document.getElementById("companyListName5").src ="img/icons/Estrelinhas-01.png";
    document.getElementById('companyListNames3').value = "EXCELENTE";
}
/*
var countClick = 0;
function mudar() {

    countClick++;

    if(countClick==1) {
        document.getElementById("companyListNames6").src = "img/icons/0.5.png";
        document.getElementById('companyListNames3').value = "0.5"
    } else if(countClick==2){
        document.getElementById("companyListNames6").src = "img/icons/1.png";
        document.getElementById('companyListNames3').value = "1"
    }else if(countClick==3){
        document.getElementById("companyListNames6").src = "img/icons/1.5.png";
        document.getElementById('companyListNames3').value = "1.5"
    } else if(countClick==4){
        document.getElementById("companyListNames6").src = "img/icons/2.png";
        document.getElementById('companyListNames3').value = "2"
    }else if(countClick==5){
        document.getElementById("companyListNames6").src = "img/icons/2.5.png";
        document.getElementById('companyListNames3').value = "2.5"
    }else if(countClick==6){
        document.getElementById("companyListNames6").src = "img/icons/3.png";
        document.getElementById('companyListNames3').value = "3"
    }else if(countClick==7){
        document.getElementById("companyListNames6").src = "img/icons/3.5.png";
        document.getElementById('companyListNames3').value = "3.5"
    }else if(countClick==8){
        document.getElementById("companyListNames6").src = "img/icons/4.png";
        document.getElementById('companyListNames3').value = "4"
    }else if(countClick==9){
        document.getElementById("companyListNames6").src = "img/icons/4.5.png";
        document.getElementById('companyListNames3').value = "4.5"
    }else if(countClick==10){
        document.getElementById("companyListNames6").src = "img/icons/5.png";
        document.getElementById('companyListNames3').value = "5"
    }

    else if(countClick==11){
        countClick=0;
        document.getElementById("companyListNames6").src = "img/icons/0.png";
        document.getElementById('companyListNames3').value = "0"
    }

}
*/

function InserirComentario(){
    if(document.getElementById('companyListNames4').value != ""){


    var evaluation = 0;
    var hoje = (moment().format("YYYY-MM-D"));

    if (document.getElementById("companyListName1").src ==  icons+"Estrelinhas-01.png" && document.getElementById("companyListName2").src ==  icons+"Estrelinhas-02.png") {
        evaluation = 1;

    }else if(document.getElementById("companyListName2").src ==  icons+"Estrelinhas-01.png" && document.getElementById("companyListName1").src ==  icons+"Estrelinhas-01.png" && document.getElementById("companyListName3").src ==  icons+"Estrelinhas-02.png"){
       evaluation = 2;

    }else if(document.getElementById("companyListName3").src ==  icons+"Estrelinhas-01.png" && document.getElementById("companyListName2").src ==  icons+"Estrelinhas-01.png" && document.getElementById("companyListName4").src ==  icons+"Estrelinhas-02.png"){
        evaluation = 3;


    }else if(document.getElementById("companyListName4").src ==  icons+"Estrelinhas-01.png" && document.getElementById("companyListName3").src ==  icons+"Estrelinhas-01.png" && document.getElementById("companyListName5").src ==  icons+"Estrelinhas-02.png"){
        evaluation = 4;

    }else if(document.getElementById("companyListName5").src ==  icons+"Estrelinhas-01.png" && document.getElementById("companyListName4").src ==  icons+"Estrelinhas-01.png" ){
        evaluation = 5;
    }

        console.log(document.getElementById("companyListName1").src);
        console.log(document.getElementById("companyListName2").src);
        console.log(document.getElementById("companyListName3").src);
        console.log(document.getElementById("companyListName4").src);
        console.log(document.getElementById("companyListName5").src);
    var conditionsInserirComentario = {

        'OffersComment': {

                    'offer_id': id,
                    'title': document.getElementById('companyListNames3').value,
                    'description': document.getElementById('companyListNames4').value,
                    'user_id': $.cookieStorage.get('SecondaryUser').id,
                    'date_register':hoje,
                    'status': "ACTIVE",
                    'evaluation': evaluation

        }
    };

    var postDataInserirComentario = JSON.stringify(conditionsInserirComentario);

    postDataInserirComentario = {
        'params': postDataInserirComentario
    };

    var urlInserirComentario = 'https://'+api+'/offers/save/all/' + createToken();

    $.ajax({
        method: "POST",
        url: urlInserirComentario,
        data: postDataInserirComentario

    }).done(function (result) {
        var objReturn = JSON.parse(JSON.stringify(result));
        var decodeObjReturn = Base64.decode(objReturn);
        var convertedReturn = JSON.parse(decodeObjReturn);
        console.log(convertedReturn);
        window.location.href="comments.html";
        generateModalAlert("Comentário Inserido!");
        $('#mymodal').modal('show');
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
    } else{
        generateModalAlert("Insira Comentário!");
        $('#mymodal').modal('show');

    }
}
