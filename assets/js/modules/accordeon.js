export function accordeon() {
	let accordeon = $('.accordeon');
	accordeon.on('click', '.title', function () {
		let $this = $(this);
		if ($this.hasClass('active')) {
			$this.removeClass('active');
			$this.siblings('.acc-holder').slideUp();
		} else {
			$('.accordeon .title').removeClass('active');
			$('.accordeon .acc-holder').slideUp();
			if ($this.next('.acc-holder').length) {
				$this.addClass('active');
				$this.siblings('.acc-holder').slideDown();
			}
		}
	});
	$('.anchor-list .title, .anchor-list  a').on('click', function () {
		let targetAttr = $(this).data('anchor');
		if (targetAttr !== undefined) {
			$('.developers-portal').find('h2').each(function () {
				if ($(this).data('anchor') === targetAttr) {
					let translate = 10;
					if (!$(this).hasClass('animate') && window.innerWidth > 1024) {
						translate = 110;
					}
					$('body, html').animate({
						scrollTop: $(this).offset().top - translate
					}, 800);
				}
			});
			return false;
		}
	});

}
