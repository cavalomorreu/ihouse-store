$(function () {
	Slideshow($(".slideshow"));
});

export function Slideshow(elements) {
	elements.each(function () {
		if ($(this).closest(".no-slideshow").length == 0) {
			var $sliderCard = jQuery(".card", this).length > 0 ? jQuery(".card", this) : jQuery(".slideshow-item", this),
				$slider = jQuery(this),
				$slidesToShow = ($(this).data("qtd") != null || $(this).data("qtd") != undefined) ? $(this).data("qtd") : 5,
				$firstBreakpoint = 1319,
				$arrows = ($(this).data("arrow") != null ? $(this).data("arrow") : true),
				$dots = ($(this).data("dots") != null ? $(this).data("dots") : false),
				$auto = ($(this).data("auto") != null ? true : false);

			if ($sliderCard.length > 1) {
				if ($sliderCard.length < $slidesToShow) {
					if (screen.width > $firstBreakpoint) {
						if (jQuery(".card", this).length > 0) {
							$(this).attr("data-slides-init", $slidesToShow);
							$(this).attr("data-slides", $sliderCard.length);
						} else {
							$widthCards = ($(this).innerWidth() / $slidesToShow) * $sliderCard.length;
							$(this).css({ "max-width": $widthCards, "margin-left": "auto", "margin-right": "auto" });
						}
						$slidesToShow = $sliderCard.length;
					}
				}
			}

			if ($sliderCard.length > 1 || $(this).data("qtd") == 1) {
				var settings = {
					prevArrow: '<a class="slick-prev ui mini button basic black icon"><i class="chevron left icon"></i></a>',
					nextArrow: '<a class="slick-next ui mini button basic black icon"><i class="chevron right icon"></i></a>',
					arrows: $arrows,
					dots: $dots,
					slidesToShow: $slidesToShow,
					accessibility: false,
					autoplay: $auto,
					autoplaySpeed: 6000,
					infinite: false,
					responsive: [
						{
							breakpoint: $firstBreakpoint,
							settings: {
								slidesToShow: $slidesToShow > 4 ? 4 : $slidesToShow
							}
						},
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: $slidesToShow > 3 ? 3 : $slidesToShow
							}
						},
						{
							breakpoint: 724,
							settings: {
								slidesToShow: $slidesToShow == 1 ? 1 : 2
							}
						},
						{
							breakpoint: 568,
							settings: {
								slidesToShow: 1
							}
						}
					]
				};

				$slider.slick(settings);
			}
		}
	});
}