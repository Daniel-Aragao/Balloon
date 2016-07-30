var container;
var default_options = { // for no option selected
    position_x: 'top', //screen position
    position_y: 'right', //screen position
    type: 'primary', // bootstrap same types
    closeButton: false, // no close btn
    timeOut: 0, //no time out
    clickToClose: true
}

var configuracao = {} 


function balloon(msg, btype, options) {
    if (typeof options == "undefined" || options == null) {
        options = default_options;
    }

    container = $("#balloon-container");
    
    if (container.length === 0) {
        container = $('<div id="balloon-container"><div>')
        ContainerPosition(options);
        $('body').append(container);
    }
        
    var ballon = $('<div class="balloon"></div>');
    var message = $('<div class="balloon-message"></div>');
    message.text(msg);

    AdicionarClasses(btype, options, ballon);
    AdicionarCloseBtn(options, ballon)
    ballon.append(message);

    TempoLimite(options, ballon);
    ClicarFechar(options, ballon);

    container.append(ballon);
    return ballon;
}

function ClicarFechar(options, ballon) {
    if (typeof options.clickToClose == "undefined") {
        options.clickToClose = default_options.clickToClose;
    }

    if (options.clickToClose == true || options.clickToClose == "true") {       
        ballon.on('click', function () {
            ballon.remove();
        })
    }
}

function ContainerPosition(opt) {
    if (typeof opt.position_x == "undefined") {
        opt.position_x = default_options.position_x;
    }
    if (typeof opt.position_y == "undefined") {
        opt.position_y = default_options.position_y;
    }
    
    container.addClass('balloon-' + opt.position_x)
    container.addClass('balloon-'+opt.position_y)
}

function AdicionarCloseBtn(opt, ballon) {
    if (typeof opt.closeButton == "undefined") {
        opt.closeButton = default_options.closeButton;
    }

    if (opt.closeButton == true || opt.closeButton == "true") {
        var btn = $('<div class="closeBtn">x</div>');
        
        btn.on('click', function () {
            ballon.remove(); 
        });

        ballon.append(btn);
    }
}

function TempoLimite(options, ballon) {
    if (typeof options.timeOut == "undefined") {
        options.timeOut = default_options.timeOut;
    }

    if (options.timeOut != 0) {
        setTimeout(function () { 
            ballon.remove()
        } ,options.timeOut)
    }
}

function AdicionarClasses(btype, option, balloon) {
    if (typeof btype == "undefined" || btype == null) {
        if (typeof option.type == "undefined") {
            btype = default_options.type;            
        } else {
            btype = option.type;
        }
    } 


    switch (btype) {
        case "success":
            balloon.addClass("balloon-success");
            break;
        case "info":
            balloon.addClass("balloon-info");
        break;
        case "warning":
            balloon.addClass("balloon-warning");
            break;
        case "danger":
            balloon.addClass("balloon-danger");
            break;
        case "primary":
            balloon.addClass("balloon-primary");
            break;
        case "balloon":
            balloon.addClass("balloon-balloon");
            break;
        default:
            break;
    }
}