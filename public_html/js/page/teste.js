$(document).ready(function(){







    $('.toggle-nav').click(function (e) {
        e.
        e.stopPropagation();
        toggleNav();
    });
    $("body").on("swipeleft",function (e) {
        alert("lets go");
        var target = $(e.target);
        if (!target.closest('nav').length && $('body').hasClass('canvas-slid'))
            toggleNav();
    });
});
function toggleNav() {
    if ($('body').hasClass('canvas-slid')) {
        // Do things on Nav Close
        $('body').removeClass('canvas-slid');
    } else {
        // Do things on Nav Open
        $('body').addClass('canvas-slid');
    }
}