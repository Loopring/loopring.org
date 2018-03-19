export const constants = {
    isTouch: "ontouchstart" in window ? function() {document.body.classList.add("touch"); return true;}() : false,
    body: $("body")
}
export function afteLoads() {
    window.addEventListener("load", () => {
        this.body.addClass('load')
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
    $('.lang-box').on('click', function (e) {
        if (!$(e.target).closest('.btn-close').length) {
            $(this).find('.drop-down').fadeIn();
        }
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.lang-box').length) {
            $('.drop-down').fadeOut();
        }
    });
    $('.btn-close').on('click', function () {
        $(this).closest('.drop-down').fadeOut();
    })

}
