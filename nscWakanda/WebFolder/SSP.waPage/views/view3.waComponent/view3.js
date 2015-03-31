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
				repairDueTimeField = cw.textField17,
				$repairDueTimeField = $("#" + repairDueTimeField.id),
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
				oldPartsArrSerialVal,
				savePartsUsedRunning = false,
				oldPartsArrStatusVal,
				oldPartsArrUsedVal;

	

			function displayRepairDetail(rmaid) {
			
			if(rmaid != null){
				var lockedRMA = false;
	
					transactionNotes.enable();
					partsGrid.enable();
					repairEquipProblemField.enable();
					repairEquipSolutionField.enable();
					repairArriveDateField.enable();
					repairArriveTimeField.enable();
					repairDepartDateField.enable();
					repairDepartTimeField.enable();
					repairTripsRequired.enable();
					repairApprovedTravel.enable();
					repairApprovedLabor.enable();
					repairMileage.enable();
					
				sources.rMA_OnSite.query("RMA_ID == :1", rmaid, {
					onSuccess: function () {
			
//						alertify.alert(sources.rMA_OnSite.RMA_OnSiteUUID);
						var lockedRMA = false;
					
						sources.web_Access.wak_getLockedStatus('RMA_OnSite',sources.rMA_OnSite.RMA_OnSiteUUID,{

					
							onSuccess : function(event){
						
							lockedRMA = event.result;
							
								if(lockedRMA === true){
								alertify.alert('This record is locked by another user and can not be modified.');
							
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
								repairMileage.disable();
								}
							}	
					
						});
					}
				});
				
				
				sources.equipment_Encounters.wak_getEquipmentArr({
					arguments: [rmaid],
					onSuccess: function(event) {
					
						equipmentArr = JSON.parse(event.result);
						sources.equipmentArr.sync();

						displayPartsDetail(sources.equipmentArr.EquipmentID);
//						repairContractRateField.setValue("FR: EX: RN:");
					var sspID = sources.web_Access.CompanyID;
					sources.rMA_Onsite_Bid.query("RMA_ID == :1 AND SSP_ID == :2", rmaid, sspID, {
						
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
						$repairDepartTimeField.timepicker("setTime", WakUtils.convert4DTimeToJSDate(sources.rMA_OnSite.DepartureTime));
						$repairDueTimeField.timepicker("setTime", WakUtils.convert4DTimeToJSDate(sources.rMA_OnSite.DueTime));
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
//						
						
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
							transactionNotes.setValue(sources.transactions.Notes); //todo swh: install client side error handler
									}
						});
					}
				});
			}
			}
			
			function displayPartsDetail(equipmentID){

//				sources.equipment_Encounters.query("EquipmentID == :1", {
//	sources.equipment_Encounters.query("EquipmentID == :1",sources.equipmentArr.EquipmentID,{
				sources.equipment_Encounters.query("EquipmentID == :1 AND TransactionID == :2",sources.equipmentArr.EquipmentID, sources.rMA_OnSite.RMA_ID,{
//					params: [equipmentID],
					onError: function() {
						alert("error - equipmentID"); //todo swh: install client side error handler
					}
				});

			

			
			
			}
			
			function saveRepair() {

				var lockedRMA = false;
				
				sources.web_Access.wak_getLockedStatus('RMA_OnSite',sources.rMA_OnSite.RMA_OnSiteUUID,{
					
					onSuccess : function(event){
					
						lockedRMA = event.result;
							
						if(lockedRMA === true){
							alertify.alert('This record is locked by another user and can not be saved.');
						}
					}
					
				});
					
			
				
				
				if(lockedRMA === false){	
				//convert time to milliseconds before sending to 4D
					sources.rMA_OnSite.ArrivedTime = WakUtils.convertTimeStringTo4DTime(repairArriveTimeField.getValue());
					sources.rMA_OnSite.DepartureTime = WakUtils.convertTimeStringTo4DTime(repairDepartTimeField.getValue());
					
					if(rmaComplete.getValue() === true){
					sources.timeStamps.wak_timestamp(sources.rMA_OnSite.RMA_ID,"Precompleted");
					
					sources.transactions.query("Transaction_ID == :1",sources.rMA_OnSite.RMA_ID,{
	//				
						onSuccess: function() {
							sources.transactions.Status = "Precompleted" ; //todo swh: install client side error handler
							sources.transactions.save({
								onSuccess: function() {
									
									sources.lineItems.wak_setLineItemsVerifyQuantity({
					
									arguments: [sources.rMA_OnSite.RMA_ID],
										onSuccess: function(event) {
						
											if(event.result !=""){
											alertify.alert(event.result);
											};
										}
									});
									
								}
							});
						}
					});
					
					
					
					
					}

				

					sources.rMA_OnSite.save({
						onSuccess: function() {
							debugger;
							sources.timeStamps.wak_timestamp(sources.rMA_OnSite.RMA_ID,"Arrival");
							sources.timeStamps.wak_timestamp(sources.rMA_OnSite.RMA_ID,"Departure");
							
							alertify.success("Record has been saved.");
						},
						onError: function(event) {
				
							alert("It appears this record has been modified by another user -- your changes have not been saved."); //todo swh: install client side error handler
						}
					});
					
					sources.equipment_Encounters.save({
						onSuccess: function() {

						},
						onError: function(event) {
							alert("There was a problem saving the equipment encounter record -- your changes have not been saved."); //todo swh: install client side error handler
						}
					});
					
					cs.rMA.save({
						onSuccess: function() {
							
						},
						onError: function(event) {
							alert("There was a problem saving the RMA record -- your changes have not been saved."); //todo swh: install client side error handler
						}
					});
					
					
//					sources.lineItems.wak_setLineItemsVerifyQuantity({
//					
//					arguments: [sources.rMA_OnSite.RMA_ID],
//						onSuccess: function(event) {
//						
//						if(event.result !=""){
//						alertify.alert(event.result);
//							};
//						}
//					});
				}
			}

			/**
			 * Called when the user changes the used value for a part in the parts grid
			 * @param {string} sku
			 * @param {string} used
			 */
			function savePartUsed(sku, used, lineItem, equipmentID, serial) {
		
				var lockedRecord = false;
				
				sources.web_Access.wak_getLockedStatus('RMA_OnSite',sources.rMA_OnSite.RMA_OnSiteUUID,{
					
					onSuccess : function(event){
					
						lockedRecord = event.result;
							
						if(lockedRecord === true){
							alertify.alert('This record is locked by another user and can not be saved.');
							var rmaid = sources.rMA_OnSite.RMA_ID;
								sources.equipment_Encounters.wak_getPartsArr({
								arguments: [rmaid],
									onSuccess: function(event) {
									partsArr = JSON.parse(event.result);
									sources.partsArr.sync();
				
									}
								});
						}else{
							
							var equipmentID = sources.equipmentArr.EquipmentID,
								reqSerial = false,
						
							rmaID = sources.rMA_OnSite.RMA_ID;
							
							sources.inventory.query("SKU == :1",sku,{
							
								onSuccess : function(event){
							
									if(sources.inventory.ReqSerial === true){
										reqSerial = true;
										if(serial === ""){
										serial = "Required";
										}
									}
								
									if(reqSerial & used > 1)		{
										alertify.alert("Please enter individual printheads for each printer.");
									}else{
										sources.equipment_Inventory_Used.wak_setPartsArrUsedParts(sku,used,lineItem, equipmentID,serial,rmaID,{
					
										onSuccess: function(event){
						
						
											if(event.result.substring(0,5) === "Alert"){
												alertify.alert(event.result);
											
											}else{				
												alertify.success(event.result);
//											
												if(sources.partsArr.Origin === "Trunk") {
//													
//													if(sources.partsArr.Used != sources.partsArr.Quantity){
//														
//														if(sources.partsArr.Status = "Update Status"){
//															alertify.alert("Quantity used does not match quantity shipped. Please indicate if additional parts were: returned to NSC, left with customer, or returned to trunk.");
//														}
//													}
												}
												
											}
								
								
											var rmaid = sources.rMA_OnSite.RMA_ID;
											sources.equipment_Encounters.wak_getPartsArr({
											arguments: [rmaid],
												onSuccess: function(event) {
												partsArr = JSON.parse(event.result);
												sources.partsArr.sync();
							
												}
											});
											},
											
											onError: function(event){
												alertify.error(event.result.result);
											}
						
					
										});
									}
								
								
								}
						

							});
							
							
							
						}
					}
					
				});
			

			}
			
			function savePartUsedSerial(sku, used, lineItem, equipmentID, serial) {
		

				var equipmentID = sources.equipmentArr.EquipmentID,
					rmaID = sources.rMA_OnSite.RMA_ID;
					used = used.toString();
	
						sources.lineItems.wak_setPartsArrSerial(sku,used,lineItem, equipmentID,serial,rmaID,{
				
					onSuccess: function(event){
		

					if(event.result.substring(0,5) === "Alert"){
							alertify.alert(event.result);
							sources.equipment_Encounters.wak_getPartsArr({
								arguments: [rmaID],
								onSuccess: function(event) {
								partsArr = JSON.parse(event.result);
								sources.partsArr.sync();
		
								}
						});
					}else{			
				
						alertify.success(event.result);
					}


						},
					onError: function(event){
						alertify.error(event.result);
					}
					
				
				});

			}
			

			

			//event handlers
			//=================================================================================================

