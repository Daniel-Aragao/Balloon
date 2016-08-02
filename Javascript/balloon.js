


var Balloon = {    

    inflate: function(msg, btype, options) {
        this.balloonInflater.SetConfiguration(options);

        this.balloonInflater.CreateContainer();
        
        var ballon = $('<div class="balloon"></div>');
        var message = $('<div class="balloon-message"></div>');
        message.text(msg);

        this.balloonInflater.AdicionarClasses(btype, ballon);

        this.balloonInflater.AdicionarCloseBtn(ballon)
        this.balloonInflater.AdicionarTitle(ballon);

        this.balloonInflater.AdicionarMenssagem(ballon, message);      

        this.balloonInflater.TempoLimite(ballon);
        this.balloonInflater.ClicarFechar(ballon);

        this.balloonInflater.AdicionarAoContainer(ballon);        
        this.balloonInflater.AnimarTimeOut(ballon);
        return ballon;
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
            carregando: 'full', // loading bar active: none/full/bottom/top
            titulo: '', // title,
            removalAnimation: true, // animate when removed
            addAnimation: true,
            useImage: false, // user image or not
            imageUrl: '', // local da imagem
            imagePrimary: 'http://balloonalerts.azurewebsites.net/Images/seta.png',
            imageSuccess: 'http://balloonalerts.azurewebsites.net/Images/Correto.png',
            imageWarning: 'http://balloonalerts.azurewebsites.net/Images/exclamacao.png',
            imageInfo: 'http://balloonalerts.azurewebsites.net/Images/info.png',
            imageDanger: 'http://balloonalerts.azurewebsites.net/Images/errado.png',
            imageBalloon:'http://balloonalerts.azurewebsites.net/Images/balloon.png'
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
        AdicionarAoContainer: function (balloon) { 
            var needtoAdd = this.configuracao.addAnimation

            if (toBoolean(needtoAdd)) {
                $(balloon).hide().appendTo(this.container).fadeIn('slow');
                //this.container.append(balloon).fadeIn('slow');
            } else {
                this.container.append(balloon);                
            }

        },

        AdicionarMenssagem: function (ballon, message){
            ballon.append(message);

            if(toBoolean(this.configuracao.useImage)){
                ballon.css("padding", "14px 14px 14px 54px");
                ballon.css("background-image", "url("+ this.configuracao.imageUrl+")");
            }

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

        TempoLimite: function (balloon) {
            if (this.configuracao.timeOut != 0 && this.configuracao.carregando == 'none') {
                var balloonRemover = this.RemoveBalloon;
                var tempo = this.configuracao.timeOut;

                var timeout = setTimeout(function () {
                    balloonRemover(balloon)
                    }, parseInt(tempo))

                $(balloon).on('mouseenter', function(){
                    clearTimeout(timeout);
                });

                $(balloon).on('mouseleave', function(){
                    timeout = setTimeout(function () {
                        balloonRemover(balloon)
                        }, parseInt(tempo));
                });
            }
        },
        AnimarTimeOut: function (balloon) { 
            if (this.configuracao.timeOut != 0) {
                if (this.configuracao.carregando != 'none') {
                    var bar = $('<div class="loading-bar""></div>');
                    balloon.append(bar);

                    if (this.configuracao.carregando != 'full') {
                        bar.css('position','absolute');
                        bar.css('height', '4px');
                        bar.css('opacity', '0.5');                        
                    }                    
                    
                    switch (this.configuracao.carregando) {
                        case 'full':
                            bar.css('height','100%');
                            break;
                        case 'top':
                            bar.css('top', '0');
                            break;
                        case 'bottom':
                            bar.css('bottom', '0');
                            break;
                    }


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
            var RemoveContainer = Balloon.balloonInflater.RemoveContainer;

            if (!toBoolean(config)) {
                $(balloon).remove();
                RemoveContainer(cont);
            } else {
                balloon.fadeOut('slow', function () {
                    $(balloon).remove();
                    RemoveContainer(cont);
                });
            }

            
        },
        RemoveContainer: function (container) { 
            if ($(container).children().length < 1) {
                $(container).remove();
            }
        },

        AdicionarClasses: function (btype, balloon) {
            if (typeof btype == "undefined" || btype == null) {
                btype = this.configuracao.type;
            }


            switch (btype) {
                case "success":
                    balloon.addClass("balloon-success");
                    this.configuracao.imageUrl = this.configuracao.imageSuccess;
                    break;
                case "info":
                    balloon.addClass("balloon-info");
                    this.configuracao.imageUrl = this.configuracao.imageInfo;
                    break;
                case "warning":
                    balloon.addClass("balloon-warning");
                    this.configuracao.imageUrl = this.configuracao.imageWarning;
                    break;
                case "danger":
                    balloon.addClass("balloon-danger");
                    this.configuracao.imageUrl = this.configuracao.imageDanger;
                    break;
                case "primary":
                    balloon.addClass("balloon-primary");
                    this.configuracao.imageUrl = this.configuracao.imagePrimary;
                    break;
                case "balloon":
                    balloon.addClass("balloon-balloon");
                    this.configuracao.imageUrl = this.configuracao.imageBalloon;
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