var valuesso;
var index;
var gender = '';
$(document).ready(function() {
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";

    if($.cookieStorage.get('SecondaryUser').gender == "female"){
        gender  = 'female';
    }else{
        gender = 'male';
    }
});
   function urlso() {
       var urlRss = '';
       if(gender == 'female'){
           urlRss = 'http://www.gazetadopovo.com.br/viver-bem/feed/';
       }else{
           urlRss = 'http://www.canalmasculino.com.br/feed/';
       }

    $.ajax({
        type: "GET",
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(urlRss),
        dataType: 'json',
        error: function (xhr) {
            var erro = xhr.responseText;
            generateModalAlert('Erro ao ler o feed: ' + erro);
            $('#mymodal').modal('show');
        },
        success: function (xml) {
            valuesso = xml.responseData.feed.entries;
            for(var i = 0; i < 1; i++) {
                var value = valuesso[i];
                var li = $("<li id='newso' />");
                var header = $("<li />");
                li.html(value.contentSnippet);
                $("#results").append(li);
                //var description = item.getElementsByTagName("description").item(i).text;


            }

        }
    });
}
function mudarnoticiasobrancelha() {

    var i = 1;
    var id = '#newso';

    urlso();

    var milissegundos = 3000;

// Executa a função a cada intervalo de tempo

    var interval = setInterval(function () {

        $(id).fadeOut(500, function () {
            if(i == valuesso.length){

                i = 1;
                document.getElementById("newso").innerHTML = null;



            } else {
                document.getElementById("newso").innerHTML = null;

                console.log('qual valor do i ?' + i);
            }
            // $(id).attr('src', cars[i] + '&w=350&h=150').delay(5).fadeIn(300);
            if(i != valuesso.length) {
                document.getElementById("newso").innerHTML = valuesso[i].contentSnippet;
            }
            Index=i;
            $(id).fadeIn(300);


        });

    }, milissegundos);

}