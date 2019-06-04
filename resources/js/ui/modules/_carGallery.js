import { isMobile } from '../../functions/mobile';

$(document).ready(function ($) {
	if($(".imagensProduto").length > 0) {
		let auxiliaryClass = isMobile() ? "viewMobile" : "viewDesktop";
		$(".imagensProduto").addClass(auxiliaryClass)
	}
	if ($('.car-gallery').length > 0)
		slickGallery();
});

function checkImagesSize(imageQuantity) {
	var images = $(".car-gallery .ui.image").length;
	if (images >= imageQuantity) {
		return imageQuantity;
	} else {
		return images;
	}
}

/* 
 * Function exported 
*/
export function destroyCarousel() {
	$('.car-gallery').slick('destroy');
}

/* 
 * Function exported 
*/
export function slickGallery() {
	let _vertical = isMobile() ? false : true,
		_prevArrow = isMobile() ? "" : "<a class='slick-prev ui icon'><i class='chevron up icon'></i></a>",
		_nextArrow = isMobile() ? "" : "<a class='slick-prev ui icon'><i class='chevron down icon'></i></a>",
			_dots = !_vertical;
	
	$('.car-gallery').slick({
		prevArrow: _prevArrow,
		nextArrow: _nextArrow,
		vertical: _vertical,
		dots: _dots,
		slidesToShow: 3,
		mobileFirst: true,
		useTransform: false
	});
}