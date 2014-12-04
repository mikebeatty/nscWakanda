/**
 * @fileOverview Web Component: view3
 * @author Welsh Harris
 * @created 12/02/2014
 */

/*global Wap:false, equipmentArr:true */

//noinspection JSUnusedLocalSymbols
(function Component (id) {
	"use strict";
	//noinspection JSUnusedLocalSymbols
	function constructor (id) {
		var $comp = this;
		this.name = 'view3';
		//noinspection JSUnusedLocalSymbols
		this.load = function (data) {

			//component API
			//=================================================================================================
			var cs = $comp.sources,
				cw = $comp.widgets,
				repairAddressFld = cw.textField1,
				repairEquipProblemField = cw.textField2,
				repairEquipSolutionField = cw.textField3,
				repairArriveDateField = cw.textField7,
				repairArriveTimeField = cw.textField8,
				$repairArriveTimeField = $("#" + repairArriveTimeField.id),
				repairDepartDateField = cw.textField12,
				repairDepartTimeField = cw.textField13,
				$repairDepartTimeField = $("#" + repairArriveTimeField.id),
				repairContractRateField = cw.textField15,
				$repairContractRateField = $("#" + repairContractRateField.id);
				

			function displayRepairDetail(rmaid) {
				sources.equipment_Encounters.wak_getEquipmentArr({
					arguments: [rmaid],
					onSuccess: function(event) {
						equipmentArr = JSON.parse(event.result);
						sources.equipmentArr.sync();
						debugger;
						$repairContractRateField = "FR: EX: RN:";
					}
				});
				
				var rmaid = '1499614';
				sources.rMA_OnSite.query("RMA_ID == :1", rmaid, {
					onSuccess: function () {
		
						$repairArriveTimeField.timepicker("setTime", sources.rMA_OnSite.ArrivedTime);
						$repairDepartTimeField.timepicker("setTime", sources.rMA_OnSite.ArrivedTime);
						
						
					}
				});
				
				
			}

			//event handlers
			//=================================================================================================

			$repairArriveTimeField.on("change", function() {
				sources.rMA_OnSite.ArrivedTime = $repairArriveTimeField.timepicker("getTime");
			});
			//on load
			//=================================================================================================
				//setup time picker for the repair by field
			$repairArriveTimeField.timepicker({
				step: 15
			});
			
			$repairDepartTimeField.timepicker({
				step: 15
			});

			//load the detail
			displayRepairDetail(data.userData.rmaid);

			//public API
			//=================================================================================================
			this.displayRepairDetail = displayRepairDetail;

		};
	}
	return constructor;
})();
