


function balloon(msg, btype) {
    var container = $("#balloon-container");

    if (container.length === 0) {
        container = $('<div id="balloon-container"><div>')
        $('body').append(container);
    }
        
    var ballon = $('<div class="balloon"></div>');

    var message = $('<div class="balloon-message"></div>');
    message.text(msg);

    ballon.append(message);

    switch (btype) {
        case "success":
            ballon.addClass("balloon-success");
            break;
        case "info":
            ballon.addClass("balloon-info");
        break;
        case "warning":
            ballon.addClass("balloon-warning");
            break;
        case "danger":
            ballon.addClass("balloon-danger");
            break;
        case "primary":
        default:
            ballon.addClass("balloon-primary");
            break;
    }


    container.append(ballon);
}