


/*global viewsArr:true, repairsArr:true */
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
//		   viewShipToBtn = $$("button5"),//equiment
//		   viewReceivedBtn = $$("button6"),//onsite
           viewComp = $$("componentDetail"),
			viewCompLoaded = $$(viewComp.id),
		   
//		   viewBidsRepairsBtn = $$("button7"),
//		   viewBidFilter = $$("checkbox1"),
//		   viewInProgressFilter = $$("checkbox2"),
//		   viewCompleteFilter = $$("checkbox3");
			currentView = "";

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
        
	   function displayFilteredSelection(){
		   var vcompanyID = sources.web_Access.CompanyID;
//			   isBid,
//			   isInProgress,
//			   isComplete;

//		   isBid = viewBidFilter.getValue();
//		   isInProgress = viewInProgressFilter.getValue();
//		   isComplete = viewCompleteFilter.getValue();

		   sources.contracts.wak_getContractArr({
			   arguments: [vcompanyID],
			   onSuccess: function(event) {
			 		contractArr = JSON.parse(event.result);
				   sources.contractArr.sync();
				   displaySelectedRecord();
				   
			   }
		   });
	   }
        
        function displaySelectedRecord(){
		   var contractID = sources.contractArr.ContractID,
			   loadView;
			console.log('displaySelectedRecord');
		   //determine which view should be displayed based on the currently selected repairsArr row
//		   if (sources.repairsArr.Status === "Repair") {
//			   loadView = "repairs";
//		   } else {
//			   loadView = "bids";
//		   }
			loadView = "contract";

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

		//Mike 12/09/14
//       WAF.addListener(viewBidFilter, "click", function() {
//		displayFilteredSelection();
//       });
//       
//       //Mike 12/09/14
//       WAF.addListener(viewInProgressFilter, "click", function() {
//		displayFilteredSelection();
//       });
//       
//       //Mike 12/09/14
//       WAF.addListener(viewCompleteFilter, "click", function() {
//		displayFilteredSelection();
//       });

       //when clicking a row on the views listbox, load the view
       WAF.addListener(viewsGrid, "onRowClick", function() {
//           goToView(sources.viewsArr.name);
		displaySelectedRecord();
       });


	viewContractBtn.addListener("click", function() {
		viewsGrid.show();
//		viewBidFilter.show();
//		viewInProgressFilter.show();
//		viewCompleteFilter.show();
//		$$("richText1").show();
		goToView('contract');
//		 
	   });


	viewRepairBtn.addListener("click", function(){
		viewsGrid.hide();
//		viewBidFilter.hide();
//		viewInProgressFilter.hide();
//		viewCompleteFilter.hide();
//		$$("richText1").hide();
		goToView('repair');
});
	
	
//	viewCountBtn.addListener("click", function(){
//		viewsGrid.hide();
//		goToView('count');
//});
//	
//	
//	viewShipToBtn.addListener("click", function(){
//	console.log('button5');
//		viewsGrid.hide();
//	goToView('shipTo');
//});
//	
//	
//	viewReceivedBtn.addListener("click", function(){
//	console.log('button6');
//		viewsGrid.hide();
//	goToView('received');
//});
	
//		This is essentially the on load portion
//		var vSSPID = '38789';
		sources.web_Access.query('WebLogOn == :1',Wap.auth.getCurrUserName(),{
			onSuccess: function(event) {
//				console.log('CurrentUser '+Wap.auth.getCurrUserName());
			
				sources.contracts.query('BillToCompanyID == :1',sources.web_Access.CompanyID,{
					onSuccess: function(event) {
						console.log('CompanyID '+sources.web_Access.CompanyID);
					}
				});
				
//				viewBidFilter.setValue(true) ;
//				viewInProgressFilter.setValue(true) ;
//				viewCompleteFilter.setValue(false) ;
				console.log('displayFilteredSelection');
				displayFilteredSelection();
				
				
//			var vSSPID = sources.web_Access.CompanyID;
//				//debugger;
//				sources.rMA_Onsite_Bid.wak_getRepairsArr({
//			
//					arguments: [vSSPID],
//					onSuccess: function(event) {
//						//debugger;
//						repairsArr = JSON.parse(event.result);
//						sources.repairsArr.sync();
//						
//	}
//});
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