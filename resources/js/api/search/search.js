$.fn.search.settings.templates.message = function (message, type) {
	var html = "";
	if (message !== undefined && type !== undefined) {
		html += `<div class="message ${type}">`
			;
		// message type
		if (type === 'empty') {
			html += `<div class="header">Sem Resultados Encontrados</div class="header">
                        <div class="description">${message}</div class="description">`;
		}
		else {
			html += `<div class="description">${message}</div>`;
		}
		html += "</div>";
	}
	return html;
};
$.fn.search.settings.templates.autoComplete = function (response, fields) {
	var html = '';
	if (response[fields.results] !== undefined) {
		$.each(response[fields.results], function (index, result) {
			if (result[fields.url]) {
				html += `<a class="result" href="${result[fields.url]}">`;
			}
			else {
				html += `<a class="result">`;
			}
			html += `<div class="contents">`;
			if (result[fields.image] !== undefined) {
				html += `<div class="imagem">
                            <img src="${result[fields.image]}" onerror="imgError(this)">
                        </div>`;
			}
			html += `<div class="content text left">`;
			if (result[fields.price] !== undefined) {
				html += `<div class="price">${result[fields.price]}</div>`;
			}
			if (result[fields.title] !== undefined) {
				html += `<div class="title">${result[fields.title]}</div>`;
			}
			if (result[fields.description] !== undefined) {
				html += `<div class="description">${result[fields.description]}</div>`;
			}
			html += `</div>
                    </div>
                    </a>`;
		});

		if (response[fields.action]) {
			html += `<a href="${response[fields.action][fields.actionURL]}" class="action">
                            ${response[fields.action][fields.actionText]}
                     </a>`;
		}
		return html;
	}
	return false;
};

$(document).on("keyup", ".prompt", function (e) {
	let goToSearch = $(this).val().length >= 3 ? true : false;
	if (e.which === 13) {
		if (goToSearch)
			location.href = `/busca?n=${$(".prompt").val()}`;
		else
			alert("Digite ao menos 3 caracteres para efetuar a busca")
	}
	if ($(this).val() !== "") {
		if(!$(".searchcolumn .icon").hasClass("remove circle"))
			$(".searchcolumn .icon").addClass("remove circle");
	} else {
		$(".searchcolumn .icon").removeClass("remove circle");
	}
});

$(document).on("keypress", ".busca_lista", function (e) {
	if (e.which === 13) {
		location.href = `/EventList/ManagerProducts?n=${$(".busca_lista").val()}`;
	}
});


$(document).on("click", ".busca_lista_btn", function (e) {
	location.href = `/EventList/ManagerProducts?n=${$(".busca_lista").val()}`;
});



$(document).on("keypress", ".busca_convidado_lista", function (e) {
	if (e.which === 13) {
		location.href = `/EventList/ManagerGuest?n=${$(".busca_convidado_lista").val()}`;
	}
});


$(document).on("click", ".btn_convidado_lista", function (e) {
	location.href = `/EventList/ManagerGuest?n=${$(".busca_convidado_lista").val()}`;
});



$(document).ready(function () {
	$('.ui.search').search({
		type: 'autoComplete',
		minCharacters: 3,
		showNoResults: true,
		apiSettings: {
			beforeSend: function (settings) {
				settings.data.n = $(".prompt").val();
				// Quando for utilizar a busca com metadata separados por "|"
				// settings.data.mdf = 'feature';
				// settings.data.mdv = 'produto';
				return settings;
			},
			action: 'search products',
			onResponse: function (searchResponse) {
				var response = {
					results: [],
					query: this.urlData.query,
					metadatafield: this.urlData.metadatafield,
					metadatavalue: this.urlData.metadatavalue
				};
				$.each(searchResponse.data.Products, function (index, item) {
					var maxResults = 5;
					if (index >= maxResults) {
						response.results.push({
							title: `Exibir todos os resultados`,
							url: `/busca?n=${response.query}&mdf=${response.metadatafield}&mdv=${response.metadatavalue}`
						});

						return false;
					}
					response.results.push({
						title: item.Name,
						url: item.UrlFriendlyCustom != null ? item.UrlFriendlyCustom : item.UrlFriendly,
						image: item.ImageHome,
					});
				});
				return response;
			}
		},
		error: {
			noResults: "O termo buscado não obteve resultados em nossa loja.",
			serverError: "Erro de conexão no servidor"
		}
	});

	$(document).on("click", ".searchcolumn-open", function (e) {
		let position_body = parseInt($(window).scrollTop()) * (-1);
		$("body").css({ "position": "fixed", "left": "0px", "width": "100vw", "margin-top": position_body + "px", "overflow": "hidden" });
		$(".searchcolumn").fadeIn();
		$(".prompt").focus();
	})
		.on("click", ".searchcolumn-close", function () {
			let position_body = parseInt($("body").css("marginTop").split("px")[0]) * (-1);
			$("body").removeAttr("style");
			$("html, body").animate({ scrollTop: position_body }, 1);
			$(".searchcolumn").fadeOut();
		});


});