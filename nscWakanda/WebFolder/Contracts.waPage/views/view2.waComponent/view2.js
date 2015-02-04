
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
			rmaContractFilter = $$("textField5"),
			rmaFilter = $$("textField3"),
		    rmaReferenceFilter = $$("textField4"),
		    contractRefresh = $$("button1"),
		    referenceRefresh = $$("button2"),
		    rmaRefresh = $$("button9"),

//			repairBillTo = cw.textField1,
//			repairShipTo = cw.textField2,
//			repairPrinter = cw.textField9,
			viewAllFilter = $$("checkbox1"),
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
		   var vcompanyID = sources.web_Access.CompanyID,
		   		viewAll;
		   		
		   		viewAll = viewAllFilter.getValue();

		   sources.rMA.wak_getCompanyRepairsArr({
			   arguments: [vcompanyID,viewAll],
			   onSuccess: function(event) {
			 		companyRepairArr = JSON.parse(event.result);
				   sources.companyRepairArr.sync();


					displaySelectedRMARecord();
				   
			   }
		   });
	   }
	   
//	  \
//	   		
////	   		var rmaid = sources.companyRepairArr.RMAID;
////	   		sources.rMA.query("RMA_ID == :1", rmaid);
//			var rmaid = sources.companyRepairArr.RMAID;
//	   		displayRepairDetail();
//	   		
//	   		
//	   };
	   
	   
	   function displaySelectedRMARecord(){
		   var rmaid = sources.companyRepairArr.RMAID,
		     contractNumber = companyRepairArr.ContractNumber,
			   loadView;

		   debugger;
		 
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
//		   		sources.companyRepairArr.query("RMAID == :1",rmaid,{
		   		sources.rMA.query("RMA_ID == :1",rmaid,{
				userData : rmaid,
			   onSuccess: function(event) {
			   	
				sources.companyRepairArr.selectByKey(event.userData, {
                           onSuccess: function() {
                         
                               displaySelectedRMARecord();
                           },
                           onError: function() {
                               alert("there was a problem selecting the RMA");
                           }
                       });
			   }
		   });
		}
		   
		function displayRMAReferenceFilter(reference){

		   	sources.equipment_Encounters.query("ThirdPartyID == :1",reference,{
//			
			   onSuccess: function(event) {
				   
				   var rmaid = sources.equipment_Encounters.TransactionID;
				   if(sources.companyRepairArr.length === 0){
				   
				   		displayFilteredSelection();
//				   		displayRMAReferenceFilter(reference);
				   }else{
				    
				   		sources.companyRepairArr.query("RMAID == :1",rmaid,{
//				   
				    		onSuccess: function(event) {
				   			
				   			displaySelectedRMARecord();
				   			}
				   		});
				   }
			   }
		   });
		}
		
		function displayContractNumberFilter(contractNumber){
			debugger;
			sources.companyRepairArr.query("ContractNumber == :1",contractNumber,{
//				   
				onSuccess: function(event) {
					if(sources.companyRepairArr.length === 0){
				   		displayFilteredSelection();
//				   		displayContractNumberFilter(contractNumber);
				   }else{
				sources.companyRepairArr.query("RMAID == :1",sources.companyRepairArr.RMAID,{
//				   
				    		onSuccess: function(event) {
				   			
				   				displaySelectedRMARecord();
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
//				
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
				displaySelectedRMARecord();
       		});
       		

       		
       		
    rmaFilter.addListener("change", function(){
//		rmaReferenceFilter.setValue("");
		var rmaid = rmaFilter.getValue();
	
		displayRMAFilter(rmaid);
	
	});
	
	   rmaReferenceFilter.addListener("change", function(){
		
//		rmaFilter.setValue("");
		var reference = rmaReferenceFilter.getValue();
	
		displayRMAReferenceFilter(reference);
	
	});
	
		rmaContractFilter.addListener("change", function(){

		var contractNumber = rmaContractFilter.getValue();
	
		displayContractNumberFilter(contractNumber);
	
	
	});
	
	
	contractRefresh.addListener("click", function() {

		displayFilteredSelection();
       });
       
    rmaRefresh.addListener("click", function() {

		displayFilteredSelection();
       });
       
    referenceRefresh.addListener("click", function() {

		
		displayFilteredSelection();
       });
       
        viewAllFilter.addListener("click", function() {
//           goToView(sources.viewsArr.name);
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
