export function introWrapper() {
    $(document).on("mousemove", function (e) {
        var cx1 = (e.pageX - $(window).innerWidth()/2) / 80;
        var cy1 = ((e.pageY - $(window).scrollTop()) - $(window).innerHeight()/2) / 80;
        var cx2 = (e.pageX - $(window).innerWidth()/2) / 40;
        var cy2 = ((e.pageY - $(window).scrollTop()) - $(window).innerHeight()/2) / 40;
        var cx3 = (e.pageX - $(window).innerWidth()/2) / 20;
        var cy3 = ((e.pageY - $(window).scrollTop()) - $(window).innerHeight()/2) / 20;
        if($(window).width() >= 1024){
            $('.parall.one').css({
                'margin-top': cy1+'px',
                'margin-left': cx1+'px'
            });
            $('.parall.two').css({
                'margin-top': cy2+'px',
                'margin-left': cx2+'px'
            });
            $('.parall.three').css({
                'margin-top': cy3+'px',
                'margin-left': cx3+'px'
            });
        }
    });

}
// todo