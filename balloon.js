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

    SetConfiguration(options);

    CreateContainer();
        
    var ballon = $('<div class="balloon"></div>');
    var message = $('<div class="balloon-message"></div>');
    message.text(msg);

    AdicionarClasses(btype, ballon);
    AdicionarCloseBtn(ballon)
    ballon.append(message);

    TempoLimite(ballon);
    ClicarFechar(ballon);

    container.append(ballon);
    return ballon;
}

function CreateContainer() {
    container = $("#balloon-container");
    
    if (container.length === 0) {
        container = $('<div id="balloon-container"><div>')
        ContainerPosition();
        $('body').append(container);
    }
}

function ClicarFechar(ballon) {    
    if (configuracao.clickToClose == true || configuracao.clickToClose == "true") {       
        ballon.on('click', function () {
            ballon.remove();
        })
    }
}

function ContainerPosition() { 
    container.addClass('balloon-' + configuracao.position_x)
    container.addClass('balloon-'+configuracao.position_y)
}

function AdicionarCloseBtn(ballon) {
    
    if (configuracao.closeButton == true || configuracao.closeButton == "true") {
        var btn = $('<div class="closeBtn">x</div>');
        
        btn.on('click', function () {
            ballon.remove(); 
        });

        ballon.append(btn);
    }
}

function TempoLimite(ballon) {   
    if (configuracao.timeOut != 0) {
        setTimeout(function () { 
            ballon.remove()
        } ,configuracao.timeOut)
    }
}

function AdicionarClasses(btype, balloon) {
    if (typeof btype == "undefined" || btype == null) {
	    btype = configuracao.type; 
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

function SetConfiguration(options) {
    if (isNullOrUndefined(options)) {
        options = default_options;
    }

    for (var attr in default_options) {configuracao[attr] = default_options[attr];} 

    if (default_options != options) {
        for (var attr in options) {
            if(!isNullOrUndefined(options[attr])) configuracao[attr] = options[attr];
        }    
    }    

}

function isNullOrUndefined(variavel) {
    if (typeof variavel == "undefined" || !variavel) {
        return true;
    }
    return false;
}