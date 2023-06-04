let term;

$(async function() {
    const $dialog = $('.dialog');
    let heightPage  = $(window).height() * 0.9;
    let widthPage = $(window).width() * 0.9;

    $dialog.dialog({
        title     : `${username}:~`,
        width     : widthPage < 1100
                        ? widthPage
                        : 1100,
        height    : heightPage < 700
                        ? heightPage
                        : 700,
        resizable : false,
        open      : function(){
            $(this).css("overflow-x", 'hidden');
        }
    });

    const starterWord = 'aboutfetch';
    const $input = $('.cmdline');
    const $prompt = $('.prompt');

    $prompt.html(`[${username}] # `);

    term = new Terminal('#input-line .cmdline', '#wrapper output');
    term.init();

    await keyboardInputEmission(starterWord, $input)
    $(window).resize(function() {
        let heightPage  = $(window).height() * 0.9;
        let widthPage = $(window).width() * 0.9;

        $dialog.dialog("option", "width", widthPage < 1100
                                                    ? widthPage
                                                    : 1100);
        $dialog.dialog("option", "height", heightPage < 700
                                                    ? heightPage
                                                    : 700);
    });

    $(document).keyup(function(e) {
        if($input.is(':focus'))
            return;

        $input
            .val(e.originalEvent.key)
            .focus();
    })
    $dialog.on('dialogclose', function() {
        showBlackWindow();
    });
});