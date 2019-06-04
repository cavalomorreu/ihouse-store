import {isLoading} from "../api_config";
import {_alert, _confirm} from "../../functions/message";
import {lazyLoad} from "../../functions/lazy_load";

var genericoPageFilter = "";
var idEventListFilter = "";
var viewListGlobal = "g";
var pageSizeGlobal = "24"
var urlBase = "/product/getproducts/";
$(document).ready(function () {
	let filters = window.filterManipulation;
	if($("#GenericPageFilter").length > 0){
		genericoPageFilter = $("#GenericPageFilter").val();
	}

	if(window.pageNumber > 1){
		let data = {
			viewList: filters.viewList === undefined ? viewListGlobal : filters.viewList,
			pageNumber: window.pageNumber === undefined ? "" : window.pageNumber,
			pageSize: filters.pageSize === undefined ? "" : filters.pageSize,
			order: filters.order === undefined ? "" : filters.order,
			brand: filters.brand === undefined ? "" : filters.brand,
			category: filters.category === undefined ? genericoPageFilter : filters.category,
			initialprice: filters.initialprice === undefined ? "" : filters.initialprice,
			finalprice: filters.finalprice === undefined ? "" : filters.finalprice,
			variations: filters.variations === undefined ? "" : filters.variations,
			group: filters.group === undefined ? "" : filters.group,
			keyWord: filters.keyWord === undefined ? "" : filters.keyWord,
			idAttribute: filters.idAttribute === undefined ? "" : filters.idAttribute,
			idEventList: idEventListFilter
		};

		updateAjax(data);
	}

	if($("#idEventListFilter").length > 0){
		idEventListFilter = $("#idEventListFilter").val();
		viewListGlobal = "l";
		urlBase = "/product/GetProductsListEvents/";
	}

	if (window.filterManipulation !== undefined) {
		window.filterManipulation.variationSelected = [];
		window.filterManipulation.labelFilter = [];
		window.filterManipulation.atributeSelected = [];
	}

	/* MOBILE */
	$(".dropdownorder").dropdown({
		onChange: function () {
			isLoading("#list");

			let filters = window.filterManipulation;

			filters.order = $(this).dropdown("get value");

			let data = {
				viewList: filters.viewList === undefined ? viewListGlobal : filters.viewList,
				pageNumber: filters.pageNumber === undefined ? "1" : filters.pageNumber,
				pageSize: pageSizeGlobal,
				order: filters.order === undefined ? "" : filters.order,
				brand: filters.idBrand === undefined ? "" : filters.idBrand,
				category: filters.idCategory === undefined ? genericoPageFilter : filters.idCategory,
				initialprice: filters.initialPrice === undefined ? "" : filters.initialPrice,
				finalprice: filters.finalPrice === undefined ? "" : filters.finalPrice,
				variations: filters.variationSelected.toString(),
				group: filters.idGroup === undefined ? "" : filters.idGroup,
				keyWord: filters.keyWord === undefined ? "" : filters.keyWord,
				idAttribute: filters.atributeSelected.toString(),
				idEventList: idEventListFilter
			};

			updateAjax(data);
		}
	});

	/*DESKTOP */
	$(".listControl .item").on("click", function (){

		isLoading("#list");

		let filters = window.filterManipulation;

		filters.order = $(this).data("value");

		let data = {
			viewList: filters.viewList === undefined ? viewListGlobal : filters.viewList,
			pageNumber: filters.pageNumber === undefined ? "1" : filters.pageNumber,
			pageSize: pageSizeGlobal,
			order: filters.order === undefined ? "" : filters.order,
			brand: filters.idBrand === undefined ? "" : filters.idBrand,
			category: filters.idCategory === undefined ? genericoPageFilter : filters.idCategory,
			initialprice: filters.initialPrice === undefined ? "" : filters.initialPrice,
			finalprice: filters.finalPrice === undefined ? "" : filters.finalPrice,
			variations: filters.variationSelected.toString(),
			group: filters.idGroup === undefined ? "" : filters.idGroup,
			keyWord: filters.keyWord === undefined ? "" : filters.keyWord,
			idAttribute: filters.atributeSelected.toString(),
			idEventList: idEventListFilter
		};

		updateAjax(data);

	});
});

