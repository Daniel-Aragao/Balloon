


var Balloon = {    

    inflate: function(msg, btype, options) {
        this.balloonInflater.SetConfiguration(options);

        this.balloonInflater.CreateContainer();
        
        var ballon = $('<div class="balloon"></div>');
        var message = $('<div class="balloon-message"></div>');
        message.text(msg);

        this.balloonInflater.AdicionarClasses(btype, ballon);

        this.balloonInflater.AdicionarTitle(ballon);        
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
                this.container = $('<div id="balloon-container"></div>')
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
            clickToClose: true, // when click remove ballon
            carregando: true, // loading bar active
            titulo: '', // title,
            removalAnimation:false // animate when removed
        },

        configuracao: {},
    
        ClicarFechar: function (ballon) {
            if (toBoolean(this.configuracao.clickToClose)) {
                var balloonRemover = this.RemoveBalloon;
                ballon.on('click', function () {
                    balloonRemover(ballon);
                })
            }
        },

        ContainerPosition: function () {
            this.container.addClass('balloon-' + this.configuracao.position_x)
            this.container.addClass('balloon-' + this.configuracao.position_y)
        },

        AdicionarCloseBtn: function (ballon) {
        
            if (toBoolean(this.configuracao.closeButton)) {
                var btn = $('<div class="closeBtn">x</div>');
                var balloonRemover = this.RemoveBalloon;
                btn.on('click', function () {
                    balloonRemover(ballon);
                });

                ballon.append(btn);
            }
        },

        TempoLimite: function (ballon) {
            if (this.configuracao.timeOut != 0 && !toBoolean(this.configuracao.carregando)) {
                var balloonRemover = this.RemoveBalloon;
                setTimeout(function () {
                    balloonRemover(ballon)
                }, parseInt(this.configuracao.timeOut))
            }
        },
        AnimarTimeOut: function (balloon) { 
            if (this.configuracao.timeOut != 0) {
                if (toBoolean(this.configuracao.carregando)) {
                    var bar = $('<div class="loading-bar""></div>');
                    balloon.append(bar);

                    var time = this.configuracao.timeOut;
                    var balloonRemover = this.RemoveBalloon;

                    $(bar).animate({ width: '0' }, parseInt(time), function () {
                        balloonRemover(balloon);
                    });

                    balloon.on('mouseenter', function () {
                        $(bar).stop().animate({width: '100%'}, parseInt(time));
                    })
                    balloon.on('mouseleave', function () {
                        $(bar).stop().animate({ width: '0' }, parseInt(time), function () {
                            balloonRemover(balloon);
                        });
                    })
                }
            }
        },
        AdicionarTitle: function (balloon) { 
            var titulo = this.configuracao.titulo
            if (titulo) {
                var element = $('<div class="title-bar"></div>');
                element.text(titulo);
                balloon.append(element);
            }
        },
        RemoveBalloon: function (balloon) {
            var config = Balloon.balloonInflater.configuracao.removalAnimation;
            var cont = Balloon.balloonInflater.container;

            if (!toBoolean(config)) {
                $(balloon).remove();
                
            } else {
                
            }

            if ($(cont).children().length < 1) {
                $(cont).remove();
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
            if (isNullOrUndefined(options)) {
                options = this.default_options;
            }

            for (var attr in this.default_options) { this.configuracao[attr] = this.default_options[attr]; }

            if (this.default_options != options) {
                for (var attr in options) {
                    if (!isNullOrUndefined(options[attr])) this.configuracao[attr] = options[attr];
                }
            }

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

function toBoolean(variavel) {
    if (variavel === true || variavel === false) return !!variavel;

    switch (variavel) {
        case "True": case "true": case "TRUE": return true;
        case "False": case "false": case "FALSE": return false;       
    }
}


function isNullOrUndefined(variavel) {
    if (typeof variavel == "undefined" || !variavel) {
        return true;
    }
    return false;
}