
(function Component (id) {// @lock
	"use strict";
// Add the code that needs to be shared between components here

function constructor (id) {
	var $comp = this;
	this.name = 'view1';
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'view1';
	// @endregion// @endlock

	this.load = function (data) {// @lock

		//component API
		//=================================================================================================
		
		var cs = $comp.sources,
			cw = $comp.widgets,
			contractAddressFld = cw.textField10;
			
		function displayContractDetail(contractID) {
			
			sources.contracts.query("contractID == :1", contractID);
			
			cs.addresses.query("CompanyID == :1", vCompanyID, {
							onSuccess: function(){
								var vRepairAddress;

								cs.addresses.wak_getAddressCompany({
									arguments: [vCompanyID],
									onSuccess: function(event) {
									contractAddressFld.setValue(event.result);
									}
								});
//								repairAddressFld.setValue(vRepairAddress);
							}
						});

//			sources.equipment_Encounters.wak_getEquipmentArr({
//				arguments: [rmaid],
//				onSuccess: function(event) {
//					equipmentArr = JSON.parse(event.result);
//					sources.equipmentArr.sync();

//					displayPartsDetail(sources.equipmentArr.EquipmentID);
////						repairContractRateField.setValue("FR: EX: RN:");
//				sources.rMA_Onsite_Bid.query("RMA_ID == :1", rmaid);
//				var contractRate = "FR:"+sources.rMA_Onsite_Bid.FirstPrinterRate+" EX:"+sources.rMA_Onsite_Bid.AdditonalPrinterRate+" RN:"+sources.rMA_Onsite_Bid.ReturnRate;
//				
//					repairContractRateField.setValue(contractRate);
						
					
//						repairContractRateField.disable();
//						transactionNotes.disable();
//				}
			
//			});
		}
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock
	displayContractDetail(data.userData.contractID);

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
