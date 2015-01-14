
(function Component (id) {// @lock
	"use strict";
// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'view1';
	// @endregion// @endlock

	this.load = function (data) {// @lock

		//component API
		//=================================================================================================
		
		var cs = $comp.sources,
			cw = $comp.widgets,
			printerGrid = cw.dataGrid1,
			contractAddressFld = cw.textField10;
			
		function displayContractDetail(contractID) {
			
			var contractID,
				companyID;
		
			contractID = sources.contractArr.ContractID;
			sources.contracts.query("ContractID == :1", contractID,{
			
				onError: function(event){
				
				},
				
				onSuccess: function () {
		
					companyID = sources.contracts.ShipID;
					cs.addresses.query("CompanyID == :1", companyID, {
						onSuccess: function(){

							sources.equipment_Encounters.wak_getContractPrintersArr({
			   					arguments: [contractID],
			   					onSuccess: function(event) {
			 						equipmentArr = JSON.parse(event.result);
				   					sources.equipmentArr.sync();
				   	
				   
			   }
		   });
							cs.addresses.wak_getAddressCompany({
								arguments: [companyID],
								onSuccess: function(event) {
								contractAddressFld.setValue(event.result);
									}
							});

						}
					});
				}

			});
		};
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock
	displayContractDetail(data.userData.contractID);
	
	
	
	//public API
	//=================================================================================================
	this.displayContractDetail = displayContractDetail;

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
