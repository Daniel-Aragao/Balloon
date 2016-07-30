


function balloon(msg, btype, options) {    

    balloonInflater.SetConfiguration(options);

    balloonInflater.CreateContainer();
        
    var ballon = $('<div class="balloon"></div>');
    var message = $('<div class="balloon-message"></div>');
    message.text(msg);

    balloonInflater.AdicionarClasses(btype, ballon);
    balloonInflater.AdicionarCloseBtn(ballon)

    ballon.append(message);

    balloonInflater.TempoLimite(ballon);
    balloonInflater.ClicarFechar(ballon);

    balloonInflater.container.append(ballon);
    return ballon;
}

var balloonInflater = {
    container: null,

    CreateContainer: function () {
        this.container = $("#balloon-container");
        
        if (this.container.length === 0) {
            this.container = $('<div id="balloon-container"><div>')
            this.ContainerPosition();
            $('body').append(this.container);
        }
    },

    default_options : { // for no option selected
        position_x: 'top', //screen position
        position_y: 'right', //screen position
        type: 'primary', // bootstrap same types
        closeButton: false, // no close btn
        timeOut: 0, //no time out
        clickToClose: true
    },

    configuracao: {},
    
    ClicarFechar: function (ballon) {    
        if (this.configuracao.clickToClose == true || this.configuracao.clickToClose == "true") {       
            ballon.on('click', function () {
                ballon.remove();
            })
        }
    },

    ContainerPosition: function () { 
        this.container.addClass('balloon-' + this.configuracao.position_x)
        this.container.addClass('balloon-'+ this.configuracao.position_y)
    },

    AdicionarCloseBtn: function (ballon) {
        
        if (this.configuracao.closeButton == true || this.configuracao.closeButton == "true") {
            var btn = $('<div class="closeBtn">x</div>');
            
            btn.on('click', function () {
                ballon.remove(); 
            });

            ballon.append(btn);
        }
    },

    TempoLimite: function (ballon) {   
        if (this.configuracao.timeOut != 0) {
            setTimeout(function () { 
                ballon.remove()
            } ,this.configuracao.timeOut)
        }
    },

    AdicionarClasses: function (btype, balloon) {
        if (typeof btype == "undefined" || btype == null) {
            btype = this.configuracao.type; 
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
    },

    SetConfiguration: function (options) {
        if (this.isNullOrUndefined(options)) {
            options = this.default_options;
        }

        for (var attr in this.default_options) {this.configuracao[attr] = this.default_options[attr];} 

        if (this.default_options != options) {
            for (var attr in options) {
                if(!this.isNullOrUndefined(options[attr])) this.configuracao[attr] = options[attr];
            }    
        }    

    },

    isNullOrUndefined: function (variavel) {
        if (typeof variavel == "undefined" || !variavel) {
            return true;
        }
        return false;
    }
}
