var id='';
var nome = '';
$(document).ready(function() {
    $("#offerImage").attr('src', 'https://'+ip+'/uploads/loading/14017858_10210089587742018_1484715137_n.gif');

    $.cookieStorage.set('usuario', 'sim');
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";

    if(document.referrer == "https://"+ip+"/jezzy-mobile-professionals/public_html/home.html"){
        id = $.cookieStorage.get('Offer').id;
        nome = $.cookieStorage.get('Offer').title;
    }else{
        id = $.cookieStorage.get('Offer').id;

        nome = $.cookieStorage.get('Offer').title;
    }



    sendRequest();
    $('#footerCommentsIconClick').click(function () {
        var paginaanterior = document.referrer;
        $.cookieStorage.set('paginaanterior',paginaanterior);

        if ($.cookieStorage.isSet('paginaanterior')) {
            window.location.href = "../../jezzy-mobile-professionals/public_html/comments.html";
        } else {
            generateModalAlert("Erro ao salvar Cookie");
            $('#mymodal').modal('show');
        }

    });
    $("#buyButton").click(function(){
        var querytype = 'SELECT * FROM offers_extra_infos Offer_extra WHERE offer_id = ' + id;


        var conditionstype = {
            'General':{
                'query':querytype
            }
        };

        var postDatatype = JSON.stringify(conditionstype);

        postDatatype = {
            'params': postDatatype
        };
        var urltype = 'https://'+api+'/General/get/query/' + createToken();


        $.ajax({
            method: "POST",
            url: urltype,
            data: postDatatype
        }).done(function(result) {
            if(result != "ImE6MDp7fSI=") {
                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturn = unserialize(JSON.parse(decodeObjReturn));

                for (var i = 0; i < convertedReturn.length; i++) {
                    var tipo = convertedReturn[i].Offer_extra.offer_type;

                    var query = 'SELECT * FROM offers_statistics WHERE offer_id = ' + id;

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
            data: postData
        }).done(function(result) {
            if(result != "ImE6MDp7fSI=") {
                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
                for(var i=0; i<convertedReturn.length;i++){


                    var cliques = (convertedReturn[i].offers_statistics.checkouts_click)/1 + 1;

                    var query2 = 'UPDATE offers_statistics SET checkouts_click = '+cliques+' WHERE offer_id = ' + id;

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


                            var paginaanterior = document.referrer;
                            $.cookieStorage.set('paginaanterior',paginaanterior);

                            if ($.cookieStorage.isSet('paginaanterior')) {
                                if(tipo == 'PRODUCT' && $.cookieStorage.get('Offer').company_id == 99999){
                                    window.location.href = "../../jezzy-mobile-professionals/public_html/offer_product_checkout.html";
                                }else if(tipo == 'SERVICE'){
                                    window.location.href = "../../jezzy-mobile-professionals/public_html/offer_service_checkout.html";
                                }else if(tipo == 'PRODUCT' && $.cookieStorage.get('Offer').company_id != 99999){
                                    window.location.href = "../../jezzy-mobile-professionals/public_html/offer_product_checkout_company.html";
                                }


                            } else {
                                generateModalAlert("Erro ao salvar Cookie");
                                $('#mymodal').modal('show');
                            }
                        }

                    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });
                }
            }else{
                var query2 = 'INSERT INTO offers_statistics (checkouts_click, offer_id) VALUES (1, '+id+')';
                console.log(query2);
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


                        var paginaanterior = document.referrer;
                        $.cookieStorage.set('paginaanterior',paginaanterior);

                        if ($.cookieStorage.isSet('paginaanterior')) {

                            if(tipo == 'PRODUCT'){
                                window.location.href = "../../jezzy-mobile-professionals/public_html/offer_product_checkout.html";
                            }else{
                                window.location.href = "../../jezzy-mobile-professionals/public_html/offer_service_checkout.html";
                            }

                        } else {
                            generateModalAlert("Erro ao salvar Cookie");
                            $('#mymodal').modal('show');
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
            }
        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });



    });


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
        'Offer': {
            'conditions': {
                'Offer.id': id
            }
        }
    };


    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/offers/get/first/' + createToken();


    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {


        if(result!=""){


        var objReturn = JSON.parse(JSON.stringify(result));
        var decodeObjReturn = Base64.decode(objReturn);
        var convertedReturn = JSON.parse(decodeObjReturn);
            $.cookieStorage.set(convertedReturn);
            if(convertedReturn.Offer.photo == ""){
                $("#first").addClass("hide");
                $("#left").html("");
                $("#right").html("");
                $("#left").addClass("hide");
                $("#right").addClass("hide");
                $("#offerimages").append( '<div class="item active"><img src=\"'+icons+'ImagemIndisponivel2.png\" class="offerPhoto" id="offerPhoto"/></div>')
            }else{


                var conditions = {
                    'General': {
                        'query': 'SELECT * FROM offers_photos WHERE offer_id = ' + id
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

                    if(result!="ImE6MDp7fSI="){
                        var objReturnss = JSON.parse(JSON.stringify(result));
                        var decodeObjReturnss = Base64.decode(objReturnss);
                        var convertedReturnss = unserialize(JSON.parse(decodeObjReturnss));


                        $("#offerimages").html("");
                        $("#indicadores").html("");
                        $("#offerimages").append('<div class="item active"><img class="offerPhoto" src="'+ convertedReturn.Offer.photo+'" /></div>');
                        $("#indicadores").append('<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>');
                        for(var h=0;h<convertedReturnss.length;h++){
                            $("#offerimages").append('<div class="item"><img class="offerPhoto" src="'+ convertedReturnss[h].offers_photos.photo+'" /></div>');
                            $("#indicadores").append('<li data-target="#carousel-example-generic" data-slide-to="'+(h+1)+'"></li>');

                        }
                    }else{
                        $("#offerimages").html("");
                        $("#indicadores").html("");
                        $("#left").html("");
                        $("#right").html("");
                        $("#left").addClass("hide");
                        $("#right").addClass("hide");
                        $("#offerimages").append('<div class="item active"><img class="offerPhoto" src="'+ convertedReturn.Offer.photo+'" /></div>');
                        $("#indicadores").append('<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>');
                    }




                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });

            }
        var titulo = convertedReturn.Offer.title;
            if(convertedReturn.Offer.resume.length>150){
                var text1 = (convertedReturn.Offer.resume).split('.');
                $("#textOffer").html('<span id="textoresumo">'+text1[0]+'...</span><span style="color: #2597AC" id="showtherest">mostrar mais</span><span style="color: #2597AC"  id="showthefirstpart" class="hide">...mostrar menos</span>');
                $("#showtherest").click(function(){
                    $("#textoresumo").html(convertedReturn.Offer.resume);
                    $("#showtherest").addClass('hide');
                    $("#showthefirstpart").removeClass('hide');
                })
                $("#showthefirstpart").click(function(){
                    $("#textoresumo").html(text1[0]+'...');
                    $("#showthefirstpart").addClass('hide');
                    $("#showtherest").removeClass('hide');

                })
            }else{
                $("#textOffer").html(convertedReturn.Offer.resume);
            }


        var tituloMaiusculo = titulo.toUpperCase();
        $("#offerProductName").append(tituloMaiusculo);
        var arredondaOldPrice =convertedReturn.Offer.value;
        var linhaoldprice = arredondaOldPrice.replace(".", ",");
        meuLog(linhaoldprice);
        $("#offerOldPrice").append("De R$" + linhaoldprice+"<br>");
        // $("#offerOldPrice").append(convertedReturn.Offer.value +"<br>");
        var valorComDesconto = (convertedReturn.Offer.value/100)*(100-convertedReturn.Offer.percentage_discount);
        var arredondado = valorComDesconto.toFixed(2);
        var linha = arredondado.replace(".", ",");
        meuLog(linha);
        $("#offerNewPrice").append("Por R$"+linha+"<br>");
        var parcelas = valorComDesconto/12;
        var parcelasarredondado = parcelas.toFixed(2);
        var linhaparcelas = parcelasarredondado.replace(".", ",");
        meuLog(linhaparcelas);
        if(convertedReturn.Offer.parcels=="ACTIVE"){
            $("#offerParcels").append("em até "+convertedReturn.Offer.parcels_quantity+"x no cartão de crédito" +"<br>");
        }


            var conditions = {
                'Company': {
                    'conditions': {
                        'Company.id': $.cookieStorage.get('Offer').company_id
                    }
                }
            };


            var postData = JSON.stringify(conditions);

            postData = {
                'params': postData
            };
            var url = 'https://'+api+'/companies/get/first/' + createToken();


            $.ajax({
                method: "POST",
                url: url,
                data: postData
            }).done(function (result) {

                var objReturns = JSON.parse(JSON.stringify(result));
                var decodeObjReturns = Base64.decode(objReturns);
                var convertedReturns = JSON.parse(decodeObjReturns);

                $("#nomeempresa").append(convertedReturns.Company.fancy_name);

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });

        $("#footerHomeIconClick").click(function(){
            generateModalAlert(convertedReturn.Offer.description);
            $('#mymodal').modal('show');
        });
            $("#footerEspecificacaoClick").click(function(){
                generateModalAlert(convertedReturn.Offer.specification);
                $('#mymodal').modal('show');
            });


        var conditionsComment = {
            'OffersComment': {
                'conditions': {
                    'OffersComment.offer_id': id
                }
            }
        };

        var postDataComment = JSON.stringify(conditionsComment);


        postDataComment = {
            'params': postDataComment
        };
        var urlComment = 'https://'+api+'/offers/get/all/' + createToken();

        $.ajax({
            method: "POST",
            url: urlComment,
            data: postDataComment
        }).done(function (result) {


            if (result != "") {
                var objReturnComment = JSON.parse(JSON.stringify(result));
                var decodeObjReturnComment = Base64.decode(objReturnComment);
                var convertedReturnComment = JSON.parse(decodeObjReturnComment);


            var variavel=0;

            for(var i=0;i<convertedReturnComment.length;i++){
                variavel += (convertedReturnComment[i].OffersComment.evaluation/1);

            }
            var media=0;

            media=(variavel/convertedReturnComment.length).toFixed(1);
            switch(media){
                case "0": $("#numberStars").attr('src','img/icons/0.png');
                    break;
                case "0.1": $("#numberStars").attr('src','img/icons/0.png');
                    break;
                case "0.2": $("#numberStars").attr('src','img/icons/0.png');
                    break;
                case "0.3":$("#numberStars").attr('src', 'img/icons/0.5.png');
                    break;
                case "0.4":$("#numberStars").attr('src', 'img/icons/0.5.png');
                    break;
                case "0.5":$("#numberStars").attr('src', 'img/icons/0.5.png');
                    break;
                case "0.6":$("#numberStars").attr('src', 'img/icons/0.5.png');
                    break;
                case "0.7":$("#numberStars").attr('src', 'img/icons/0.5.png');
                    break;

                case "0.8":$("#numberStars").attr('src', "img/icons/1.png");
                    break;
                case "0.9":$("#numberStars").attr('src', "img/icons/1.png");
                    break;
                case "1.0":$("#numberStars").attr('src', "img/icons/1.png");
                    break;
                case "1.1":$("#numberStars").attr('src', "img/icons/1.png");
                    break;
                case "1.2":$("#numberStars").attr('src', "img/icons/1.png");
                    break;

                case "1.3": $("#numberStars").attr('src', "img/icons/1.5.png");
                    break;
                case "1.4": $("#numberStars").attr('src', "img/icons/1.5.png");
                    break;
                case "1.5": $("#numberStars").attr('src', "img/icons/1.5.png");
                    break;
                case "1.6": $("#numberStars").attr('src', "img/icons/1.5.png");
                    break;
                case "1.7": $("#numberStars").attr('src', "img/icons/1.5.png");
                    break;

                case "1.8":$("#numberStars").attr('src', "img/icons/2.png");
                    break;
                case "1.9":$("#numberStars").attr('src', "img/icons/2.png");
                    break;
                case "2.0":$("#numberStars").attr('src', "img/icons/2.png");
                    break;
                case "2.1":$("#numberStars").attr('src', "img/icons/2.png");
                    break;
                case "2.2":$("#numberStars").attr('src', "img/icons/2.png");
                    break;

                case "2.3": $("#numberStars").attr('src', "img/icons/2.5.png");
                    break;
                case "2.4": $("#numberStars").attr('src', "img/icons/2.5.png");
                    break;
                case "2.5": $("#numberStars").attr('src', "img/icons/2.5.png");
                    break;
                case "2.6": $("#numberStars").attr('src', "img/icons/2.5.png");
                    break;
                case "2.7": $("#numberStars").attr('src', "img/icons/2.5.png");
                    break;

                case "2.8": $("#numberStars").attr('src', "img/icons/3.png");
                    break;
                case "2.9": $("#numberStars").attr('src', "img/icons/3.png");
                    break;
                case "3.0": $("#numberStars").attr('src', "img/icons/3.png");
                    break;
                case "3.1": $("#numberStars").attr('src', "img/icons/3.png");
                    break;
                case "3.2": $("#numberStars").attr('src', "img/icons/3.png");
                    break;

                case "3.3": $("#numberStars").attr('src', 'img/icons/3.5.png');
                    break;
                case "3.4": $("#numberStars").attr('src', 'img/icons/3.5.png');
                    break;
                case "3.5": $("#numberStars").attr('src', 'img/icons/3.5.png');
                    break;
                case "3.6": $("#numberStars").attr('src', 'img/icons/3.5.png');
                    break;
                case "3.7": $("#numberStars").attr('src', 'img/icons/3.5.png');
                    break;

                case "3.8":$("#numberStars").attr('src', "img/icons/4.png");
                    break;
                case "3.9":$("#numberStars").attr('src', "img/icons/4.png");
                    break;
                case "4.0":$("#numberStars").attr('src', "img/icons/4.png");
                    break;
                case "4.1":$("#numberStars").attr('src', "img/icons/4.png");
                    break;
                case "4.2":$("#numberStars").attr('src', "img/icons/4.png");
                    break;

                case "4.3": $("#numberStars").attr('src', "img/icons/4.5.png");
                    break;
                case "4.4": $("#numberStars").attr('src', "img/icons/4.5.png");
                    break;
                case "4.5": $("#numberStars").attr('src', "img/icons/4.5.png");
                    break;
                case "4.6": $("#numberStars").attr('src', "img/icons/4.5.png");
                    break;
                case "4.7": $("#numberStars").attr('src', "img/icons/4.5.png");
                    break;

                case "4.8":  $("#numberStars").attr('src', "img/icons/5.png");
                    break;
                case "4.9":  $("#numberStars").attr('src', "img/icons/5.png");
                    break;
                case "5.0":  $("#numberStars").attr('src', "img/icons/5.png");
                    break;

                default: $("#numberStars").attr('src', "img/icons/0.png");
            }
            }else{
                $("#mudar").removeClass("col-xs-7");
                $("#mudar").addClass("col-xs-12");
            }



        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });


        }



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
            +  mensagem
            + '</div>'
            + '</div>'
            + '</div>';
        $("body").append($modalHtml);
    }
}