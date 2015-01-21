
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
			contractAddressFld = cw.textField10;
			
		function displayContractDetail(contractID) {
			
			var contractID,
				companyID;
		
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
					alertify.success("RMA "+rmaid+" has been saved.")

//					if(rmaid != null){
//					alertify.success("RMA "+rmaid+" has been saved.")
//						}
//					 else {
//			   			alert("A repair could not be created.");
//					
//					};
				},
				onError: function(event){
					alert("A repair could not be created.");
				}
			});
			
		 function displayPrinterFilter(){
		   var vSerial = repairPrinterFilter,
				contractID = sources.contractArr.ContractID;
			   
		   		sources.equipment_Encounters.query({
			   arguments: [vSSPID,isBid,isInProgress,isComplete],
			   onSuccess: function(event) {
			
			 		repairsArr = JSON.parse(event.result);
				   sources.repairsArr.sync();
				   displaySelectedRecord();
				   
			   }
		   });
	   }	
			
				//convert time to milliseconds before sending to 4D
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
				
			}
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
	
	//public API
	//=================================================================================================
	this.displayContractDetail = displayContractDetail;

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
