
(function Component (id) {// @lock
	"use strict";
// Add the code that needs to be shared between components here

function constructor (id) {
	var $comp = this;
		this.name = 'inventoryAddItem';
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'inventoryAddItem';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	//component API
			//=================================================================================================
	var cs = $comp.sources,
		cw = $comp.widgets,
		addSKU = cw.textField1,
		addDescription = cw.textField2,
		addQuantity = cw.textField3,
		submitBtn = cw.imageButton1,
		cancelBtn = cw.imageButton2,
		resultText = cw.richText2,
		$resultText = $("#" + resultText.id);

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock
			 
			function verifySKU(addSKU){
			
				sources.inventory.query("SKU == :1", addSKU,{
			
					onSuccess: function(event){
						addDescription = sources.inventory.name;
					}	
				});
			
			}
			
			
			function submitItem() {
				var email;

				email = emailFld.getValue();

				cs.web_Access.wak_getWebuserPassword({
					arguments: [email],
					onSuccess: function(event) {
				
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
	// eventHandlers// @lock
	
	addSKU.addListener("change", function(){
	
		verifySKU(addSKU);
	});
	
	
	submitBtn.addListener("click", function() {
				submitItem();
			});

			cancelBtn.addListener("click", function() {
				close();
			});

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
