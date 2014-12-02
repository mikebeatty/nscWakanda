
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'view3';
	// @endregion// @endlock



	this.load = function (data) {// @lock
		
		var cs = $comp.sources,
				cw = $comp.widgets;
//				repairAddressFld = cw.textField7,
//				repairByFld = cw.textField6,
//				$repairByFld = $("#" + repairByFld.id),
//				firstPrinterFld = cw.textField2,
//				additionalPrinterFld = cw.textField3,
//				finalBidFld = cw.rmaOnsiteTotalBid,
//				saveBtn = cw.button1,
//				cancelBtn = cw.button2;


	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock
function displayRepairDetail() {
				var vCompanyID;

				//var vCompanyID = '33430';
				cs.rMA_Onsite_Bid1.query("RMA_ID == :1", sources.rMA.RMA_ID, {
					onSuccess: function () {
		
						$repairByFld.timepicker("setTime", cs.rMA_Onsite_Bid1.RepairBy);
						updateFinalBid();
					}
				});

				vCompanyID = sources.rMA.CompanyID;
				//console.log(vCompanyID);
				cs.addresses.query("CompanyID == :1", vCompanyID, {
					onSuccess: function(){
						var vRepairAddress;

						console.log(vCompanyID);
						console.log($comp.sources.addresses.CompanyID);
						console.log($comp.sources.addresses.CompanyName);
						vRepairAddress = 'test2';
						repairAddressFld.setValue(vRepairAddress);
					}
				});
				
				sources.equipment_Encounters.wak_getEquipmentArr({
			
					arguments: [sources.rMA.RMA_ID],
					onSuccess: function(event) {
					//debugger;
					equipmentArr = JSON.parse(event.result);
				sources.equipmentArr.sync();
	}
});
			}
	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
