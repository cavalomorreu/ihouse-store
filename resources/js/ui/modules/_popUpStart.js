import { RegisterNews } from '../../api/customer/newsletter';

$(document).ready(function () {
	checkStorage();
	$("#btn_popUp").click(function() {
		$("#_popUpMsg").hide();
		let _email = $("#input_popUp");
		if(_email.val() !== "") {
			RegisterNews(_email);
		} else {
			$("#_popUpMsg").fadeIn();
			$("#input_popUp").focus();
			setTimeout(function() {
				$("#_popUpMsg").fadeOut();
			}, 5000);
		}
	});
	$("#_popUpClose").click(function() {
		closePopUp();
	});
});

function checkStorage() {
	if(sessionStorage.getItem("popUpStart") == "" || sessionStorage.getItem("popUpStart") == null)
		openPopUp();
}

function openPopUp() {
	$("#_popUpStart").css("display", "flex");
	sessionStorage.setItem("popUpStart", "opened");
}

function closePopUp() {
	$("#_popUpStart").fadeOut();
}