//			sources.partsArr.removeAllListeners();
			if(!Wap.partsArrInstalled){
				Wap.partsArrInstalled = true;
				sources.partsArr.addListener("all", function(event) {


						if (event.eventKind === "onCurrentElementChange") {
							oldPartsArrUsedVal = sources.partsArr.Used;
							oldPartsArrSerialVal = sources.partsArr.Serial;
						}
						if (event.eventKind === "onAttributeChange") {
						
							if (sources.partsArr.Serial != oldPartsArrSerialVal) { //using != because these were bouncing between number and string
			
								savePartUsedSerial(sources.partsArr.SKU, sources.partsArr.Used, sources.partsArr.LineItem,sources.partsArr.equipmentID,sources.partsArr.Serial);
							}
							
							if(typeof oldPartsArrUsedVal != 'undefined'){
								if (sources.partsArr.Used != oldPartsArrUsedVal) { //using != because these were bouncing between number and string

									savePartUsed(sources.partsArr.SKU, sources.partsArr.Used, sources.partsArr.LineItem,sources.partsArr.equipmentID,sources.partsArr.Serial);
										
								}
							}
						}
					
				});
				
				

			}
			

			
			
			//clicking on a used cell in the used column of the parts grid
			WAF.addListener(partsGrid, "onCellClick", function(event) {
			
				WakUtils.gridEditCell(partsGrid, event.data.columnNumber, event.data.row.rowNumber);
				});

			WAF.addListener(equipmentGrid, "onRowClick", function() {
				displayPartsDetail();
       		});
       		
       		rmaComplete.addListener("change", function() {

				var notComplete = false,
					noSolution = false;
				if(rmaComplete.getValue() === true){
				
				if((repairTripsRequired.getValue() === "0") || (repairApprovedTravel.getValue() === "0")){
				notComplete = true;
				}
				
				if(repairApprovedTravel.getValue() === "0"){
				notComplete = true;
				}
				
				if(repairApprovedLabor.getValue() === "0"){
				notComplete = true;
				}
				
				if(repairMileage.getValue() === "0"){
				notComplete = true;
				}
				
				if(notComplete){
				alertify.alert("You must enter a value for trips, travel, labor and mileage.");
				rmaComplete.setValue(false);
				
				}
				
//				var noSolution = false;
				
				var len = sources.equipmentArr.length;
				
				for (i = 0; i < len; i++) {

					sources.equipment_Encounters.query("EquipmentID == :1 AND TransactionID == :2",equipmentArr[i].EquipmentID, sources.rMA_OnSite.RMA_ID);

							if(sources.equipment_Encounters.Notes_Tech === ""){

								noSolution = true;
								rmaComplete.setValue(false);
								i = len;
							}
//						}

					
				}
				
				if(noSolution){
		
				alertify.alert("You must enter tech notes for each printer.");
				}
				
				}
			});


			$repairArriveTimeField.on("change", function() {
				sources.rMA_OnSite.ArrivedTime = $repairArriveTimeField.timepicker("getTime");
			});
			
//			location.href = $filepath "http://" + window.location.host + "/getReport?" + cs.reportInstance.uuid;
			
				//save button click
			saveBtn.addListener("click", _.debounce(function() {
				saveRepair();
				}, 300, true));

			//cancel button click
			cancelBtn.addListener("click",  _.debounce(function() {
				alertify.error("Changes cancelled.");
				displayRepairDetail();
					}, 300, true));
			
			fieldsheetBtn.addListener("click", _.debounce(function() {
				alertify.alert("Fieldsheet is being prepared. Please stand by.");
				var rmaID = sources.rMA_OnSite.RMA_ID;
				window.open("http://" + window.location.host + "/docProxy?" + rmaID);
				}, 300, true));
			
			repairEquipSolutionField.addListener("change", function(){
				sources.equipment_Encounters.save({
					onSuccess: function() {

					},
					onError: function(event) {
						alert("error"); //todo swh: install client side error handler
					}
				});
			
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
			
			$repairDueTimeField.timepicker({
				step: 15
			});


			//load the detail
//		
			
			

			//public API
			//=================================================================================================
			this.displayRepairDetail = displayRepairDetail;

		};
	}
	return constructor;
})();
