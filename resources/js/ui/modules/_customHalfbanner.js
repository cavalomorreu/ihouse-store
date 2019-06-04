import { isMobile } from '../../functions/mobile';

$(document).ready(function () {
	synchronizeElements(1000);
});

if (!isMobile()) {
	$(window).resize(function () {
		synchronizeElements(2000);
	});
} else {
	window.addEventListener('orientationchange', function () {
		synchronizeElements(1000);
	});
}

function synchronizeElements(timeout) {
	setTimeout(function () {
		$(".custom-banners-link").each(function () {
			$(this).removeAttr("style").css({ "height": $(this).find("img").outerHeight()});
		});
	}, timeout);
}