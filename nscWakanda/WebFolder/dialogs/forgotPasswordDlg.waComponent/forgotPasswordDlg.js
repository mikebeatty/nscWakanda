/**
 * @fileOverview Web Component: forgotPasswordDlg
 * @author Welsh Harris
 * @created 12/05/2014
 */

/*global Wap:false */

//noinspection JSUnusedLocalSymbols
(function Component (id) {
	"use strict";
	//noinspection JSUnusedLocalSymbols
	function constructor (id) {
		var $comp = this;
		this.name = 'forgotPasswordDlg';
		//noinspection JSUnusedLocalSymbols
		this.load = function (data) {

			//component API
			//=================================================================================================
			var cs = $comp.sources,
				cw = $comp.widgets,
				emailFld = cw.textField1,
				submitBtn = cw.imageButton1,
				cancelBtn = cw.imageButton2,
				resultText = cw.richText2,
				$resultText = $("#" + resultText.id);

			/**
			 * Submit the email to 4D and find out if the email was valid or not, if so close the dialog,
			 * if not just display an error message
			 */
			function submitEmail() {
				var email;

				email = emailFld.getValue();

				cs.web_Access.wak_getWebuserPassword({
					arguments: [email],
					onSuccess: function(event) {
						debugger;
						var success = event.result.success,
							message = event.result.message;

						resultText.setValue(message);
						resultText.hide();
						$resultText.fadeIn("slow");

						if (success) {
							_.delay(close, 5000);  //wait 2 seconds and close`moved to 5 - Mike
						}
					},
					onError: function () {
						alert("sorry, there was an unexpected error"); //todo swh: install client side error handler
					}
				});
			}

			/**
			 * Close the dialog
			 */
			function close() {
				$("#" + $comp.id).css("z-index", "-1"); //need this or wak will leave it invisible, but on top of everything
				$$($comp.id).removeComponent();
			}

			//event handlers
			//=================================================================================================

			submitBtn.addListener("click", function() {
				submitEmail();
			});

			cancelBtn.addListener("click", function() {
				close();
			});

			//on load
			//=================================================================================================

			//hide result text
			resultText.hide();

			//public API
			//=================================================================================================

		};
	}
	return constructor;
})();
