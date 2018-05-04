export const constants = {
    isTouch: "ontouchstart" in window ? function() {
        // document.body.classList.add("touch");
        return true;
    }() : function() {
        // document.body.classList.add("no-touch");
        return false;
    }() ,
    body: $("body")
};
export function afteLoads() {
    if ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)) {
        $('.preload-images').remove();
        $('html').addClass('touch');
    } else {
        $('.preload-images').css('dispaly', 'none');
        $('html').addClass('no-touch');
    }
    window.addEventListener("load", () => {
        this.body.addClass('load');
        $('.preloader').removeClass('loading');
        setTimeout(function () {
            $('.preloader-wrapper').fadeOut(600)
        }, 500)
    });
}
export function btnDecorate() {
    $('.btn, input[type="submit"], button').append('<span class="decor-top"></span><span class="decor-bot"></span>')
}
export function headerActivities() {
    $('.btn-menu').on('click', function () {
        let $this = $(this);
        $this.closest('.header').toggleClass('opened');
        $this.toggleClass('active');
        $this.closest('.header').find('nav').fadeToggle();
        $('body').toggleClass('ovh');
    });
    $('.text-holder-desktop, .text-holder-mobile').on('click', function (e) {
        $(this).siblings('.drop-down').fadeToggle();
        $(this).parent().toggleClass('active');
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.lang-box').length) {
            $('.drop-down').fadeOut();
            $('.lang-box').removeClass('active')
        }
    });
    $('.btn-close').on('click', function () {
        $(this).closest('.drop-down').fadeOut();
        $('.lang-box').removeClass('active')
    });
    window.addEventListener("resize", () => {
        if ($(window).innerWidth() >= 1200) {
            this.body.removeClass('ovh');
        }
    });
}
