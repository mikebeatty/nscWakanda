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
				partsGrid = cw.dataGrid2,
				repairAddressFld = cw.textField1,
				repairEquipProblemField = cw.textField2,
				repairEquipSolutionField = cw.textField3,
				repairArriveDateField = cw.textField7,
				repairArriveTimeField = cw.textField8,
				$repairArriveTimeField = $("#" + repairArriveTimeField.id),
				repairDepartDateField = cw.textField12,
				repairDepartTimeField = cw.textField13,
				$repairDepartTimeField = $("#" + repairDepartTimeField.id),
				repairContractRateField = cw.textField15,
				$repairContractRateField = $("#" + repairContractRateField.id),
				saveBtn = cw.button1,
				cancelBtn = cw.button2;

				

			function displayRepairDetail(rmaid) {
				sources.equipment_Encounters.wak_getEquipmentArr({
					arguments: [rmaid],
					onSuccess: function(event) {
						equipmentArr = JSON.parse(event.result);
						sources.equipmentArr.sync();
				
						displayPartsDetail(sources.equipmentArr.EquipmentID);
//						repairContractRateField.setValue("FR: EX: RN:");
					sources.rMA_Onsite_Bid.query("RMA_ID == :1", rmaid);
					var contractRate = "FR:"+sources.rMA_Onsite_Bid.FirstPrinterRate+" EX:"+sources.rMA_Onsite_Bid.AdditonalPrinterRate+" RN:"+sources.rMA_Onsite_Bid.ReturnRate;
				
						repairContractRateField.setValue(contractRate);
					}
				});
				
				//var rmaid = '1499614';
				sources.rMA_OnSite.query("RMA_ID == :1", rmaid, {
					onSuccess: function () {
		
						$repairArriveTimeField.timepicker("setTime", WakUtils.convert4DTimeToJSDate(sources.rMA_OnSite.ArrivedTime));
						$repairDepartTimeField.timepicker("setTime", WakUtils.convert4DTimeToJSDate(sources.rMA_OnSite.DueTime));
					}
				});
				
//				sources.lineItems.query("Transaction_ID == :1", rmaid, {
//					onSuccess: function () {
//		
////						$repairArriveTimeField.timepicker("setTime", WakUtils.convert4DTimeToJSDate(sources.rMA_OnSite.ArrivedTime));
////						$repairDepartTimeField.timepicker("setTime", WakUtils.convert4DTimeToJSDate(sources.rMA_OnSite.DueTime));
//					}
//				});
				
				sources.rMA.query('RMA_ID == :1',rmaid,{
					onSuccess: function(){
						var vCompanyID = sources.rMA.CompanyID;
						cs.addresses.query("CompanyID == :1", vCompanyID, {
							onSuccess: function(){
								var vRepairAddress;

								vRepairAddress = cs.addresses.wak_getAddressRepair({
									arguments: [vCompanyID],
									onSuccess: function(event) {
									repairAddressFld.setValue(event.result);
									}
								});
//								repairAddressFld.setValue(vRepairAddress);
							}
						});
					}
				});

			}
			
			function displayPartsDetail(rmaid){
			
				sources.equipment_Encounters.wak_getPartsArr({
					arguments: [rmaid],
					onSuccess: function(event) {
					
						partsArr = JSON.parse(event.result);
						sources.partsArr.sync();
//						sources.equipment_Encounters.query("EquipmentID == :1",equipmentid);
					}
				});
			
			
			}
			
			function saveRepair() {

				//convert time to milliseconds before sending to 4D
				sources.rMA_OnSite.ArrivedTime = WakUtils.convertTimeStringTo4DTime(repairArriveTimeField.getValue());
				sources.rMA_OnSite.DueTime = WakUtils.convertTimeStringTo4DTime(repairDepartTimeField.getValue());

				sources.rMA_OnSite.save({
					onSuccess: function() {

					},
					onError: function(event) {
						alert("error"); //todo swh: install client side error handler
					}
				});
				
				sources.equipment_Encounters.save({
					onSuccess: function() {

					},
					onError: function(event) {
						alert("error"); //todo swh: install client side error handler
					}
				});
				
			}
			

			//event handlers
			//=================================================================================================

			WAF.addListener(partsGrid, "onRowClick", function() {
				displayPartsDetail(sources.equipmentArr.EquipmentID);
       		});


			$repairArriveTimeField.on("change", function() {
				sources.rMA_OnSite.ArrivedTime = $repairArriveTimeField.timepicker("getTime");
			});
			
				//save button click
			saveBtn.addListener("click", function() {
				saveRepair();
			});

			//cancel button click
			cancelBtn.addListener("click", function() {
				displayRepairDetail();
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
