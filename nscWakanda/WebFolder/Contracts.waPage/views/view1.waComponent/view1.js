
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
			equipmentProblemEntered = false,
			message = "",
			selectedContractID = "",
			equipmentArrPrime = [],
			contractAddressFld = cw.textField10;
			
		function displayContractDetail(contractID) {

			var companyID;
			selectedContractID = contractID;
//			saveBtn.hide();
		
			//contractID = sources.contractArr.ContractID; //welsh: shouldn't need this because it is passed in as a param
			sources.contracts.query("ContractID == :1", contractID,{
			
				onError: function(event){
				
				},
				
				onSuccess: function () {
					
					sources.equipment_Encounters.wak_getContractPrintersArr({
			   		arguments: [contractID],
			   			onSuccess: function(event) {
			 			equipmentArr = JSON.parse(event.result);
				   		sources.equipmentArr.sync();
				   		
				   		equipmentArrPrime = [];
				   		equipmentArrPrime = _.extend(equipmentArrPrime, equipmentArr);

			   			}
		   			});
							
					cs.addresses.wak_getAddressContractEndUser({
						arguments: [contractID],
						onSuccess: function(event) {
						contractAddressFld.setValue(event.result);
							}
					});

						
		

//					var addressID = sources.contracts.EndUserAddressID;
//					cs.addresses.query("AddressID == :1", addressID, {
//						onSuccess: function(){
//							sources.equipment_Encounters.wak_getContractPrintersArr({
//			   					arguments: [contractID],
//			   					onSuccess: function(event) {
//			 						equipmentArr = JSON.parse(event.result);
//				   					sources.equipmentArr.sync();
//				   	
//				   
//			   }
//		   });
//							cs.addresses.wak_getAddressContractEndUser({
//								arguments: [contractID],
//								onSuccess: function(event) {
//								contractAddressFld.setValue(event.result);
//									}
//							});

//						}
//					});
				}

			});
		};
		
		function saveRepair() {
//Need code here to create/save repair
			var test = sources.equipmentArr.Reference;
//			contractID = sources.contractArr.ContractID;
			
			sources.equipmentArr.sync();
			
			var dataObj = {
				contractID: selectedContractID,
				contactName: contactNameFld.getValue(),
				contactPhone: contactPhoneFld.getValue(),
				contactFax: contactFaxFld.getValue(),
				contactEmail: contactEmailFld.getValue(),
				repairNotes: repairAddressNotes.getValue(),
				equipmentArr: equipmentArr
			};
		
		
			
			var rmaid = sources.rMA.wak_createRMAOnsite({
			arguments: dataObj,
				onSuccess: function(event){
					
					rmaid = event.result;
					
					if(rmaid > 0){
					alertify.alert("RMA "+rmaid+" has been created.");
					displayContractDetail(selectedContractID);

					
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
		 
		   var vSerial = repairPrinterFilter.getValue();
//				contractID = sources.contractArr.ContractID;

			   
			if(vSerial.length > 0){

		   		sources.equipmentArr.query("Serial == :1",vSerial,{
			
			   onSuccess: function(event) {

			   }
		   });
		   }else{
	
			equipmentArr = _.extend(equipmentArr, equipmentArrPrime);
			sources.equipmentArr.sync();
//		 	sources.equipmentArr = equipmentArrPrime;
//		 	vSerial = "";
//		 	sources.equipmentArr.query("Serial !== :1",vSerial,{
//			
//			   onSuccess: function(event) {

//			   }
//			  });

	
//		   	sources.equipment_Encounters.wak_getContractPrintersArr({
//			   	arguments: [contractID],
//			   	onSuccess: function(event) {
//			 		equipmentArr = JSON.parse(event.result);
//				   	sources.equipmentArr.sync();
//		  			}
//		  
//		  		});
		   
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
	//displayContractDetail(data.userData.contractID); //welsh: we don't want this to run on load, should get called from the parent page
	
		saveBtn.addListener("click", function() {
			
			var sendAlert = false;
				if(contactNameFld.getValue() === ""){
					sendAlert = true;
					message = "Contact name and contact phone are required. Contract status must be open.";
				}
					
				if(contactPhoneFld.getValue() === ""){
					sendAlert = true;
					message = "Contact name and contact phone are required. Contract status must be open.";
				}
				
				
				if(equipmentProblemEntered === false){
					sendAlert = true;
					message = "Please select a printer and enter the printer issue.";
				}
				
				if(sendAlert === true){
					alertify.alert(message);
				}else{
					saveRepair();
				}
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
			
					equipmentProblemEntered = true;
					
					var sendAlert = false;
					if(contactNameFld.getValue() === ""){
//						debugger;
					sendAlert = true;
//					saveBtn.hide();
					}
					
					if(contactPhoneFld.getValue() === ""){
//							debugger;
					sendAlert = true;
//					saveBtn.hide();
					}
					
					if(sources.contracts.Status != 'Open'){
//							debugger;
					sendAlert = true;
					
//					saveBtn.hide();
					}
					
					if(sendAlert === true){
//							debugger;
					alertify.alert("Contact name and contact phone are required. Contract status must be open.");
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
