export function odometer() {
    window.odometerOptions = {
        duration: 2000, // Change how long the javascript expects the CSS animation to take
        animation: 'count' // Count is a simpler animation method which just increments the value,
    };

    let odometerHolder = $('.circle');
    odometerHolder.attr('data-flag', 1);
    function scrollLoad() {
        if ($(window).innerWidth() >= 300) {
            let scrollTop = $(window).scrollTop() + $(window).innerHeight() * 0.7;
            odometerHolder.each(function () {

                let $this = $(this);
                let num = $this.find('.odometer').attr('data-end-num');
                let angle = $this.find('svg').attr('data-angle');
                if ($this.offset().top <= scrollTop && $this.attr('data-flag') == 1) {
                    $this.find('svg').animate({
                        'stroke-dashoffset':  angle
                    }, 2000, 'swing');
                    $this.find('.odometer').html(num);
                    $this.attr('data-flag', 0)
                }
            });
        }
    }
    window.addEventListener("scroll", () => {
        scrollLoad()
    });
    window.addEventListener("load", () => {
        scrollLoad()
    });
}