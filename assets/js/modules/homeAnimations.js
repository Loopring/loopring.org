export function mobileSlider() {
    var slider = $('.steps');
    if($(window).innerWidth() < 1024){
        if(!$('.steps.slick-initialized').length){
            slider.slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                arrows: false,
                adaptiveHeight: true,
            });
        }
        $('.steps img').each(function () {
            let $this = $(this);
            $this.attr('src', $this.attr('data-src'))
        })
    }else{
        if($('.steps.slick-initialized').length){
            slider.slick('unslick');
        }
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
    let flag = true;
    window.addEventListener("resize", () => {
        if(flag){
            flag = false;
            this.mobileSlider();
            setTimeout(() => {
                flag = true;
            }, 1000);
        }
    });
}