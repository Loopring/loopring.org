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
        $(this).closest('.header').toggleClass('opened')
    })
}
