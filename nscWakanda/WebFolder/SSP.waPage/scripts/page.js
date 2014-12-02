﻿/*global viewsArr:true *//** @namespace */var Wap = Wap || {};WAF.onAfterInit = function() {   "use strict";      Wap.page = (function() {   	   	//module API, declaring variables, defining functions//=================================================================================================console.log('page.js');   	   	       var viewsGrid = $$("dataGrid1"),//viewsGrid = $$("component1"),           viewEquipmentBtn = $$("button1"),//equiment		   viewOnsiteBtn = $$("button2"),//onsite		    viewInventoryBtn = $$("button3"),//equiment		   viewCountBtn = $$("button4"),//onsite		    viewShipToBtn = $$("button5"),//equiment		   viewReceivedBtn = $$("button6"),//onsite           viewComp = $$("componentDetail"),			viewCompLoaded = $$(viewComp.id);       //setup views       viewsArr = [           {name: "equipment", path: "/SSP.waPage/views/view2.waComponent"},           {name: "onSite", path: "/SSP.waPage/views/view3.waComponent"},           {name: "inventory", path: "/SSP.waPage/views/view4.waComponent"},           {name: "count", path: "/SSP.waPage/views/view5.waComponent"},           {name: "shipTo", path: "/SSP.waPage/views/view6.waComponent"},           {name: "received", path: "/SSP.waPage/views/view7.waComponent"}       ];       sources.viewsArr.sync();       /**        * load a view into the main view component        * @param {string} viewName - name of the view as setup in the viewsArr        * @param {object} [userData] - data to send to the component when it loads into the view        */                function displaySelectedRecord(){                var rmaid = sources.repairsArr.RMAID;   		sources.equipment_Encounters.query('TransactionID == :1',rmaid);		sources.rMA_OnSite.query('RMA_ID == :1',rmaid,{		 onSuccess: function(event){		 	sources.rMA.query('RMA_ID == :1',rmaid,{		 	 onSuccess: function(event){		 	 	Wap.viewComp.displayRepairDetail();					 	 }		 	});//		 	sources.equipment_Encounters.wak_getEquipmentArr({//			//					arguments: [rmaid],//					onSuccess: function(event) {//					//debugger;//					equipmentArr = JSON.parse(event.result);//				sources.equipmentArr.sync();//	}//});		 		 		 }				});							        };               function goToView(viewName) {           var view;           //get info about the view we want to go to           view = _.find(viewsArr, function(view) {return view.name === viewName;});           //load view into the main view component           viewComp.removeComponent();           viewComp.loadComponent(               {path: view.path,                              onSuccess:function(event){               Wap.viewComp = $$(this.id);               }               }           );       }//on load, attahce event listeners, run code we want to run when page loads//=================================================================================================       //when clicking a row on the views listbox, load the view       WAF.addListener(viewsGrid, "onRowClick", function() {//           goToView(sources.viewsArr.name);		displaySelectedRecord();       });viewEquipmentBtn.addListener("click", function(){	console.log('button1');	goToView('equipment');});viewOnsiteBtn.addListener("click", function(){	console.log('button2');	goToView('onSite');});viewInventoryBtn.addListener("click", function(){		goToView('inventory');});			viewCountBtn.addListener("click", function(){	console.log('button4');	goToView('count');});			viewShipToBtn.addListener("click", function(){	console.log('button5');	goToView('shipTo');});			viewReceivedBtn.addListener("click", function(){	console.log('button6');	goToView('received');});	//		This is essentially the on load portion//		var vSSPID = '38789';		sources.web_Access.query('WebLogOn == :1',Wap.auth.getCurrUserName(),{			onSuccess: function(event) {//				console.log('CurrentUser '+Wap.auth.getCurrUserName());							sources.rMA_OnSite.query('SSP_ID == :1',sources.web_Access.CompanyID,{					onSuccess: function(event) {						console.log('CompanyID '+sources.web_Access.CompanyID);					}				});			var vSSPID = sources.web_Access.CompanyID;				//debugger;				sources.rMA_Onsite_Bid.wak_getRepairsArr({								arguments: [vSSPID],					onSuccess: function(event) {					//debugger;					repairsArr = JSON.parse(event.result);				sources.repairsArr.sync();	}});			}					});						        goToView("equipment");//public API, where we place functions we want accessible from outside environment//=================================================================================================        return {           goToView: goToView//Wap.page.goToView()                  };   }());      };