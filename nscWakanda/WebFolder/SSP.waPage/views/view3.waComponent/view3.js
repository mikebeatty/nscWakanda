/**
 * @fileOverview Web Component: view3
 * @author Welsh Harris
 * @created 12/02/2014
 */

/*global Wap:false, equipmentArr:true, partsArr:true */

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
				equipmentGrid = cw.dataGrid2,
				partsGrid = cw.dataGrid3,
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
				repairGaloRmaNumber = cw.textField4,
				$repairGaloRmaNumber = $("#" + repairGaloRmaNumber.id),
				transactionNotes = cw.textField5,
				$transactionNotes = $("#" + transactionNotes.id),
				saveBtn = cw.button1,
				cancelBtn = cw.button2,
				oldPartsArrUsedVal;


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
//						repairContractRateField.disable();
//						transactionNotes.disable();
					}
				});
				
				sources.equipment_Encounters.wak_getPartsArr({
					arguments: [rmaid],
						onSuccess: function(event) {
						partsArr = JSON.parse(event.result);
						sources.partsArr.sync();
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
			
							repairGaloRmaNumber.setValue(sources.rMA.GALO_RMA_Number);
						cs.addresses.query("CompanyID == :1", vCompanyID, {
							onSuccess: function(){
								var vRepairAddress;

								cs.addresses.wak_getAddressRepair({
									arguments: [vCompanyID],
									onSuccess: function(event) {
									repairAddressFld.setValue(event.result);
									}
								});
//								repairAddressFld.setValue(vRepairAddress);
							}
						});
						
						sources.transactions.query("Transaction_ID == :1",rmaid,{
//				
							onSuccess: function() {
							transactionNotes.setValue(sources.transactions.Notes);; //todo swh: install client side error handler
									}
						});
					}
				});

			}
			
			function displayPartsDetail(equipmentID){

//				sources.equipment_Encounters.query("EquipmentID == :1", {
	sources.equipment_Encounters.query("EquipmentID == :1",sources.equipmentArr.EquipmentID,{
//					params: [equipmentID],
					onError: function() {
						alert("error - equipmentID"); //todo swh: install client side error handler
					}
				});

			
			
//				sources.equipment_Encounters.wak_getPartsArr({
//					arguments: [rmaid],
//					onSuccess: function(event) {
//			debugger;
//						partsArr = JSON.parse(event.result);
//						sources.partsArr.sync();
//						sources.equipment_Encounters.query("EquipmentID == :1",sources.equipmentArr.EquipmentID, {
//						
//						onError: function(event) {
//						alert("error"); //todo swh: install client side error handler
//							}
//							
//						});
//					}
//				});
			
			
			}
			
			function saveRepair() {

				//convert time to milliseconds before sending to 4D
				sources.rMA_OnSite.ArrivedTime = WakUtils.convertTimeStringTo4DTime(repairArriveTimeField.getValue());
				sources.rMA_OnSite.DepartureTime = WakUtils.convertTimeStringTo4DTime(repairDepartTimeField.getValue());

				sources.rMA_OnSite.save({
					onSuccess: function() {
						alertify.success("Record has been saved.");
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

			/**
			 * Called when the user changes the used value for a part in the parts grid
			 * @param {string} sku
			 * @param {string} used
			 */
			function savePartUsed(sku, used) {
				debugger;
				//Hey Mike, here is where you would pass the sku and used values to 4D to update
				//the record on the 4D side

			}

			//event handlers
			//=================================================================================================

			WAF.addListener("partsArr", "onUsedAttributeChange", function(event) {
				if (event.eventKind === "onCurrentElementChange") {
					oldPartsArrUsedVal = sources.partsArr.Used;
				}
				if (event.eventKind === "onAttributeChange") {
					if (sources.partsArr.Used != oldPartsArrUsedVal) { //using != because these were bouncing between number and string
						savePartUsed(sources.partsArr.SKU, sources.partsArr.Used);
					}
				}
			}, "WAF", "Used");

			WAF.addListener(equipmentGrid, "onRowClick", function() {
				displayPartsDetail();
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
				alertify.error("Changes cancelled.");
				displayRepairDetail();
			});

			//clicking on a used cell in the used column of the parts grid
			WAF.addListener(partsGrid, "onCellClick", function(event) {
				WakUtils.gridEditCell(partsGrid, event.data.columnNumber, event.data.row.rowNumber);
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
