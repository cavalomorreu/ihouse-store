$(document).ready(function () {
	$('input[type="text"], input[type="password"]').focusin(function () {
		if ($(this).attr("placeholder") !== "")
			$(this).attr("data-placeholder", $(this).attr("placeholder")).removeAttr("placeholder");
	});

	$('input[type="text"], input[type="password"]').focusout(function () {
		if ($(this).attr("data-placeholder") !== "")
			$(this).attr("placeholder", $(this).attr("data-placeholder")).removeAttr("data-placeholder");
	})
});