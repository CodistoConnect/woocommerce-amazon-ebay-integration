(function() {

	document.addEventListener("DOMContentLoaded", function() {

		const templateBody = document.querySelectorAll("BODY.codisto-templates");
		if(templateBody.length) {

			document.querySelectorAll(".new-template").forEach(function(el) {

				el.addEventListener("click", function(e) {

					document.location.search = "page=codisto-templates&file=_new";

				});

			});

			document.querySelectorAll("#filename").forEach(function(el) {

				el.focus();

			});

		}

	});

})();

(function() {

	const checkButton = function() {

		const email = document.querySelector("#codisto-form input[name=email]").value;
		const emailconfirm = document.querySelector("#codisto-form input[name=emailconfirm]").value;
		if (email && emailconfirm
			&& (email == emailconfirm)) {
			document.querySelector("#codisto-form .next BUTTON").classList.add("button-primary");
		} else {
			document.querySelector("#codisto-form .next BUTTON").classList.remove("button-primary");
		}

	};

	document.addEventListener("DOMContentLoaded", function() {

		const codistoForm = document.querySelector("#codisto-form");

		if(codistoForm) {

			var xhttp = new XMLHttpRequest();

			document.querySelector("#create-account-modal .selection").style.opacity = 0.1;

			function jsonp(url, callback) {
				var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
				window[callbackName] = function(data) {
					delete window[callbackName];
					document.body.removeChild(script);
					callback(data);
				};

				var script = document.createElement('script');
				script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
				document.body.appendChild(script);
			}

			jsonp("https://ui.codisto.com/getcountrylist", function(data) {
				document.querySelector(".select-html-wrapper").innerHTML = data;
				document.querySelector("#create-account-modal .selection").style.opacity = 1;
			});

			codistoForm.addEventListener("change", checkButton);
			codistoForm.addEventListener("keyup", checkButton);
			codistoForm.addEventListener("submit", function(e) {

				const email = codistoForm.querySelector("INPUT[name=email]").value;
				const emailConfirm = codistoForm.querySelector("INPUT[name=emailconfirm]").value;
				if (email != emailConfirm) {
					e.stopPropagation();
					e.preventDefault();
					document.querySelector(".error-message").style.display = "block";
				} else {
					document.querySelector(".error-message").style.display = "none";
				}

			});

		}

	});

})();