function uiReload() {
	$('.ui.accordion').accordion("refresh");
	$(".ui.dropdown").dropdown("refresh");
	$(".ui.checkbox").checkbox("refresh");

	$(".ui.rating").rating({
		maxRating: 5,
		interactive: false
	});
}

function makeLabel() {
	

	let labelVariation = window.filterManipulation.labelFilter,
			htmlTag = "";

	if(window.filterManipulation.labelFilter.length > 0) {
		htmlTag        = "<a class='ui label basic bold clearFilters'>X  Limpar Filtros</a>";
	}
	
	for (let key in labelVariation) {
		if (labelVariation[key].type === "price") {
			htmlTag += `<a class="ui label filters" data-type="${labelVariation[key].type}" data-id="${labelVariation[key].id}" id="labelPrice">
                            ${labelVariation[key].name}: ${labelVariation[key].value}
                        <i class="icon close close-filter"></i></a>`;
		}
		else {
			htmlTag += `<a class="ui label filters" data-type="${labelVariation[key].type}" data-id="${labelVariation[key].id}" id="labelVariation_${labelVariation[key].id}">
                                ${labelVariation[key].name}: ${labelVariation[key].value}
                            <i id="icon-close-" + ${labelVariation[key].id} class="icon close close-filter"></i></a>`;
		}
	}
	$("#filter>div.ui.labels:first-child").html(htmlTag);


	if(htmlTag.trim() == "") {
		$(".filterColumn").removeClass("ativo")
	}

}

function ValidateLabel(type, id){
	let labelVariation = window.filterManipulation.labelFilter
	for (let key in labelVariation) {
		if (labelVariation[key].type === type && labelVariation[key].id === id) {
			return true
		}
	}
	return false
}

function callAjaxFunction(filterType)
{
	isLoading("#list");
	let filters = window.filterManipulation;

	if (filterType.toLowerCase() === "variation") {
		if (filters.idVariation !== undefined && filters.idVariation !== "") {
			filters.variationSelected.push(filters.idVariation);
		}
	}
	else if (filterType.toLowerCase() === "attribute") {
		if (filters.idAtribute !== undefined && filters.idAtribute !== "") {
			filters.atributeSelected.push(filters.idAtribute);
		}
	}

	let data = {
		viewList: filters.viewList === undefined ? viewListGlobal : filters.viewList,
		pageNumber: "1",
		pageSize: pageSizeGlobal,
		order: filters.order === undefined ? "" : filters.order,
		brand: filters.idBrand === undefined ? "" : filters.idBrand,
		category: filters.idCategory === undefined ? genericoPageFilter : filters.idCategory,
		initialprice: filters.initialPrice === undefined ? "" : filters.initialPrice,
		finalprice: filters.finalPrice === undefined ? "" : filters.finalPrice,
		variations: filters.variationSelected.toString(),
		group: filters.idGroup === undefined ? "" : filters.idGroup,
		keyWord: filters.keyWord === undefined ? "" : filters.keyWord,
		idAttribute: filters.atributeSelected.toString(),
		idEventList: idEventListFilter
	};

	updateAjax(data);
}

function updateAjax(data){
	var idFilterSelected,
			filtered_items,
			data_temp = JSON.stringify(window.filterManipulation.labelFilter);
	data.labelFilter = data_temp;

	filtered_items = JSON.parse(data_temp);

	$.ajax({
		url: urlBase,
		method: "GET",
		dataType: "html",
		data: data,
		success: function (response) {
			$("#list").html(response);

			$.ajax({
				url: "/product/filtermenu/",
				method: "GET",
				data: {
					idEventListFilter : idEventListFilter
				},
				dataType: "html",
				success: function (response) {
					$("#filter").remove();
					$(".filterColumn>.filterBlock").html(response);

					$("#filter .filterSelected").removeClass("filterSelected");
					$(filtered_items).each(function(idx) {
						$("#" + filtered_items[idx].id).addClass("filterSelected");
					});

					if(window.filterManipulation.labelFilter.length === 0) {
						window.filterManipulation.labelFilter = JSON.parse(data_temp);
					}
					uiReload();
					makeLabel();
				}
			});
		},
		onFailure: function onFailure(response) {
			//console.log("Falha aplicar filtro: " + response);
		},
		onError: function onError(response) {
			//console.log("Erro aplicar filtro: " + response);
		}
	});
}

