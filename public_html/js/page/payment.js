var id = "";
var parcels = "";
$(document).ready(function() {
     CalcularParcelas();
    $("#info").click(function(){
        generateModalAlert("O número do CPF é necessário para realizar a compra através do Moip (meio de pagamento). Como forma de manter a privacidade dos nossos usuários, esta informação será utilizada somente durante o processamento da compra e não ficará armazenado em nossos servidores.");
        $('#mymodal').modal('show');

    });
    $("#infoboleto").click(function(){
        generateModalAlert("O número do CPF é necessário para realizar a compra através do Moip (meio de pagamento). Como forma de manter a privacidade dos nossos usuários, esta informação será utilizada somente durante o processamento da compra e não ficará armazenado em nossos servidores.");
        $('#mymodal').modal('show');

    });
    $("#question").click(function(){
        generateModalAlert("O número do CPF é necessário para realizar a compra através do Moip (meio de pagamento). Como forma de manter a privacidade dos nossos usuários, esta informação será utilizada somente durante o processamento da compra e não ficará armazenado em nossos servidores.");
        $('#mymodal').modal('show');

    });
    $("#questionboleto").click(function(){
        generateModalAlert("O número do CPF é necessário para realizar a compra através do Moip (meio de pagamento). Como forma de manter a privacidade dos nossos usuários, esta informação será utilizada somente durante o processamento da compra e não ficará armazenado em nossos servidores.");
        $('#mymodal').modal('show');

    });


    if($.cookieStorage.get('Offer').parcels !='INACTIVE'){
        var quantidadedeparcelas = $.cookieStorage.get('Offer').parcels_quantity;
        quantidadedeparcelas = (quantidadedeparcelas/1)+1;
        console.log(quantidadedeparcelas);
        for( var i=1;i<quantidadedeparcelas;i++){
            document.getElementById("parcels").innerHTML += "<option value="+i+">"+i+"x R$</option>";
        }
    }

    if($.cookieStorage.get('paginaanterior') == "https://'+ip+'/jezzy-mobile-professionals/public_html/home.html"){
        id = $.cookieStorage.get('Offer').id;
        parcels = $.cookieStorage.get('Offer').parcels;
    }else{
        id = $.cookieStorage.get('Offer').id;
        parcels = $.cookieStorage.get('Offer').parcels;
    }



    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";
    $("#taxdocument1").mask("999.999.999-99");
    $("#taxdocument1boleto").mask("999.999.999-99");
    var date = new Date();
    var year = date.getFullYear();


    for( var i=0;i<10;i++){
        var yeark = year.toString().substr(2,2);
        document.getElementById("year").innerHTML += "<option value="+yeark+">"+year+"</option>";
        year++;
    }

    $("#iconeforgotpassword").click(function(){
        document.window.go(-1);
    });

});
function CalcularParcelas(){
    var url = 'php/QueryParcels.php';

    $.ajax({
        method: "POST",
        url: url

    }).done(function(result) {
        $("#MoipWidget").attr('data-token', result);

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}
function voltar(){
    window.history.go(-1);
}
function Sair(){
    $.cookieStorage.remove('User');
    $.removeAllStorages();
    localStorage.removeItem('FavCompany');


    window.location.href = 'https://'+ip+'/jezzy-mobile-professionals/public_html/index.html';


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

function TestaCPF(strCPF) {

    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000")
        return false;
    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)))
        return false;
    Soma = 0;
    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11)))
        return false;
    return true;
}
