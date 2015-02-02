
/*global viewsArr:true, repairsArr:true */

/** @namespace */
var Wap = Wap || {};


WAF.onAfterInit = function() {
   "use strict";
   


   Wap.page = (function() {
   	
   	//module API, declaring variables, defining functions
//=================================================================================================

   	
   	
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
		   viewCompleteFilter = $$("checkbox3"),
		   setPhysicalCount = $$("checkbox5"),
		   submitPhysicalCount = $$("button1"),
		   printPhysicalCount = $$("button2");
		   

       //setup views
       viewsArr = [
           {name: "bids", path: "/SSP.waPage/views/view2.waComponent", left: 410, width: 690},
           {name: "repairs", path: "/SSP.waPage/views/view3.waComponent", left: 410, width: 690},
           {name: "inventory", path: "/SSP.waPage/views/view4.waComponent", left: 5, width: 1090},
           {name: "count", path: "/SSP.waPage/views/view5.waComponent", left: 5, width: 1090},
           {name: "shipTo", path: "/SSP.waPage/views/view6.waComponent", left: 5, width: 1090},
           {name: "received", path: "/SSP.waPage/views/view7.waComponent", left: 5, width: 1090}
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
            });
           
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
		setPhysicalCount.hide();
		submitPhysicalCount.hide();
		printPhysicalCount.hide();
		viewsGrid.show();
		viewBidFilter.show();
		viewInProgressFilter.show();
		viewCompleteFilter.show();
		$$("richText1").show();
		goToView('repairs');
//		   displaySelectedRecord();
	});


	viewInventoryBtn.addListener("click", function(){
		setPhysicalCount.show();
		submitPhysicalCount.hide();
		printPhysicalCount.hide();
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

	setPhysicalCount.addListener("click", function(){
	
		if(setPhysicalCount.getValue() === true){
			submitPhysicalCount.show();
			printPhysicalCount.show();
			Wap.viewComp.displayInventoryPhysicalCount();
		}else{
			submitPhysicalCount.hide();
			printPhysicalCount.hide();
			Wap.viewComp.displayInventoryFull();
		}

	});
	
	submitPhysicalCount.addListener("click", function(){
	
		var sendCount = true;
		for(var i=0; i<inventoryArr.length; i++) {
       	 if (inventoryArr[i].TechCount === "") {
        	
        	alertify.alert("You must enter values for all items.");
        	i = inventoryArr.length;
        	sendCount = false;
        	};
    	}
    	if(sendCount === true){
			var vVendorID = sources.web_Access.CompanyID;
			sources.warehouses.query('VendorID == :1',vVendorID,{
				onSuccess: function () {
			
				
				var warehouseID = sources.warehouses.WareHouseID;
				sources.inventory_WarehouseCount.wak_setInventoryUpdateComplete(warehouseID);
				alertify.alert("Physical count has been submitted.");
			}
			});
		}
	});
	
	printPhysicalCount.addListener("click", function(){
	
		alertify.alert("Inventory list has been created.");
//		var vVendorID = sources.web_Access.CompanyID;
//		sources.warehouses.query('VendorID == :1',vVendorID,{
//			onSuccess: function () {
//				debugger;
//				
//				var warehouseID = sources.warehouses.WareHouseID;
//				sources.inventory_WarehouseCount.wak_setInventoryUpdateComplete(warehouseID);
//				alertify.alert("Inventory list has been created.");
//			}
//		});
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
				setPhysicalCount.hide();
				submitPhysicalCount.hide();
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