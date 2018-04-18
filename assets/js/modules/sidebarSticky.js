export function sidebarSticky() {
    let sidebar = $('.sidebar');
    function scrollLoad() {
        if ($(window).innerWidth() >= 1200) {
            let scrollTop = $(window).scrollTop();
            if (sidebar.offset().top <= scrollTop) {
                sidebar.addClass('fixed');
                sidebar.find('.sidebar-box').css('left', sidebar.offset().left);
            }else{
                sidebar.removeClass('fixed');
            }
        }else{
            sidebar.removeClass('fixed');
        }
    }
    window.addEventListener("scroll", () => {
        scrollLoad()
    });
    window.addEventListener("load", () => {
        scrollLoad()
    });
    window.addEventListener("resize", () => {
        scrollLoad()
    });
}