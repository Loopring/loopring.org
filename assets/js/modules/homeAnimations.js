export function mobileSlider() {
    $('.steps').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: false,
        adaptiveHeight: true,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 1023,
                settings: "unslick"
            }
        ]
    });


    if($(window).innerWidth() < 1024){
        $('.steps img').each(function () {
            let $this = $(this);
            $this.attr('src', $this.attr('data-src'))
        })
    }else{
        //todo this on scroll
        $('.steps img').each(function () {
            let $this = $(this);
            $this.attr('src', $this.attr('data-gif-src'))
        })
    }
}
export function videoSlider() {
    const commandPlay = {
        "event": "command",
        "func": "playVideo"
    };
    const commandPause = {
        "event": "command",
        "func": "pauseVideo"
    };
    let videoSlider = $('.video-slider');
    videoSlider.slick({
        infinite: true,
        speed: 300,
        centerMode: true,
        centerPadding: 0,
        variableWidth: true,
        arrows: false,
        focusOnSelect: true,
        adaptiveHeight: true,

    });
    //stop onLeave slider
    videoSlider.on('beforeChange', function(event, slick, currentSlide){
        let current = $('.video-slider .slick-slide:not(.slick-cloned)').eq(currentSlide);
        current.find('iframe')[0].contentWindow.postMessage(JSON.stringify(commandPause), "*");
        current.find('.video-placeholder').fadeIn();
    });
    //play after load slider
    videoSlider.on('afterChange', function(event, slick, currentSlide){
        let current = $('.video-slider .slick-slide:not(.slick-cloned)').eq(currentSlide);
        current.find('iframe')[0].contentWindow.postMessage(JSON.stringify(commandPlay), "*");
        current.find('.video-placeholder').fadeOut();
    });
    //play on btn
    $('.video-placeholder .btn-watch').on("click", function (e) {
        e.preventDefault();
        let $thisParent = $(this).parent();
        $thisParent.fadeOut();
        let thisIframe = $thisParent.siblings('.holder').find('iframe')[0];
        if (thisIframe != undefined) {
            thisIframe.contentWindow.postMessage(JSON.stringify(commandPlay), "*");
        }
        return false
    })
}
export function mobileSliderResize() {
    let flagPng = true;
    let flagGif = true;
    let flag = true;
    window.addEventListener("resize", () => {
        if(flag){
            flag = false;

            setTimeout(() => {
                flag = true;
            }, 1000);
        }
        if($(window).innerWidth() < 1024){
            if(flagPng){
                $('.steps img').each(function () {
                    let $this = $(this);
                    $this.attr('src', $this.attr('data-src'))
                });
                flagPng = false;
                flagGif = true;
            }
        }else{
            //todo this on scroll
            if(flagGif){
                $('.steps img').each(function () {
                    let $this = $(this);
                    $this.attr('src', $this.attr('data-gif-src'))
                });
                flagPng = true;
                flagGif = false;
            }
        }
    });
}
export function historySlider() {
    let navSlider = $('.history-slider-nav');
    let historySlider = $('.history-slider');
    navSlider.slick({
        focusOnSelect: true,
        asNavFor: '.history-slider',
        slidesToShow: 1,
        infinite: false,
        slidesToScroll: 1,
        mobileFirst: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                }
            }
        ]
    });
    historySlider.slick({
        asNavFor: '.history-slider-nav',
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        fade: true
    })
}