export function accordeon() {
    let accordeon = $('.accordeon');
    accordeon.on('click', '.title', function () {
        let $this = $(this);
        if($this.hasClass('active')){
            $this.removeClass('active');
            $this.siblings('.acc-holder').slideUp();
        }else{
            $('.accordeon .title').removeClass('active');
            $('.accordeon .acc-holder').slideUp();
            $this.addClass('active');
            $this.siblings('.acc-holder').slideDown();
        }
    })
}