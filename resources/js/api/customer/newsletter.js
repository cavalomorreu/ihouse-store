import {_alert, _confirm} from "../../functions/message";

export function RegisterNews(_email) {
	$.ajax({
		url: '/Customer/RegisterNewsletter/',
		type: 'GET',
		data: {
			email: _email.val()
		},
		dataType: 'json',
		success: function (response) {
			if (response.Success === true) {
				swal({
					text: response.Message,
					type: response.type,
					showCancelButton: false,
					confirmButtonColor: '#000',
					cancelButtonColor: '#d33',
					confirmButtonText: 'OK'
				}).then(function () {
					$("#email_news").val("");
					if($("#_popUpStart").is(":visible")) {
						$("#_popUpStart").fadeOut();
					}
				});
			}
			else {
				swal({
					text: response.Message,
					type: response.type,
					showCancelButton: false,
					confirmButtonColor: '#000',
					cancelButtonColor: '#d33',
					confirmButtonText: 'OK'
				}).then(function () {

				});
			}
		},
		error: function (request, error) {
			//console.log("Erro ao realizar cadastro de news letter");
		}
	});
}

$(document).ready(function () {
	$(document).on("click", "#btn_news", function (event) {
		let _email = $("#email_news");
		RegisterNews(_email);
	});
});