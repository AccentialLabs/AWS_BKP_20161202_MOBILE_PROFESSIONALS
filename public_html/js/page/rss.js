
var gender = '';
$(document).ready(function() {

    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";

    if($.cookieStorage.get('SecondaryUser').gender == "female"){
        gender  = 'female';
    }else{
        gender = 'male';
    }
});
var valuesb;
function url() {
    var urlRss = '';
    if(gender == 'female'){
        urlRss =  'http://chic.uol.com.br/rss/beleza.rss';
    }else {
        urlRss = 'http://www.machomoda.com.br/feeds/posts/default?alt=rss';
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
            valuesb = xml.responseData.feed.entries;
            for (var i = 0; i < valuesb.length; i++) {
                var value = valuesb[i];
                var li = $("<li id='new' />");
                li.html(value.contentSnippet);
                $("#result").append(li);
                var description = document.getElementsByTagName("description").item(i).text;

            }
        }

    });
}



function mudarnoticia() {

    var i = 1;
    var id = '#new';
url();

            var milissegundos = 3000;

// Executa a função a cada intervalo de tempo

    var interval = setInterval(function () {



            $(id).fadeOut(500, function () {
                if(i == valuesso.length){

                    i = 1;
                    document.getElementById("newso").innerHTML = null;
                } else {
                    document.getElementById("newso").innerHTML = null;

                }
                // $(id).attr('src', cars[i] + '&w=350&h=150').delay(5).fadeIn(300);
                if(i != valuesso.length) {
                    // $(id).attr('src', cars[i] + '&w=350&h=150').delay(5).fadeIn(300);
                    document.getElementById("new").innerHTML = valuesb[i].contentSnippet;

                    document.getElementById('indicebeleza').value = i;
                }

                $(id).fadeIn(300);
                i++;

            });

    }, milissegundos);

}