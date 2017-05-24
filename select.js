/* global ClassName */
/* exported Select */

"use strict";

var Select = (function() {
	var create = function(select) {
		var container = markupContainer();
		var arrow = markupArrow();
		var drop = markupDrop();
		var header = markupHeader(drop, arrow, select.getAttribute("placeholder"));
		select.querySelectorAll("option").forEach(function(option, index) {
			var item = markupOption(select, option, index);
			drop.appendChild(item);
		});

		// Insert markup into the DOM.
		select.insertAdjacentElement("afterend", container);
		header.appendChild(arrow);
		container.appendChild(header);
		container.appendChild(drop);

		// Hide the original select.
		ClassName.unique(select, "select-hide");
	};

	var markupContainer = function() {
		var container = document.createElement("div");
		container.setAttribute("class", "select-container");
		return container;
	};

	var markupHeader = function(drop, arrow, text) {
		var header = document.createElement("button");
		header.setAttribute("class", "select-header");
		header.innerHTML = text;
		header.addEventListener("click", function() {
			toggleDrop(drop, arrow);
		});
		toggleDrop(drop, arrow);
		return header;
	};

	var markupArrow = function() {
		var arrow = document.createElement("span");
		arrow.setAttribute("class", "select-arrow");
		return arrow;
	};

	var markupDrop = function() {
		var drop = document.createElement("ul");
		drop.setAttribute("class", "select-drop");
		return drop;
	};

	var markupOption = function(select, option, index) {
		var li = document.createElement("li");

		var label = document.createElement("label");
		li.appendChild(label);

		var input = document.createElement("input");
		label.appendChild(input);
		input.checked = option.selected;
		input.setAttribute("type", "checkbox");
		input.setAttribute("data-index", index + 1);
		input.addEventListener("change", function(event) {
			updateOption(select, event.target);
		});

		var text = document.createTextNode(option.innerText);
		label.appendChild(text);

		return li;
	};

	var toggleDrop = function(drop, arrow) {
		if (ClassName.has(drop, "select-hide")) {
			ClassName.remove(drop, "select-hide");
			arrow.innerHTML = "&#9652;";
		} else {
			ClassName.append(drop, "select-hide");
			arrow.innerHTML = "&#9662;";
		}
	};

	var updateOption = function(select, checkbox) {
		var option = select.querySelector("option:nth-child(" + checkbox.getAttribute("data-index") + ")");
		option.selected = checkbox.checked;
		if (checkbox.checked) {
			option.setAttribute("selected", "");
		} else {
			option.removeAttribute("selected");
		}
		select.dispatchEvent(new Event("change"));
	};

	return {
		"create": create
	};
})();
