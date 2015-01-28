
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
			contactNameFld = cw.textField12,
			contactPhoneFld = cw.textField2,
			contactFaxFld = cw.textField3,
			contactEmailFld = cw.textField11,
			repairAddressNotes = cw.textField9,
			repairPrinterFilter = cw.textField13,
			printerGrid = cw.dataGrid1,
			saveBtn = cw.button1,
			cancelBtn = cw.button2,
			oldequipmentArrProblemVal = "",
			contractAddressFld = cw.textField10;
			
		function displayContractDetail(contractID) {
			
			var contractID,
				companyID;
		
			saveBtn.hide();
		
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
		
		function saveRepair() {
//Need code here to create/save repair
			var test = sources.equipmentArr.Reference,
			contractID = sources.contractArr.ContractID;
			
			sources.equipmentArr.sync();
			
			var dataObj = {
				contractID: contractID,
				contactName: contactNameFld.getValue(),
				contactPhone: contactPhoneFld.getValue(),
				contactFax: contactFaxFld.getValue(),
				contactEmail: contactEmailFld.getValue(),
//				reference: sources.equipmentArr.Reference
				equipmentArr: equipmentArr
			};
		
		
			
			var rmaid = sources.rMA.wak_createRMAOnsite({
			arguments: dataObj,
				onSuccess: function(event){
					
					rmaid = event.result;
					
					if(rmaid > 0){
					alertify.alert("RMA "+rmaid+" has been created.");
					
					}else{
					
					alertify.alert("RMA has not been created. Please verify contact information, printer problem and reference have been entered.");
					}
//					alertify.success("RMA "+rmaid+" has been saved.")

//					if(rmaid != null){
//					alertify.success("RMA "+rmaid+" has been saved.")
//						}
//					 else {
//			   			alert("A repair could not be created.");
//					
//					};
				},
				onError: function(event){
					alertify.alert("A repair could not be created.");
				}
			});
			
		}
		 function displayPrinterFilter(){
		 
		   var vSerial = repairPrinterFilter.getValue(),
				contractID = sources.contractArr.ContractID;

			   
			if(vSerial.length > 0){

		   		sources.equipmentArr.query("Serial == :1",vSerial,{
			
			   onSuccess: function(event) {
				   
			   }
		   });
		   }else{
//		   	
		 
		   	sources.equipment_Encounters.wak_getContractPrintersArr({
			   	arguments: [contractID],
			   	onSuccess: function(event) {
			 		equipmentArr = JSON.parse(event.result);
				   	sources.equipmentArr.sync();
		  			}
		  
		  		});
		   
	   		}	
			
		}		//convert time to milliseconds before sending to 4D
//				sources.rMA_OnSite.ArrivedTime = WakUtils.convertTimeStringTo4DTime(repairArriveTimeField.getValue());
//				sources.rMA_OnSite.DepartureTime = WakUtils.convertTimeStringTo4DTime(repairDepartTimeField.getValue());

//				sources.rMA_OnSite.save({
//					onSuccess: function() {
//						alertify.success("Record has been saved.");
//					},
//					onError: function(event) {
//						alert("error"); //todo swh: install client side error handlers
//					}
//				});
//				
//				sources.equipment_Encounters.save({
//					onSuccess: function() {

//					},
//					onError: function(event) {
//						alert("error"); //todo swh: install client side error handler
//					}
//				});
//				
//				cs.rMA.save({
//					onSuccess: function() {
//						
//					},
//					onError: function(event) {
//						alert("error"); //todo swh: install client side error handler
//					}
//				});
				
			
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock
	displayContractDetail(data.userData.contractID);
	
		saveBtn.addListener("click", function() {
				saveRepair();
			});

			//cancel button click
		cancelBtn.addListener("click", function() {
				alertify.error("Changes cancelled.");
				displayRepairDetail();
			});
			
		repairPrinterFilter.addListener("change", function() {
				displayPrinterFilter();
			});
			


		WAF.addListener("equipmentArr", "onProblemAttributeChange", function(event) {
			

			if (event.eventKind === "onCurrentElementChange") {
				oldequipmentArrProblemVal = sources.equipmentArr.Problem;
			}
			if (event.eventKind === "onAttributeChange") {
			
				if (sources.equipmentArr.Problem != oldequipmentArrProblemVal) { //using != because these were bouncing between number and string
			
					saveBtn.show();
					
					if(contactNameFld.getValue() === ""){
					alertify.alert("Contact name is required.");
					saveBtn.hide();
					}
					
					if(contactPhoneFld.getValue() === ""){
					alertify.alert("Contact phone is required.");
					saveBtn.hide();
					}
					
					if(sources.contracts.Status != 'Open'){
					alertify.alert("Contract status must be open.");
					saveBtn.hide();
					}
						
				}
			}
		}, "WAF", "Problem");

		WAF.addListener(printerGrid, "onCellClick", function(event) {
			WakUtils.gridEditCell(printerGrid, event.data.columnNumber, event.data.row.rowNumber);
		});
			
	
	//public API
	//=================================================================================================
	this.displayContractDetail = displayContractDetail;

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
