
/*global viewsArr:true, contractArr:true */
/*Contracts page*/
/** @namespace */
var Wap = Wap || {};


WAF.onAfterInit = function() {
   "use strict";
   console.log('WAF.onAfterInit');


   Wap.page = (function() {
   	
   	//module API, declaring variables, defining functions
//=================================================================================================

console.log('page.js');
   	
   	
       var viewsGrid = $$("dataGrid1"),//viewsGrid = $$("component1"),
		   viewContractBtn = $$("button7"),//equiment
		   viewRepairBtn = $$("button3"),//onsite
		   contractRefresh = $$("button1"),
		   referenceRefresh = $$("button2"),
		   rmaRefresh = $$("button9"),
//		   viewShipToBtn = $$("button5"),//equiment
//		   viewReceivedBtn = $$("button6"),//onsite
           viewComp = $$("componentDetail"),
			viewCompLoaded = $$(viewComp.id),
		   contractFilter = $$("textField1"),
		   referenceFilter = $$("textField2"),
		   rmaFilter = $$("textField3"),
		   rmaReferenceFilter = $$("textField4"),
		   rmaContractFilter = $$("textField5"),
		   serialFilter = $$("textField7"),
		   loggedInAs = $$("textField6"),
		   sorryText = $$("richText3"),
//		   viewBidsRepairsBtn = $$("button7"),
//		   viewBidFilter = $$("checkbox1"),
//		   viewInProgressFilter = $$("checkbox2"),
//		   viewCompleteFilter = $$("checkbox3");
			viewAllFilter = $$("checkbox1"),
			filterQuerySkip = true,
			currentView = "",
           uriParams,
           goToContractID;

       //setup views
       viewsArr = [
           {name: "contract", path: "/Contracts.waPage/views/view1.waComponent", left: 410, width: 690},
           {name: "repair", path: "/Contracts.waPage/views/view2.waComponent", left: 5, width: 1090},
//           {name: "inventory", path: "/SSP.waPage/views/view4.waComponent", left: 5, width: 1090},
//           {name: "count", path: "/SSP.waPage/views/view5.waComponent", left: 5, width: 1090},
//           {name: "shipTo", path: "/SSP.waPage/views/view6.waComponent", left: 5, width: 1090},
//           {name: "received", path: "/SSP.waPage/views/view7.waComponent", left: 5, width: 1090}
       ];
       sources.viewsArr.sync();
       
       function loadContract() {
         
//            sources.contracts.query("GALO_ContractNum == :1 and BillToCompanyID = :2", {
//                params: [GALO_ContractNum, clientKey],
			sources.contracts.query("ContractID == :1 or GALO_ContractNum == :1", {
                params: [ContractID],
                onSuccess: function() {
                    if (sources.contracts.length > 0) {
                    	 sorryText.hide();
//                        viewCompWidget.loadComponent({
//                            onSuccess: function() {
//                                Wap.viewComp = $$(this.id);
//                                Wap.viewComp.displayContractDetail(sources.contracts.ContractID);
//                            }
//                        });
                    } else {
                        viewComp.hide();
                        sorryText.show();
                    }
                },
                onError: function() {
                    viewComp.hide();
                    sorryText.show();
                }
            });
        }

		function formatAddress(addressEntity){
			var vRepairAddress;

			vRepairAddress = addressEntity.CompanyName+String.fromCharCode(13);
			vRepairAddress += addressEntity.Address1+String.fromCharCode(13);
			vRepairAddress += addressEntity.Address2+String.fromCharCode(13);
			vRepairAddress += addressEntity.City+String.fromCharCode(32)+addressEntity.State+String.fromCharCode(32)+addressEntity.Zip+String.fromCharCode(13);
			vRepairAddress += addressEntity.Phone+String.fromCharCode(13);
			
			return vRepairAddress;
			
			
		
		}
       /**
        * load a view into the main view component
        * @param {string} viewName - name of the view as setup in the viewsArr
        * @param {object} [userData] - data to send to the component when it loads into the view
        */
        
	   function displayFilteredSelection(goToContractID){
		   var vcompanyID = sources.web_Access.CompanyID,
		   		vAll = false;
			
			vAll = viewAllFilter.getValue();

           if (typeof goToContractID === "undefined") {
               goToContractID = null;
           }

		   sources.contracts.wak_getContractArr({
               userData: goToContractID,
			   arguments: [vcompanyID,vAll],
			   onSuccess: function(event) {
		
			 		contractArr = JSON.parse(event.result);
				   sources.contractArr.sync();

                   if (event.userData) {
                       sources.contractArr.selectByKey(event.userData, {
                           onSuccess: function() {
                               displaySelectedRecord();
                           },
                           onError: function() {
                               alert("there was a problem selecting the contract");
                           }
                       });
                   } else {
                       displaySelectedRecord();
                   }

			   }
		   });
	   }
        
        function displaySelectedRecord(){
		   var contractID = sources.contractArr.ContractID,
			   loadView;
		
		   //determine which view should be displayed based on the currently selected repairsArr row
//		   if (sources.repairsArr.Status === "Repair") {
//			   loadView = "repairs";
//		   } else {
//			   loadView = "bids";
//		   }

			loadView = "contract";
//			loadView = sources.viewsArr.getAttributeValue('name');

		   //display the data for the currently selected repairsArr row
		   if (currentView === loadView) {
		   	

			   Wap.viewComp.displayContractDetail(contractID);
		   } else {
			   goToView(loadView, {
		
				   contractID: contractID
			   })
		   }

		   currentView = loadView;
        }
        
       function goToView(viewName, userData) {
    
           var view;

		   if (typeof userData === "undefined") {
			   userData = {};
		   }

           //get info about the view we want to go to
           view = _.find(viewsArr, function(view) {return view.name === viewName;});

           //load view into the main view component

           viewComp.removeComponent();
           viewComp.setLeft(view.left);
           viewComp.setWidth(view.width);
      
           viewComp.loadComponent({
				   path: view.path,
				   userData: userData,
				   onSuccess:function(event){
	
					  Wap.viewComp = $$(this.id);
					if((viewName === "contract")||(viewName === "repairs")){
//					 
 						Wap.viewComp.displayContractDetail(userData.contractID);
					
					}
				   },
				   onError: function(event){
				
				   }
               }
           );
       }

//on load, attahce event listeners, run code we want to run when page loads
//=================================================================================================

       //check to see if the user is using a url with a contract id
       uriParams = new URI(document.URL).search(true);
       if (typeof uriParams.C !== "undefined") {
           goToContractID = uriParams.C;
       } else {
           goToContractID = null;
       }

       //lets make sure the user is logged in, if not kick them to the login page
//       if (Wap.auth.isLoggedIn() === false) {

//           //if the url had a go to contract id, throw in local storage so the login page
//           //can put back in the url after the user logs in
//           if (goToContractID) {
//               localStorage.setItem("ContractID", goToContractID);
//           }
//           window.location = "/";
//       }



       //when clicking a row on the views listbox, load the view
       WAF.addListener(viewsGrid, "onRowClick", function() {
//        
		displaySelectedRecord();
       });
       
     contractRefresh.addListener("click", function() {

		displayFilteredSelection();
       });
       
		rmaRefresh.addListener("click", function() {

			displayFilteredSelection();
	       });
       
     referenceRefresh.addListener("click", function() {
//          
		displayFilteredSelection();
       });
       
       viewAllFilter.addListener("click", function() {
//       
		displayFilteredSelection();
       });


	viewContractBtn.addListener("click", function() {
		viewsGrid.show();
		contractFilter.show();
		referenceFilter.show();
		serialFilter.show();
		rmaFilter.hide();
		rmaReferenceFilter.hide();
//		rmaRefresh.hide();
		rmaContractFilter.hide();
//		contractRefresh.show();
//		rmaRefresh.hide();
//		viewBidFilter.show();
//		viewInProgressFilter.show();
//		viewCompleteFilter.show();
//		$$("richText1").show();
		goToView('contract');
//		 
	   });


	viewRepairBtn.addListener("click", function(){
		viewsGrid.hide();
		contractFilter.hide();
		referenceFilter.hide();
		serialFilter.hide();
		rmaFilter.show();
		rmaReferenceFilter.show();
//		rmaRefresh.show();
		rmaContractFilter.show();
//		contractRefresh.hide();
//		rmaRefresh.show();
//		viewBidFilter.hide();
//		viewInProgressFilter.hide();
//		viewCompleteFilter.hide();
//		$$("richText1").hide();
		goToView('repair');
	});
	
	contractFilter.addListener("change", function(){
//		referenceFilter.setValue("");
	
		sources.contracts.query("GALO_ContractNum == :1",contractFilter.getValue(),{
	
			onSuccess:function(event){
//				wak_getFilterResults(contractFilter.getValue())
				if(sources.contracts.GALO_ContractNum != null){
				var goToContractID = sources.contracts.GALO_ContractNum;
				displayFilteredSelection(goToContractID);
				
					}else{
				alertify.alert("Contract "+contractFilter.getValue()+" not found");
				}
			}
	
		});
	
	
	});
	

	
	referenceFilter.addListener("change", function(){
	

		sources.contracts.wak_filterContractReferenceNum({
				arguments: [referenceFilter.getValue()],
						onSuccess: function(event) {
							debugger;
							contractArr = JSON.parse(event.result);
							if(contractArr.length > 0){
				   sources.contractArr.sync();
				   displaySelectedRecord();
				   	}else{
				alertify.alert("Reference number "+referenceFilter.getValue()+" not found");
					sources.contracts.query('BillToCompanyID == :1',sources.web_Access.CompanyID,{
					onSuccess: function(event) {
						console.log('CompanyID '+sources.web_Access.CompanyID);
					}
				});
				

				displayFilteredSelection(goToContractID);
				}
//						var goToContractID = sources.contracts.ContractID;
//							displayFilteredSelection(goToContractID);
							}
					});

//		sources.equipment_Encounters.query("ThirdPartyID == :1",referenceFilter.getValue(),{
////	
//			onSuccess:function(event){
//				if(sources.equipment_Encounters.ThirdPartyID != null){

//					sources.contracts.query("ContractID == :1",sources.equipment_Encounters.ContractID,{
//						onSuccess:function(event){
////				wak_getFilterResults(contractFilter.getValue())
//						if(sources.contracts.GALO_ContractNum != null){
//						var goToContractID = sources.contracts.GALO_ContractNum;
//						displayFilteredSelection(goToContractID);
//					
//							}else{
//						alertify.alert("Reference "+referenceFilter.getValue()+" not found");
//							}
//						}
//					});
//				}else{
//					alertify.alert("Reference "+referenceFilter.getValue()+" not found");
////					displayFilteredSelection();
//				}
//			}
////	
//		});
//	
//	
	});
	
		serialFilter.addListener("change", function(){
	
	
		sources.contracts.wak_filterContractSerialNumber({
						arguments: [serialFilter.getValue()],
						onSuccess: function(event) {
							debugger;
							contractArr = JSON.parse(event.result);
							if(contractArr.length > 0){
				   sources.contractArr.sync();
				   displaySelectedRecord();
				   	}else{
				alertify.alert("Serial number "+serialFilter.getValue()+" not found");
					sources.contracts.query('BillToCompanyID == :1',sources.web_Access.CompanyID,{
					onSuccess: function(event) {
						console.log('CompanyID '+sources.web_Access.CompanyID);
					}
				});
				

				displayFilteredSelection(goToContractID);
				}
//						var goToContractID = sources.contracts.ContractID;
//							displayFilteredSelection(goToContractID);
							}
					});
		

		});
//	
	
//		This is essentially the on load portion
//		var vSSPID = '38789';
		sources.web_Access.query('WebLogOn == :1',Wap.auth.getCurrUserName(),{
			onSuccess: function(event) {
//				console.log('CurrentUser '+Wap.auth.getCurrUserName());

				loggedInAs.setValue("logged in as: "+sources.web_Access.EmailAddress);
			
				sources.contracts.query('BillToCompanyID == :1',sources.web_Access.CompanyID,{
					onSuccess: function(event) {
						console.log('CompanyID '+sources.web_Access.CompanyID);
					}
				});
				

				displayFilteredSelection(goToContractID);

			}
			
		});
		




		
		


//public API, where we place functions we want accessible from outside environment
//=================================================================================================
        return {
           goToView: goToView//Wap.page.goToView()
           
//          formatAddress: formatAddress
 
        };


   }());
   
   

};