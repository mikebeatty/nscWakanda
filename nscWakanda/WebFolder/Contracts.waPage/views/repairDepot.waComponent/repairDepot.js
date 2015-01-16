
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {



	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'repairDepot';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock
	var cs = $comp.sources,
			cw = $comp.widgets,
			repairBillTo = cw.textField1,
			repairShipTo = cw.textField2,
			repairPrinter = cw.textField9;



		function displayRepairDetail(rmaid) {
			
		   	var rmaid = sources.companyRepairArr.RMAID;
	   		sources.rMA.query("RMA_ID == :1", sources.companyRepairArr.RMAID, {
	   			 onSuccess: function(event) {
	   			
	   				var printerType = sources.rMA.Make+" "+sources.rMA.Model+" "+sources.rMA.SerialNumber;
					repairPrinter.setValue(printerType);
					
					
				}
			});
	
		   sources.equipment_Inventory_Used.wak_getRepairEquipmentUsedArr({
			   arguments: [sources.companyRepairArr.RMAID],
			   onSuccess: function(event) {
		
			 		repairLineItemsArr = JSON.parse(event.result);
				   sources.repairLineItemsArr.sync();
				
				   
			   }
		   });
		   
		   sources.rMA.query("RMA_ID == :1", sources.companyRepairArr.RMAID,{
		   		onSuccess: function(){
		   			var vCompanyID = sources.rMA.CompanyID;
		   		
		   		
		   			cs.addresses.query("CompanyID == :1", vCompanyID, {
					onSuccess: function(){
						
					var vRepairAddress,
						vAddressType = "BillTo";
						cs.addresses.wak_getAddressRepair({
						arguments: [rmaid,vAddressType],
							onSuccess: function(event) {
								
								repairBillTo.setValue(event.result);
								}
							});
							
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

	// @region eventManager// @startlock
	// @endregion// @endlock
//public API
			//=================================================================================================
			this.displayRepairDetail = displayRepairDetail;
	
	};// @lock


}// @startlock
return constructor;
})();// @endlock
