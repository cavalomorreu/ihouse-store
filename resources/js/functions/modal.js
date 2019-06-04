
/**
 * Semantic-UI Modal
 * Abre Modal QuickView de produto
 * @param modal
 */
export function openModalQuickView(modal, callback) {
	"use strict";
	callback = typeof callback !== 'undefined' ? callback : null;
	//console.log('Modal ID: ' + modal);
	$('.ui.modal')
			.modal({
				transition: 'fade up',
				onShow: function () {

				},
				onVisible: function () {
					$(".ui.modal .dropdown").dropdown("refresh");
				},
				onVisible: () =>{
					if(typeof callback === "function"){
						callback();
					}
				},
				onHidden: function () {
					//console.log($(this));
					$(this).parent().remove();
					$(this).remove();
				}
			})
			.modal('show');
}


/**
 * Semantic-UI Modal
 * Abre Modal com barra de rolagem
 * @param modal
 */
export function openLongModal(modal) {
	"use strict";
	//console.log('Modal ID: ' + modal);
	$('.longer.modal')
			.modal({
				transition: 'fade up',
				onShow: function () {

				},
				onVisible: function () {
					$(".ui.modal .dropdown").dropdown("refresh");
				},
				onHidden: function () {
					//console.log($(this));
					$(this).parent().remove();
					$(this).remove();
				}
			})
			.modal('show');
}


/**
 * Semantic-UI Modal
 * Abre Modal Default
 * @param el_modal
 */
export function openDefaultModal(el_modal) {
	"use strict";
	if(el_modal.attr("id") === undefined) {
		checkIdToModal(el_modal);
	}
	else {
		el_modal.attr("data-ref-id", el_modal.attr("id"));
		$("#" + el_modal.attr("id"))
			.modal({
				transition: 'fade up',
				onHidden: function () {
					setTimeout(function () {
						removeDuplicateElements("data-ref-id", el_modal.attr("id"));
					}, 250);
				}
			}).modal('show');
	}
}

/**
 * Semantic-UI Modal
 * Abre Modal Customizado
 * @param el_modal
 */
export function openCustomModal(el_modal, settings, data_attr) {
	"use strict";
	if(el_modal.attr("id") === undefined) {
		checkIdToModal(el_modal);
	}
	else {
		el_modal.attr(data_attr, el_modal.attr("id"));
		$("#" + el_modal.attr("id")).modal(settings).modal('show');
	}
}

/**
 * checkIdToModal
 * Garante que o plugin sera chamado a partir de um ID
 * @param el_modal
 */
function checkIdToModal(_element) {
	$("#_idDefaultModal_").attr("id", "");
	_element.attr("id", "_idDefaultModal_");
	openDefaultModal(_element);
}

/**
 * removeDuplicateElements
 * Remove os elementos duplicados que o plugin gera
 * @param data_ref, data_ref_value
 */
function removeDuplicateElements(data_ref, data_ref_value) {
	$("[" + data_ref + " = '" + data_ref_value + "']").not(':last').remove();
}