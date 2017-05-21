"use strict";

var Select = (function() {
	var create = function(select) {
		var header = markupHeader(select.getAttribute("placeholder"));
		var drop = markupDrop();

		select.querySelectorAll("option").forEach(function(option, index) {
			var item = markupOption(option, index);
			drop.appendChild(item);
		});

		// Insert markup into the DOM.
		select.insertAdjacentElement("afterend", header);
		header.insertAdjacentElement("afterend", drop);
	};

	var markupHeader = function(text) {
		var header = document.createElement("div");
		header.innerHTML = text;
		return header;
	};

	var markupDrop = function() {
		var drop = document.createElement("ul");
		return drop;
	};

	var markupOption = function(option, index) {
		var li = document.createElement("li");

		var label = document.createElement("label");
		li.appendChild(label);

		var input = document.createElement("input");
		label.appendChild(input);
		input.checked = option.selected;
		input.setAttribute("type", "checkbox");
		input.setAttribute("data-index", index + 1);
		input.addEventListener("change", updateOption);

		var text = document.createTextNode(option.innerText);
		label.appendChild(text);

		return li;
	};

	var updateOption = function(event) {
		var option = select.querySelector("option:nth-child(" + event.target.getAttribute("data-index") + ")");
		option.selected = event.target.checked;
		if (event.target.checked) {
			option.setAttribute("selected", "");
		} else {
			option.removeAttribute("selected");
		}
	};

	return {
		"create": create
	};
})();

var select = document.querySelector("select");
Select.create(select);
