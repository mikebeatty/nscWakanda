
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'repairDetailOnsite';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock
		var cs = $comp.sources,
			cw = $comp.widgets,
			detailCompLoaded = null,
			repairDetail = cw.component1,

			visitGrid = cw.dataGrid1,
			printerGrid = cw.dataGrid2,
			notesGrid = cw.dataGrid3,
			printerProblem = cw.textField3,
			printerResolution = cw.textField4,
			notesTech = cw.textField2,
			repairShipTo = cw.textField1;
		
//			repairShipTo = cw.textField2;
//			repairPrinter = cw.textField9;



		function displayRepairDetail(rmaid) {
			
			repairDetail.hide();
			visitGrid.show();
			printerGrid.show();
			notesGrid.show();
			printerProblem.show();	
			printerResolution.show();
			notesTech.show();
			repairShipTo.show();	
			
			cs.rMA_OnSite.wak_getRepairVisitArr({
			   arguments: [sources.companyRepairArr.RMAID],
			   onSuccess: function(event) {
		
			 		repairVisitArr = JSON.parse(event.result);
				    sources.repairVisitArr.sync();
				
			   }
		   });
	
		   sources.equipment_Encounters.wak_getRepairPrinterArray({
			   arguments: [sources.companyRepairArr.RMAID],
			   onSuccess: function(event) {
		
			 		repairPrinterArr = JSON.parse(event.result);
				   sources.repairPrinterArr.sync();
				
				   notesTech.setValue(sources.repairPrinterArr.Notes);
				   printerProblem.setValue(""),
				   printerResolution.setValue("")
			   }
		   });
		   
		    sources.transactions.wak_getRepairNotesArr({
			   arguments: [sources.companyRepairArr.RMAID],
			   onSuccess: function(event) {
		
			 		repairNotesArr = JSON.parse(event.result);
				   sources.repairNotesArr.sync();
			
			   }
		   });
		   
		    sources.rMA.query("RMA_ID == :1", sources.companyRepairArr.RMAID,{
		   		onSuccess: function(){
		   			var vCompanyID = sources.rMA.CompanyID;
		   		
		   		
		   			cs.addresses.query("CompanyID == :1", vCompanyID, {
					onSuccess: function(){
						
					var vRepairAddress,
						vAddressType = "BillTo";
//						cs.addresses.wak_getAddressRepair({
//						arguments: [rmaid,vAddressType],
//							onSuccess: function(event) {
//								
//								repairBillTo.setValue(event.result);
//								}
//							});
							
						vAddressType = "ShipTo";
						cs.addresses.wak_getAddressRepair({
						arguments: [rmaid],
							onSuccess: function(event) {
									
								repairShipTo.setValue(event.result);
								}
							});
						}
					});	
		   		}
			});	
				
		};
		
		
		function displayRepairPrinterDetail(eeuuid){
				debugger;
			sources.equipment.query("EquipmentUUID == :1",eeuid,{
				onSuccess: function(event){
				debugger;
				}
			});
		}
		
	// eventHandlers// @lock
	WAF.addListener(printerGrid, "onRowClick", function() {
				printerProblem.setValue(sources.repairPrinterArr.Problem),
				printerResolution.setValue(sources.repairPrinterArr.Resolution)
       		});
       		
    WAF.addListener(printerGrid, "onRowDblClick", function() {
				
				
				visitGrid.hide();
				printerGrid.hide();
				notesGrid.hide();
				printerProblem.hide();
				printerResolution.hide();
				notesTech.hide();
				repairShipTo.hide();
				
				repairDetail.show();
				debugger;
//				$$(repairDetail.id).displayRepairPrinterDetail(sources.repairPrinterArr.EEUUID);
				
				cw.component1.displayRepairPrinterDetail(sources.repairPrinterArr.EEUUID);
//				displayRepairPrinterDetail(sources.repairPrinterArr.EEUUID);
//				var viewPath = '/Contracts.waPage/views/repairPrinterDetail.waComponent';
//				repairDetail.loadComponent({
//				   
//				   path: viewPath,
////				   userData: userData,
//				   onSuccess:function(event){
//					debugger;
////					  detailCompLoaded = $$(this.id);
//						Wap.viewComp = $$(this.id);
////				
//// 						detailCompLoaded.displayRepairDetail(userData.rmaid);
//						Wap.viewComp.displayRepairPrinterDetail(sources.repairPrinterArr.EEUUID);
//					
//				   },
//				   onError: function(event){
//				
//				   }
//               }
//           );
				
				
       		});
	// @region eventManager// @startlock
	// @endregion// @endlock



	//public API
			//=================================================================================================
			this.displayRepairDetail = displayRepairDetail;
	

	};// @lock


}// @startlock
return constructor;
})();// @endlock