function labelFilter(filters, typeFilter, id){
	for (let key in filters.labelFilter) {
		if (filters.labelFilter[key].id == id) {
			switch(typeFilter) {
				case "default":
					_.pull(filters.variationSelected, id.toString());
				case "atributo":
					_.pull(filters.atributeSelected, id.toString());
			}
			_.pullAt(filters.labelFilter, [key]);
		}
	}

	return filters;
}

$(document).on("click", "#viewgrid", function () {
	isLoading("#list");
	let filters = window.filterManipulation;

	filters.viewList = "g";

	let data = {
		viewList: "g",
		pageNumber: filters.pageNumber === undefined ? "1" : filters.pageNumber,
		pageSize: pageSizeGlobal,
		order: filters.order === undefined ? "" : filters.order,
		brand: filters.idBrand === undefined ? "" : filters.idBrand,
		category: filters.idCategory === undefined ? genericoPageFilter : filters.idCategory,
		initialprice: filters.initialPrice === undefined ? "" : filters.initialPrice,
		finalprice: filters.finalPrice === undefined ? "" : filters.finalPrice,
		variations: filters.variationSelected.toString(),
		group: filters.idGroup === undefined ? "" : filters.idGroup,
		keyWord: filters.keyWord === undefined ? "" : filters.keyWord,
		idAttribute: filters.atributeSelected.toString(),
		idEventList: idEventListFilter
	};

	updateAjax(data);
});

$(document).on("click", "#viewlist", function () {
	isLoading("#list");
	let filters = window.filterManipulation;

	filters.viewList = "l";

	let data = {
		viewList: "l",
		pageNumber: filters.pageNumber === undefined ? "1" : filters.pageNumber,
		pageSize: pageSizeGlobal,
		order: filters.order === undefined ? "" : filters.order,
		brand: filters.idBrand === undefined ? "" : filters.idBrand,
		category: filters.idCategory === undefined ? genericoPageFilter : filters.idCategory,
		initialprice: filters.initialPrice === undefined ? "" : filters.initialPrice,
		finalprice: filters.finalPrice === undefined ? "" : filters.finalPrice,
		variations: filters.variationSelected.toString(),
		group: filters.idGroup === undefined ? "" : filters.idGroup,
		keyWord: filters.keyWord === undefined ? "" : filters.keyWord,
		idAttribute: filters.atributeSelected.toString(),
		idEventList: idEventListFilter
	};

	updateAjax(data);
});

$(document).on("click", ".checkColor", function () {
	if ($(this).prop("id") !== undefined && $(this).prop("id") !== "") {
		window.filterManipulation.variationSelected.push($(this).prop("id"));
	}
	if(!ValidateLabel("color", $(this).prop("id"))){
		window.filterManipulation.labelFilter.push({
			type: "color",
			id: $(this).prop("id"),
			name: $(this).data("reference"),
			value: $(".fields").find("#variation_" + $(this).prop("id")).prop("name")
		});
	}
	//ajaxColor();
	callAjaxFunction("variation");
});

$(document).on("click", ".checkText", function () {
	if(!$(this).hasClass("filterSelected")) {
		if ($(this).prop("id") !== undefined && $(this).prop("id") !== "") {
			window.filterManipulation.variationSelected.push($(this).prop("id"));
		}
		if(!ValidateLabel("text", $(this).prop("id"))){
			window.filterManipulation.labelFilter.push({
				type: "text",
				id: $(this).prop("id"),
				name: $(this).data("reference"),
				value: $(".fields").find("#variation_" + $(this).prop("id")).prop("name")
			});
		}
		//ajaxText();
		callAjaxFunction("variation");
	} else {
		let id = $(this).attr("id"), 
			type = $(".ui.label[data-id = '" + id + "']").data("type");
		updateFilters(id, type);
	}
});

