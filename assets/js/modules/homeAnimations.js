export function mobileSlider() {
    var slider = $('.steps');
    if($(window).innerWidth() < 1024){
        if(!$('.steps.slick-initialized').length){
            console.log('initialized');
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
            console.log('unslick');
            slider.slick('unslick');
        }
        $('.steps img').each(function () {
            let $this = $(this);
            $this.attr('src', $this.attr('data-gif-src'))
        })
    }
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