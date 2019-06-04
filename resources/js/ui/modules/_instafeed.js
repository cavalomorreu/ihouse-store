/**
 * Instafeed
 * https://github.com/stevenschobert/instafeed.js
 * require("instafeed.js/instafeed.js");
 */
$(document).ready(function () {
	if ($("#instafeed").length > 0) {

		let _userId = 219827761,
				_accessToken = '219827761.f5b9b62.33d49f8bdf5f415a93e1c99d422ea592';

		require(["instafeed.js/instafeed.js"], function (Instafeed) {
			var feed = new Instafeed({
				get: 'user',
				userId: _userId,
				accessToken: _accessToken,
				resolution: "standard_resolution",
				template: '<div class="ui card"><div class="image"><a class="ui reveal image fluid display-flex align-items-end" href="{{link}}" target="_blank"><img class="insta-image" src="{{image}}" /></a></div></div>',
				after: function () {
					setTimeout(function () {

						customizeInstaCard();

						window.addEventListener('orientationchange', function () {
							setTimeout(function () {
								customizeInstaCard();
							}, 1000);
						});

						var $sliderCard = jQuery("#instafeed .card"),
								$slider = jQuery("#instafeed"),
								$slidesToShowMax = 5,
								$slidesToShowMin = 1,
								$slidesToShowDefault = $slidesToShowMax,
								$breakpointMin = 1025;

						if ($sliderCard.length > $slidesToShowMin) {
							if ($sliderCard.length < $slidesToShowMax) {
								if (screen.width > $breakpointMin) {
									$slidesToShowDefault = $sliderCard.length;
									$widthCards = ($(this).innerWidth() / $slidesToShowMax) * $slidesToShowDefault;
									$(this).css({ "max-width": $widthCards, "margin-left": "auto", "margin-right": "auto" });
								}
							}
							var settings = {
								prevArrow: '<a class="slick-prev ui mini button basic black icon"><i class="chevron left icon"></i></a>',
								nextArrow: '<a class="slick-next ui mini button basic black icon"><i class="chevron right icon"></i></a>',
								dots: false,
								slidesToShow: $slidesToShowDefault,
								accessibility: false,
								responsive: [
									{
										breakpoint: 1201,
										settings: {
											slidesToShow: 4
										}
									},
									{
										breakpoint: 935,
										settings: {
											slidesToShow: 3
										}
									},
									{
										breakpoint: 724,
										settings: {
											slidesToShow: 2
										}
									},
									{
										breakpoint: 480,
										settings: {
											slidesToShow: 1
										}
									}
								]
							};
							$slider.slick(settings);
						}
					}, 500);
				}
			});

			window.onload = function () {
				setTimeout(function () {
					feed.run();
				}, 100);
			}
		});
	}
});

function customizeInstaCard() {
	let fewerHeight = 0;
	$("#instafeed .card").each(function () {
		if (fewerHeight > $(this).find(".insta-image").height() || fewerHeight === 0) {
			fewerHeight = $(this).find(".insta-image").height();
		}
	});

	$("#instafeed .card .ui.reveal.image").css({
		"height": fewerHeight + "px",
		"overflow": "hidden"
	});
}