$(document).on("click", ".checkAtribute", function () {
	if(!$(this).hasClass("filterSelected")) {
		if ($(this).prop("id") !== undefined && $(this).prop("id") !== "") {
			window.filterManipulation.atributeSelected.push($(this).prop("id"));
		}
		if(!ValidateLabel("atributo", $(this).prop("id"))){
			window.filterManipulation.labelFilter.push({
				type: "atributo",
				id: $(this).prop("id"),
				name: "atributo",
				value: $(".fields").find("#checkAtribute_" + $(this).prop("id")).prop("name")
			});
		}
		//ajaxAttribute();
		callAjaxFunction("attribute");
	} else {
		let id = $(this).attr("id"), 
			type = $(".ui.label[data-id = '" + id + "']").data("type");
		updateFilters(id, type);
	}
});

$(document).on("change", ".checkCategory", function () {

	if(!$(this).hasClass("filterSelected")) {
		window.filterManipulation.nameCategory = $(this).attr("name");
		window.filterManipulation.idCategory = $(this).attr("id");
		if(!ValidateLabel("category", $(this).prop("id"))){
			window.filterManipulation.labelFilter.push({
				type: "category",
				id: window.filterManipulation.idCategory,
				name: "Categorias",
				value: window.filterManipulation.nameCategory
			});
		}
		//ajaxCategory();
		callAjaxFunction("other");
	} else {
		let id = $(this).attr("id"), 
			type = $(".ui.label[data-id = '" + id + "']").data("type");
		updateFilters(id, type);
	}
});

$(document).on("change", ".checkBrand", function () {

	if(!$(this).hasClass("filterSelected")) {
		window.filterManipulation.nameBrand = $(this).attr("data-name");
		window.filterManipulation.idBrand = $(this).attr("id");
		if(!ValidateLabel("brand", $(this).prop("id"))){
			window.filterManipulation.labelFilter.push({
				type: "brand",
				id: window.filterManipulation.idBrand,
				name: "Marcas",
				value: window.filterManipulation.nameBrand
			});
		}
		//ajaxBrand();
		callAjaxFunction("other");
	} else {
		let id = $(this).attr("id"), 
			type = $(".ui.label[data-id = '" + id + "']").data("type");
		updateFilters(id, type);
	}
});

$(document).on("change", ".checkPrice", function () {

	if(!$(this).hasClass("filterSelected")) {

		window.filterManipulation.initialPrice = $(this).data("min");
		window.filterManipulation.finalPrice = $(this).data("max");


		if (window.filterManipulation.initialprice === "" || window.filterManipulation.finalPrice === "") {
			_alert("Atenção", "Informe preço mínimo e preço máximo!", "warning");

			return;
		}

		// -- Evita que 2 filtros sejam selecionados
		let _data_temp = JSON.stringify(window.filterManipulation.labelFilter),
				_filtered_items = JSON.parse(_data_temp);
		$(_filtered_items).each(function(idx) {
			if(_filtered_items[idx].type == "price") {
				_filtered_items.splice(idx, 1);
			}
		});
		window.filterManipulation.labelFilter = _filtered_items;
		// -- Evita que 2 filtros sejam selecionados - FIM


		if(!ValidateLabel("price", $(this).prop("id"))){
			window.filterManipulation.labelFilter.push({
				type: "price",
				id: $(this).prop("id"),
				name: "Preço",
				value: `${window.filterManipulation.initialPrice} a ${window.filterManipulation.finalPrice}`
			});

		}

		//ajaxPrice();
		callAjaxFunction("other");

	} else {

		window.filterManipulation.initialPrice = "";
		window.filterManipulation.finalPrice = "";

		let id = $(this).attr("id");
		updateFilters(id, "other");
	}
});

$(document).on("click", ".pricefilter", function () {
	window.filterManipulation.initialPrice = $("#initialPrice").val().replace(".","").replace(",", ".");
	window.filterManipulation.finalPrice = $("#finalPrice").val().replace(".","").replace(",", ".");

	if (window.filterManipulation.initialprice === "" || window.filterManipulation.finalPrice === "") {
		_alert("Atenção", "Informe preço mínimo e preço máximo!", "warning");

		return;
	}

	if(!ValidateLabel("price", $(this).prop("id"))){
		window.filterManipulation.labelFilter.push({
			type: "price",
			id: "",
			name: "Preço",
			value: `${window.filterManipulation.initialPrice} a ${window.filterManipulation.finalPrice}`
		});
	}

	//ajaxPrice();
	callAjaxFunction("other");
})

