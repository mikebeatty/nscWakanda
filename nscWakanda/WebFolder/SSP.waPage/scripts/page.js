
/*global viewsArr:true, repairsArr:true */

/** @namespace */
var Wap = Wap || {};


WAF.onAfterInit = function() {
   "use strict";
   


   Wap.page = (function() {
   	
   	//module API, declaring variables, defining functions
//=================================================================================================

console.log('page.js');
   	
   	
       var viewsGrid = $$("dataGrid1"),//viewsGrid = $$("component1"),
		   viewInventoryBtn = $$("button3"),//equiment
		   viewCountBtn = $$("button4"),//onsite
		   viewShipToBtn = $$("button5"),//equiment
		   viewReceivedBtn = $$("button6"),//onsite
           viewComp = $$("componentDetail"),
		viewCompLoaded = $$(viewComp.id),
		   currentView = "",
		   viewBidsRepairsBtn = $$("button7"),
		   viewBidFilter = $$("checkbox1"),
		   viewInProgressFilter = $$("checkbox2"),
		   viewCompleteFilter = $$("checkbox3");

       //setup views
       viewsArr = [
           {name: "bids", path: "/SSP.waPage/views/view2.waComponent", left: 310, width: 690},
           {name: "repairs", path: "/SSP.waPage/views/view3.waComponent", left: 310, width: 690},
           {name: "inventory", path: "/SSP.waPage/views/view4.waComponent", left: 5, width: 990},
           {name: "count", path: "/SSP.waPage/views/view5.waComponent", left: 5, width: 990},
           {name: "shipTo", path: "/SSP.waPage/views/view6.waComponent", left: 5, width: 990},
           {name: "received", path: "/SSP.waPage/views/view7.waComponent", left: 5, width: 990}
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
		   var vSSPID = sources.web_Access.CompanyID,
			   isBid,
			   isInProgress,
			   isComplete;

		   isBid = viewBidFilter.getValue();
		   isInProgress = viewInProgressFilter.getValue();
		   isComplete = viewCompleteFilter.getValue();

		   sources.rMA_Onsite_Bid.wak_getRepairsArr({
			   arguments: [vSSPID,isBid,isInProgress,isComplete],
			   onSuccess: function(event) {
			
			 		repairsArr = JSON.parse(event.result);
				   sources.repairsArr.sync();
				   displaySelectedRecord();
				   
			   }
		   });
	   }
        
        function displaySelectedRecord(){
		   var rmaid = sources.repairsArr.RMAID,
			   loadView;

		   //determine which view should be displayed based on the currently selected repairsArr row
		   if (sources.repairsArr.Status === "Repair") {
			   loadView = "repairs";
		   } else {
			   loadView = "bids";
		   }

		   //display the data for the currently selected repairsArr row
		   if (currentView === loadView) {
		   	
			   Wap.viewComp.displayRepairDetail(rmaid);
		   } else {
			   goToView(loadView, {
		
				   rmaid: rmaid
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
					if((viewName === "bids")||(viewName === "repairs")){
//					 displaySelectedRecord();
 						Wap.viewComp.displayRepairDetail(userData.rmaid);
					
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
       WAF.addListener(viewBidFilter, "click", function() {
		displayFilteredSelection();
       });
       
       //Mike 12/09/14
       WAF.addListener(viewInProgressFilter, "click", function() {
		displayFilteredSelection();
       });
       
       //Mike 12/09/14
       WAF.addListener(viewCompleteFilter, "click", function() {
		displayFilteredSelection();
       });

       //when clicking a row on the views listbox, load the view
       WAF.addListener(viewsGrid, "onRowClick", function() {
//           goToView(sources.viewsArr.name);
		displaySelectedRecord();
       });


	viewBidsRepairsBtn.addListener("click", function() {
		viewsGrid.show();
		viewBidFilter.show();
		viewInProgressFilter.show();
		viewCompleteFilter.show();
		$$("richText1").show();
		goToView('repairs');
//		   displaySelectedRecord();
	   });


	viewInventoryBtn.addListener("click", function(){
		viewsGrid.hide();
		viewBidFilter.hide();
		viewInProgressFilter.hide();
		viewCompleteFilter.hide();
		$$("richText1").hide();
		goToView('inventory');
});
	
	
	viewCountBtn.addListener("click", function(){
		viewsGrid.hide();
		goToView('count');
});
	
	
	viewShipToBtn.addListener("click", function(){
	console.log('button5');
		viewsGrid.hide();
	goToView('shipTo');
});
	
	
	viewReceivedBtn.addListener("click", function(){
	console.log('button6');
		viewsGrid.hide();
	goToView('received');
});
	
//		This is essentially the on load portion
//		var vSSPID = '38789';
		sources.web_Access.query('WebLogOn == :1',Wap.auth.getCurrUserName(),{
			onSuccess: function(event) {
//				console.log('CurrentUser '+Wap.auth.getCurrUserName());
			
				sources.rMA_OnSite.query('SSP_ID == :1',sources.web_Access.CompanyID,{
					onSuccess: function(event) {
						console.log('CompanyID '+sources.web_Access.CompanyID);
					}
				});
				
				viewBidFilter.setValue(true) ;
				viewInProgressFilter.setValue(true) ;
				viewCompleteFilter.setValue(false) ;
				
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
//						displaySelectedRecord();
//	}
//});
			}
			
		});
		




		
		


//public API, where we place functions we want accessible from outside environment
//=================================================================================================
        return {
           goToView: goToView,//Wap.page.goToView()
          formatAddress: formatAddress
 
        };


   }());
   
   

};