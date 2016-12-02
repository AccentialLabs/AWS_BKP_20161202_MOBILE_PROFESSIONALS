
$(document).ready(function() {

});


function voltar() {
    window.history.go(-1);

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
            + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            + '<button type="button" class="btn btn-primary">Save changes</button>'
            + '</div>'
            + '</div>'
            + '</div>';
        $("body").append($modalHtml);
    }
}





