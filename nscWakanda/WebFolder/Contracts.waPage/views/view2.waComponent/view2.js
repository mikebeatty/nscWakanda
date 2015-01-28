﻿
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
			rmaFilter = $$("textField3"),
		    rmaReferenceFilter = $$("textField4"),
		    contractRefresh = $$("button1"),
		    rmaRefresh = $$("button2"),
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
        
		function displayRMAFilter(){
		 
		   var rmaid = Number(rmaFilter.getValue());
		   		sources.companyRepairArr.query("RMAID == :1",rmaid,{
			
			   onSuccess: function(event) {
				   if(sources.companyRepairArr.RMAID != null){
				   displaySelectedRecord();
				   }else{
				   alertify.alert("RMA "+rmaid+" was not found.");
				   displayFilteredSelection();
				   }
			   }
		   });
		}
		   
		function displayRMAReferenceFilter(reference){

		   	sources.equipment_Encounters.query("ThirdPartyID == :1",reference,{
//			
			   onSuccess: function(event) {
				   debugger;
				   var rmaid = sources.equipment_Encounters.TransactionID;
				   if(sources.companyRepairArr.length === 0){
				   
				   		displayFilteredSelection();
				   		displayRMAReferenceFilter(reference);
				   }else{
				    
				   		sources.companyRepairArr.query("RMAID == :1",rmaid,{
//				   
				    		onSuccess: function(event) {
				   			debugger;
				   			displaySelectedRecord();
				   			}
				   		});
				   }
			   }
		   });
		}
		   
//		   }else{
////		   	
//		 
//		   	sources.equipment_Encounters.wak_getContractPrintersArr({
//			   	arguments: [contractID],
//			   	onSuccess: function(event) {
//			 		equipmentArr = JSON.parse(event.result);
//				   	sources.equipmentArr.sync();
//		  			}
//		  
//		  		});
//		   
//	   		}	
			
		
        
       function goToView(viewName, userData) {
    
           var view,
           		viewPath;

		   if (typeof userData === "undefined") {
			   userData = {};
		   }

         if(viewName === 'depot'){
          viewPath = '/Contracts.waPage/views/repairDepot.waComponent';
         
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
       		

       		
       		
    rmaFilter.addListener("change", function(){
//		rmaReferenceFilter.setValue("");
		var rmaid = rmaFilter.getValue();
	
		displayRMAFilter(rmaid);
	
	});
	
	   rmaReferenceFilter.addListener("change", function(){
		debugger;
//		rmaFilter.setValue("");
		var reference = rmaReferenceFilter.getValue();
	
		displayRMAReferenceFilter(reference);
	
	});
	
	contractRefresh.addListener("click", function() {
//           goToView(sources.viewsArr.name);
		debugger;
		displayFilteredSelection();
       });
       
    rmaRefresh.addListener("click", function() {
//           goToView(sources.viewsArr.name);
		debugger;
		displayFilteredSelection();
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
