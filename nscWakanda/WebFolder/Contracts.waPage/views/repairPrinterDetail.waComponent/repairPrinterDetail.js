﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'repairPrinterDetail';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock
	var cs = $comp.sources,
		cw = $comp.widgets,
		repairMake = cw.textField1,
		repairModel = cw.textField2,
		repairSerial = cw.textField3,
		repairReference = cw.textField4,
		repairProblem = cw.textField5,
		repairSolution = cw.textField6;
		
		
		function displayRepairPrinterDetail(eeuuid){
//			var eeuuid = sources.repairPrinterArr.EEUUID;
			
			sources.equipment_Encounters.query("Equipment_EncountersUUID == :1",eeuuid,{
				
				onSuccess:function(event){
		
				repairReference = sources.equipment_Encounters.ThirdPartyID;
				repairProblem = sources.equipment_Encounters.Notes_Problem;
				repairSolution = sources.equipment_Encounters.Notes_Resolution;
				
				
				}
			
			
			
			});
		
		
		};
		

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock
	//public API
			//=================================================================================================
		this.displayRepairPrinterDetail = displayRepairPrinterDetail;
	};// @lock


}// @startlock
return constructor;
})();// @endlock
