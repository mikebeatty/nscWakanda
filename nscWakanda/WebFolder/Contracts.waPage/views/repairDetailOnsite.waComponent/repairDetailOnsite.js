
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
			viewComp = $$("component1"),
			visitGrid = cw.dataGrid1,
			printerGrid = cw.dataGrid2,
			notesGrid = cw.dataGrid3,
			printerProblem = cw.textField3,
			printerSolution = cw.textField4,
			notesTech = cw.textField2,
			repairShipTo = cw.textField1;
		
//			repairShipTo = cw.textField2;
//			repairPrinter = cw.textField9;



		function displayRepairDetail(rmaid) {
			
			repairDetail.hide(),
			
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
				   printerSolution.setValue("")
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
		
		
		
		
	// eventHandlers// @lock
	WAF.addListener(printerGrid, "onRowClick", function() {
				printerProblem.setValue(sources.repairPrinterArr.Problem),
				printerSolution.setValue(sources.repairPrinterArr.Solution)
       		});
       		
    WAF.addListener(printerGrid, "onRowDblClick", function() {
				
				
				visitGrid.hide();
				printerGrid.hide();
				notesGrid.hide();
				printerProblem.hide();
				printerSolution.hide();
				notesTech.hide();
				repairShipTo.hide();
				
				repairDetail.show();
				debugger;
				$$(repairDetail.id).displayRepairPrinterDetail(sources.repairPrinterArr.EEUUID);
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
