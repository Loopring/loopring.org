export function introWrapper() {
    // $('.page-wrap').css('padding-top', 0);
    $(document).on("mousemove", function (e) {
        function mouseFollow(deltaX, deltaY) {
            return {
                'margin-top': -(((e.pageY - $(window).scrollTop()) - $(window).innerHeight()/2) / deltaY).toFixed(1) +'px',
                'margin-left': -((e.pageX - $(window).innerWidth()/2) / deltaX ).toFixed(1)+'px'
            }
        }
        if($(window).width() >= 1024){
            $('.parall.one').css(mouseFollow(80, 80));
            $('.parall.two').css(mouseFollow(40, 40));
            $('.parall.three').css(mouseFollow(20, 20));
            $('.parall.four').css(mouseFollow(60, 60));
            $('.parall.five').css(mouseFollow(100, 100));
        }
    });
}
export function introVideo() {
    const commandPlay = {
        "event": "command",
        "func": "playVideo"
    };
    const commandPause = {
        "event": "command",
        "func": "pauseVideo"
    };
    const commandStop = {
        "event": "command",
        "func": "stopVideo"
    };
    let popup = $('.popup-video');
    let player = popup.find('iframe')[0];
    $('.intro-wrapper .btn-watch').on('click', function (e) {
        e.preventDefault();
        popup.fadeIn();
        $('body').addClass('ovh');
        if (player != undefined) {
            player.contentWindow.postMessage(JSON.stringify(commandPlay), "*");
        }
    });
    function closePopup() {
        popup.fadeOut();
        $('body').removeClass('ovh');
        if (player != undefined) {
            player.contentWindow.postMessage(JSON.stringify(commandStop), "*");
        }
    }
    popup.find('.btn.close').on('click', function () {
        closePopup()
    });
    popup.on('click', function (e) {
        if (!$(e.target).closest('.box').length) {
            closePopup()
        }
    })
}