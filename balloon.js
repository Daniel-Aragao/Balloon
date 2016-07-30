


var Balloon = {    

    inflate: function(msg, btype, options) {
        this.balloonInflater.SetConfiguration(options);

        this.balloonInflater.CreateContainer();
        
        var ballon = $('<div class="balloon"></div>');
        var message = $('<div class="balloon-message"></div>');
        message.text(msg);

        this.balloonInflater.AdicionarClasses(btype, ballon);
        this.balloonInflater.AdicionarCloseBtn(ballon)

        ballon.append(message);

        this.balloonInflater.TempoLimite(ballon);
        this.balloonInflater.ClicarFechar(ballon);

        this.balloonInflater.container.append(ballon);
        this.balloonInflater.AnimarTimeOut(ballon);
        return ballon;
    },

    balloonInflater: {
        container: null,

        CreateContainer: function () {
            this.container = $("#balloon-container");
        
            if (this.container.length === 0) {
                this.container = $('<div id="balloon-container"><div>')
                this.ContainerPosition();
                $('body').append(this.container);
            }
        },

        default_options: { // for no option selected
            position_x: 'top', //screen position
            position_y: 'right', //screen position
            type: 'primary', // bootstrap same types
            closeButton: false, // no close btn
            timeOut: 0, //no time out
            clickToClose: true,
            carregando: true,
            titulo
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
            this.container.addClass('balloon-' + this.configuracao.position_y)
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
                }, parseInt(this.configuracao.timeOut))
            }
        },
        AnimarTimeOut: function (balloon) { 
            if (this.configuracao.timeOut != 0) {
                if (this.configuracao.carregando == true || this.configuracao.carregando == "true") {
                    var bar = $('<div class="loading-bar""></div>');
                    balloon.append(bar);
                    //$(bar).animate({ width: '0' }, parseInt(this.configuracao.timeOut));
                }
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

            for (var attr in this.default_options) { this.configuracao[attr] = this.default_options[attr]; }

            if (this.default_options != options) {
                for (var attr in options) {
                    if (!this.isNullOrUndefined(options[attr])) this.configuracao[attr] = options[attr];
                }
            }

        },

        isNullOrUndefined: function (variavel) {
            if (typeof variavel == "undefined" || !variavel) {
                return true;
            }
            return false;
        }
    },
    success: function (msg, options) {
        this.inflate(msg, "success", options);
    },
    info: function (msg, options) {
        this.inflate(msg, "info", options);
    },
    warning: function (msg, options) {
        this.inflate(msg, "warning", options);
    },
    danger: function (msg, options) {
        this.inflate(msg, "danger", options);
    },
    primary: function (msg, options) {
        this.inflate(msg, "primary", options);
    },
    balloon: function (msg, options) {
        this.inflate(msg, "balloon", options);
    }
}