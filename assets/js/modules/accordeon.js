export function accordeon() {
	let accordeon = $('.accordeon');
	accordeon.on('click', '.title', function () {
		let $this = $(this);
		if ($this.next('.acc-holder').length) {
			if ($this.hasClass('active')) {
				$this.removeClass('active');
				$this.siblings('.acc-holder').slideUp();
			} else {
				$('.accordeon .title').removeClass('active');
				$('.accordeon .acc-holder').slideUp();
				$this.addClass('active');
				$this.siblings('.acc-holder').slideDown();
			}
		}
		if ($this.parents('.sidebar')) {
			$('body, html').animate({
				scrollTop: 0
			}, 800);
		}
	});
}