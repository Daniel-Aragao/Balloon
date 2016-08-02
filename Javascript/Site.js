function startballoon() {
    var option = {
        closeButton: $('input[name=closebtn]:checked').val(),
        position_x: $('input[name=px]:checked').val(),
        position_y: $('input[name=py]:checked').val(),
        timeOut: $('#Timeout').val(),
        clickToClose: $('input[name=closeclick]:checked').val(),
        type: $('input[name=type]:checked').val(),
        carregando: $('input[name=carregando]:checked').val(),
        titulo: $('#titulo').val(),
        useImage: $('input[name=useImage]:checked').val(),
        removalAnimation: $('input[name=removalAnimation]:checked').val(),
        addAnimation: $('input[name=addAnimation]:checked').val()
    }
    Balloon['inflate']($('#Menssagem').val(), null, option);    
    
    UpdateConfigSection(option);
}
function reset(){    
    if ($("#balloon-container").length != 0) {
        $("#balloon-container").remove()
    }
}

function UpdateConfigSection(option) {
    var section = $("#config-section");

    $('#new_section').remove();
    var new_section = $('<div id="new_section"></div>')
    
    new_section.append('<span>var option = {</span><br>')

    for (var key in option) {
        console.log(key + ' ' + option[key])
        if (option[key] == "") {
            new_section.append('<span>&#160&#160&#160&#160&#160&#160' + key + ' = ' + Balloon.balloonInflater.default_options[key] + ',</span><br>');
        } else {
            new_section.append('<span>&#160&#160&#160&#160&#160&#160' + key + ' = ' + option[key] + ',</span><br>');            
        }
    }
    new_section.append('<span>}</span><br>')

    new_section.append('<span>Balloon["inflate"]("' + $('#Menssagem').val() + '",null,option)</span>');
    
    section.append(new_section);
}