$(document).on("click", ".ui.label.filters", function () {
	let type = $(this).data("type");
	let id = $(this).data("id");
	let filterType = "";

	updateFilters(id, type);

});

$(document).on("click", ".clearFilters", function () {
	$(".ui.label.filters").each(function() {
		let type = $(this).data("type");
		let id = $(this).data("id");
		updateFilters(id, type, false);
	});
	

	let filters = window.filterManipulation;

	let data = {
		viewList: filters.viewList === undefined ? viewListGlobal : filters.viewList,
		pageNumber: "1",
		pageSize: pageSizeGlobal,
		order: filters.order === undefined ? "" : filters.order,
		brand: filters.idBrand === undefined ? "" : filters.idBrand,
		category: filters.idCategory === undefined ? genericoPageFilter : filters.idCategory,
		initialprice: filters.initialPrice === undefined ? "" : filters.initialPrice,
		finalprice: filters.finalPrice === undefined ? "" : filters.finalPrice,
		variations: filters.variationSelected.toString(),
		group: filters.idGroup === undefined ? "" : filters.idGroup,
		keyWord: filters.keyWord === undefined ? "" : filters.keyWord,
		idAttribute: filters.atributeSelected.toString(),
		idEventList: idEventListFilter
	};


	setTimeout(function () {
		updateAjax(data);
		$(this).remove();
	}, 350);



	/*
	let data = {
		viewList: window.filterManipulation.viewList === undefined ? viewListGlobal : window.filterManipulation.viewList,
		pageNumber: "1",
		pageSize: pageSizeGlobal,
		order: "",
		brand: "",
		category: "",
		initialprice: "",
		finalprice: "",
		variations: "",
		group: "",
		keyWord: "",
		idAttribute: "",
		idEventList: idEventListFilter
	};
	*/

});

$(document).on("keyup", ".filterListEventsProducts", function(event){
	var wordCurrent = event.target.value;
	var totalCaracteres = wordCurrent.length;
	wordCurrent = totalCaracteres > 2 ? wordCurrent : "";

	if(totalCaracteres > 2){
		isLoading("#list");
	}

	let data = {
		viewList: viewListGlobal,
		pageNumber: "1",
		pageSize: pageSizeGlobal,
		order: "",
		brand: "",
		category: "",
		initialprice: "",
		finalprice: "",
		variations: "",
		group: "",
		keyWord: wordCurrent,
		idAttribute: "",
		idEventList: idEventListFilter
	};

	updateAjax(data);
});


function updateFilters(id, type, call = true) {

	let filters = window.filterManipulation,
			filterType = "";

	if (type == "brand") {
		filters.idBrand = "";
		filters = labelFilter(filters, "brand", id);
		filterType = "other";
		//ajaxBrand();
	}
	else if (type == "category") {
		filters.idCategory = genericoPageFilter;
		filters = labelFilter(filters, "category", id);
		filterType = "other";
		//ajaxPrice();
	}
	else if (type == "price")
	{
		filters.initialPrice = "";
		filters.finalPrice = "";
		filters = labelFilter(filters, "price", id);
		filterType = "other";
		//ajaxCategory();
	}
	else if (type == "atributo")
	{
		filters.idAtribute = "";
		filters = labelFilter(filters, "atributo", id);
		filterType = "attribute";
		//ajaxAttribute();
	}
	else {
		filters.idVariation = "";
		filters = labelFilter(filters, "default", id);
		filterType = "variation";
		//ajaxColor();
	}

	if(call) {
		callAjaxFunction(filterType);
		makeLabel();
	}

}

$(document).on("keyup", ".filterListEventsProducts", function(event){
	var wordCurrent = event.target.value;
	var totalCaracteres = wordCurrent.length;
	wordCurrent = totalCaracteres > 2 ? wordCurrent : "";

	if(totalCaracteres > 2){
		isLoading("#list");
	}

	let data = {
		viewList: viewListGlobal,
		pageNumber: "1",
		pageSize: "12",
		order: "",
		brand: "",
		category: "",
		initialprice: "",
		finalprice: "",
		variations: "",
		group: "",
		keyWord: wordCurrent,
		idAttribute: "",
		idEventList: idEventListFilter
	};

	updateAjax(data);
});