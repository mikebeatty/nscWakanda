
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

		function displayContractDetail(){
//			debugger; - this is here while I figure out some view loading issues in Contracts.page.js
		}
			
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

		 
		   if (sources.companyRepairArr.Type === "Depot_SC") {
			   loadView = "depot";
		   } else {
			   loadView = "onsite";
		   }

		   //display the data for the currently selected repairsArr row
		   if (currentView === loadView) {
		  
		   	
		   	if (rmaid === null){
			 rmaid = 0;
			   }
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
                         		if(sources.companyRepairArr.length === 0){
					   				alertify.alert("RMA "+rmaid+" could not be found.");
					   				}else{
                               		displaySelectedRMARecord();
                               		rmaFilter.setValue("");
                           			}
                           },
                           onError: function() {
                               alert("there was a problem selecting RMA "+rmaid+".");
                           }
                       });
			   }
		   });
		}
		   
		   
		   
		   
		function displayRMAReferenceFilter(reference){
			
			debugger;
			
			sources.equipment_Encounters.wak_filterRMAReferenceNumber({
				arguments: [rmaReferenceFilter.getValue()],
						onSuccess: function(event) {
				debugger;
							companyRepairArr = JSON.parse(event.result);
							if(companyRepairArr.length > 0){
							   sources.companyRepairArr.sync();
							   displaySelectedRMARecord();
							   rmaReferenceFilter.setValue("");
						   	}else{
								alertify.alert("Reference number "+rmaReferenceFilter.getValue()+" not found");
								displayFilteredSelection();
		
							}

					}
			});

		  
		}
		
		function displayContractNumberFilter(contractNumber){
			if(contractNumber != ""){
				sources.companyRepairArr.query("ContractNumber == :1",contractNumber,{
	//				   
					onSuccess: function(event) {
						if(sources.companyRepairArr.length === 0){
							alertify.alert("There are no RMA records for contract "+contractNumber+".");
					   		displayFilteredSelection();
					   		rmaContractFilter.setValue("");
	//				   	
					   }else{

						}
					}
				});
			}
		
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


    if (!Wap.page.repairCompHasBeenLoaded) {
        Wap.page.repairCompHasBeenLoaded = true;

        rmaFilter.addListener("change", function(){

//		rmaReferenceFilter.setValue("");
//		rmaContractFilter.setValue("");

            var rmaid = rmaFilter.getValue();
            if (rmaid != ""){
                displayRMAFilter(rmaid);
            }

        });

        rmaReferenceFilter.addListener("change", function(){
            debugger;
//		rmaFilter.setValue("");
//		rmaContractFilter.setValue("");
            var reference = rmaReferenceFilter.getValue();
            if (reference != ""){
                displayRMAReferenceFilter(reference);
            }

        });

        rmaContractFilter.addListener("change", function(){

//		rmaFilter.setValue("");
//		rmaReferenceFilter.setValue("");
            var contractNumber = rmaContractFilter.getValue();
            if (contractNumber != ""){
                displayContractNumberFilter(contractNumber);
            }

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
    }

//       		WAF.addListener(repairGrid, "onRowClick", function() {
//				displayRepairDetail();
//       		});
//       		

	// @region eventManager// @startlock
	// @endregion// @endlock


displayFilteredSelection();
	//public API
			//=================================================================================================
//	this.displayRepairDetail = displayRepairDetail;
	this.displayContractDetail = displayContractDetail;

	};// @lock


}// @startlock
return constructor;
})();// @endlock
