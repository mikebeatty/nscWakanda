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
				repairTripsRequired = cw.textField6,
				repairApprovedTravel = cw.textField9,
				repairApprovedLabor = cw.textField10,
				repairMileage = cw.textField11,
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
				fieldsheetBtn = cw.button3,
				rmaComplete = cw.checkbox1,
				oldPartsArrUsedVal;


			function displayRepairDetail(rmaid) {

				sources.equipment_Encounters.wak_getEquipmentArr({
					arguments: [rmaid],
					onSuccess: function(event) {
					
						equipmentArr = JSON.parse(event.result);
						sources.equipmentArr.sync();

						displayPartsDetail(sources.equipmentArr.EquipmentID);
//						repairContractRateField.setValue("FR: EX: RN:");
					sources.rMA_Onsite_Bid.query("RMA_ID == :1", rmaid,{
						onSuccess: function(event) {
					
							var contractRate = "FR:"+sources.rMA_Onsite_Bid.FirstPrinterRate+" EX:"+sources.rMA_Onsite_Bid.AdditonalPrinterRate+" RN:"+sources.rMA_Onsite_Bid.ReturnRate;
				
							repairContractRateField.setValue(contractRate);
							}
						});
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
				
				cs.rMA.query('RMA_ID == :1',rmaid,{
					onSuccess: function(){
						var vCompanyID = cs.rMA.CompanyID;
						
							repairGaloRmaNumber.setValue(cs.rMA.GALO_RMA_Number);
//							rmaComplete.setValue(cs.rMA.RMAComplete);
						
						if(cs.rMA.RMAComplete == true){
						
//						repairContractRateField.disable();
						transactionNotes.disable();
						partsGrid.disable();
						repairEquipProblemField.disable();
						repairEquipSolutionField.disable();
						repairArriveDateField.disable();
						repairArriveTimeField.disable();
						repairDepartDateField.disable();
						repairDepartTimeField.disable();
						repairTripsRequired.disable();
						repairApprovedTravel.disable();
						repairApprovedLabor.disable();
						repairMileage .disable();
						
						}
						cs.addresses.query("CompanyID == :1", vCompanyID, {
							onSuccess: function(){
								var vRepairAddress;

								cs.addresses.wak_getAddressRepair({
									arguments: [rmaid],
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
debugger;
				cs.rMA.RMAStatus = "Precompleted";

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
				
				cs.rMA.save({
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
			function savePartUsed(sku, used, lineItem, equipmentID, serial, rmaID) {
		
				//Hey Mike, here is where you would pass the sku and used values to 4D to update
				//the record on the 4D side
				var equipmentID = sources.equipmentArr.EquipmentID,
					rmaID = sources.rMA_OnSite.RMA_ID;
				
				sources.equipment_Inventory_Used.wak_setPartsArrUsedParts(sku,used,lineItem, equipmentID,serial,rmaID,{
				
					onSuccess: function(event){
				
						alertify.success(event.result.result);
					},
					onError: function(event){
						alertify.error(event.result.result);
					}
					
				
				});

			}
			
			

			//event handlers
			//=================================================================================================

			WAF.addListener("partsArr", "onUsedAttributeChange", function(event) {
				if (event.eventKind === "onCurrentElementChange") {
					oldPartsArrUsedVal = sources.partsArr.Used;
				}
				if (event.eventKind === "onAttributeChange") {
					if (sources.partsArr.Used != oldPartsArrUsedVal) { //using != because these were bouncing between number and string
					
						savePartUsed(sources.partsArr.SKU, sources.partsArr.Used, sources.partsArr.LineItem,sources.partsArr.equipmentID,sources.partsArr.serial,sources.partsArr.rmaID);
					}
				}
			}, "WAF", "Used");
			
			//clicking on a used cell in the used column of the parts grid
			WAF.addListener(partsGrid, "onCellClick", function(event) {
				WakUtils.gridEditCell(partsGrid, event.data.columnNumber, event.data.row.rowNumber);
			});

			WAF.addListener(equipmentGrid, "onRowClick", function() {
				displayPartsDetail();
       		});
       		
       		rmaComplete.addListener("change", function() {
//				cs.rMA.RMAComplete = 'true';
			});


			$repairArriveTimeField.on("change", function() {
				sources.rMA_OnSite.ArrivedTime = $repairArriveTimeField.timepicker("getTime");
			});
			
//			location.href = $filepath "http://" + window.location.host + "/getReport?" + cs.reportInstance.uuid;
			
				//save button click
			saveBtn.addListener("click", function() {
				saveRepair();
			});

			//cancel button click
			cancelBtn.addListener("click", function() {
				alertify.error("Changes cancelled.");
				displayRepairDetail();
			});
			
			fieldsheetBtn.addListener("click", function() {
				var rmaID = sources.rMA_OnSite.RMA_ID;
				window.open("http://" + window.location.host + "/docProxy?" + rmaID);
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
