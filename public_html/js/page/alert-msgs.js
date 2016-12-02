// Enable pusher logging - don't include this in production
Pusher.log = function(message) {
    if (window.console && window.console.log) {
        window.console.log(message);
    }
};

var pusher = new Pusher('9f4cbd00132ee1e897fd', {
    encrypted: true
});

var channel = pusher.subscribe('377');
channel.bind('my_event', function(data) {
    alert(data.message);
});


