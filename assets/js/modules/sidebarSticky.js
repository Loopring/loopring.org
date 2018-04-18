export function sidebarSticky() {
    let sidebar = $('.sidebar');
    let winHeight = $(window).innerHeight();
    let footer = $('.footer');
    let footerHeight = footer.innerHeight();
    function scrollLoad() {
        if ($(window).innerWidth() >= 1200) {
            let scrollTop = $(window).scrollTop();
            if (sidebar.offset().top <= scrollTop) {
                sidebar.addClass('fixed');
                sidebar.find('.sidebar-box').css('left', sidebar.offset().left);
                if(scrollTop + sidebar.find('.sidebar-box').innerHeight() < footer.offset().top ){
                    sidebar.find('.sidebar-box').css({
                        'top': '0px',
                        'bottom':'auto'
                    })
                }else{
                    let bot = -(footer.offset().top - scrollTop - winHeight);
                    console.log(scrollTop);
                    console.log(winHeight);
                    console.log(footerHeight);
                    console.log(footer.offset().top );
                    sidebar.find('.sidebar-box').css({
                        'top': 'auto',
                        // 'bottom': bot+'px'
                        'bottom': bot+'px'
                    })
                }
            }else{
                sidebar.removeClass('fixed');
                sidebar.find('.sidebar-box').css({
                    'bottom': 'auto',
                })
            }
        }else{
            sidebar.removeClass('fixed');
            sidebar.find('.sidebar-box').css({
                'bottom': 'auto',
            })
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