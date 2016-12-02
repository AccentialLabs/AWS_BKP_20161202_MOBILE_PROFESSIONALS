var valuesnail;
var gender = '';
$(document).ready(function() {
    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";
    if($.cookieStorage.get('SecondaryUser').gender == "female"){
        gender  = 'female';
    }else{
        gender = 'male';
    }
});
    function urlnail() {
        var urlRss = '';
        if(gender == 'female'){
            urlRss = 'http://unhasinspiradas.com/feed/';
        }else{
            urlRss = 'http://feeds.feedburner.com/TiposDeBarba?format=xml';
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
            valuesnail = xml.responseData.feed.entries;
            for(var i = 0; i < valuesnail.length; i++) {
                var value = valuesnail[i];
                var li = $("<li id='newnail' />");
                var header = $("<li />");
                var img = $("<li />");
                li.html(value.contentSnippet);
                $("#resultn").append(li);
                var description = document.getElementsByTagName("description").item(i).text;

            }

        }
    });
}
$(document).ready(function() {

    document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";

});
function mudarnoticianail() {

    var i = 1;
    var id = '#newnail';
    urlnail();

    var milissegundos = 3000;

// Executa a função a cada intervalo de tempo

    var interval = setInterval(function () {



        $(id).fadeOut(500, function () {
            if (i == valuesso.length) {

                i = 1;
                document.getElementById("newso").innerHTML = null;



            } else {
                document.getElementById("newso").innerHTML = null;

                console.log('qual valor do i ?' + i);
            }
            // $(id).attr('src', cars[i] + '&w=350&h=150').delay(5).fadeIn(300);
            if (i != valuesso.length) {
            document.getElementById("newnail").innerHTML = valuesnail[i].contentSnippet;
        }
            $(id).fadeIn(300);
            i++;
        });

    }, milissegundos);

}