
(function Component (id) {// @lock
	"use strict";
// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'view2';
	// @endregion// @endlock

	this.load = function (data) {// @lock


	//component API
		//=================================================================================================
		var cs = $comp.sources,
			cw = $comp.widgets,
			detailComp = cw.component1,
			detailCompLoaded = null,
			currentView = "",
//			repairBillTo = cw.textField1,
//			repairShipTo = cw.textField2,
//			repairPrinter = cw.textField9,
			repairGrid = cw.dataGrid1;
			
//			here we need to display what happened in Repair
//		function displayRepairDetail(rmaid) {
//			
//		   	var rmaid = sources.companyRepairArr.RMAID;
//	   		sources.rMA.query("RMA_ID == :1", sources.companyRepairArr.RMAID, {
//	   			 onSuccess: function(event) {
//	   				var printerType = sources.rMA.Make+" "+sources.rMA.Model+" "+sources.rMA.SerialNumber;

//					repairPrinter.setValue(printerType);
//				}
//			});
//	
//		   sources.equipment_Inventory_Used.wak_getRepairLineItemArr({
//			   arguments: [sources.companyRepairArr.RMAID],
//			   onSuccess: function(event) {
//		
//			 		repairPartsArr = JSON.parse(event.result);
//				   sources.repairPartsArr.sync();
//				
//				   
//			   }
//		   });
//				
//			};
			
		function displayFilteredSelection(){
		   var vcompanyID = sources.web_Access.CompanyID;

		   sources.rMA.wak_getCompanyRepairsArr({
			   arguments: [vcompanyID],
			   onSuccess: function(event) {
			 		companyRepairArr = JSON.parse(event.result);
				   sources.companyRepairArr.sync();
//				   displayRepairDetail(data.userData.rmaid);
					displaySelectedRecord();
				   
			   }
		   });
	   }
	   
//	   function displaySelectedRecord(){
//	   		
////	   		var rmaid = sources.companyRepairArr.RMAID;
////	   		sources.rMA.query("RMA_ID == :1", rmaid);
//			var rmaid = sources.companyRepairArr.RMAID;
//	   		displayRepairDetail();
//	   		
//	   		
//	   };
	   
	   
	   function displaySelectedRecord(){
		   var rmaid = sources.companyRepairArr.RMAID,
			   loadView;

		   //determine which view should be displayed based on the currently selected repairsArr row
		 
		   if (sources.companyRepairArr.Type === "Depot_SC") {
			   loadView = "depot";
		   } else {
			   loadView = "onsite";
		   }

		   //display the data for the currently selected repairsArr row
		   if (currentView === loadView) {
		   	
			   detailCompLoaded.displayRepairDetail(rmaid);
		   } else {
			 
			   goToView(loadView, {
		
				   rmaid: rmaid
			   })
		   }

		   currentView = loadView;
        }
        
       function goToView(viewName, userData) {
    
           var view,
           		viewPath;

		   if (typeof userData === "undefined") {
			   userData = {};
		   }

         if(viewName === 'depot'){
          viewPath = '/Contracts.waPage/views/repairDetailDepot.waComponent';
         
         }
         
          if(viewName === 'onsite'){
          viewPath = '/Contracts.waPage/views/repairDetailOnsite.waComponent';
         
         }
           //load view into the main view component

           detailComp.removeComponent();
      
           detailComp.loadComponent({
				   path: viewPath,
				   userData: userData,
				   onSuccess:function(event){
					
					  detailCompLoaded = $$(this.id);
					if((viewName === "depot")||(viewName === "onsite")){
//					 displaySelectedRecord();
 						detailCompLoaded.displayRepairDetail(userData.rmaid);
					
					}
				   },
				   onError: function(event){
				
				   }
               }
           );
       }
			
			
			

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	WAF.addListener(repairGrid, "onRowClick", function() {
				displaySelectedRecord();
       		});
       		
//       		WAF.addListener(repairGrid, "onRowClick", function() {
//				displayRepairDetail();
//       		});
//       		

	// @region eventManager// @startlock
	// @endregion// @endlock


displayFilteredSelection();

	};// @lock


}// @startlock
return constructor;
})();// @endlock
