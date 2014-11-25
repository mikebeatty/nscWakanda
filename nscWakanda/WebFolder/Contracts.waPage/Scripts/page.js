<<<<<<< HEAD
﻿//Welsh Harris (14:21):/** * @fileOverview Code to init everything for the main app page * @author Welsh Harris * @created 11/24/2014 *//** @namespace */var Wap = Wap || {};WAF.onAfterInit = function() {    "use strict";    Wap.page = (function() {//        //module API        //=================================================================================================       var viewsGrid = $$("dataGrid1"),           viewComp = $$("componentDetail"),           views;        //setup views        viewsArr = [           {name: "contract", path: "/Contracts.waPage/views/view1.waComponent"}           ];                  sources.viewsArr.sync();        views = [            {name: "auth", description: "@Show Portal", path: "/portal.waPage/views/auth.waComponent"},        ];        /**         * load a view into the main view component         * @param {string} viewName - name of the view as setup in the viewsArr         * @param {object} [userData] - data to send to the component when it loads into the view         */                  function displaySelectedRecord(){                var contractID = sources.contractArr.Contract;		sources.contracts.query('ContractID == :1',contractID);//		sources.rMA_OnSite.query('RMA_ID == :1',contractID);				viewComp.displayContractDetail();			        };                              		function goToView(viewName) {           var view;           //get info about the view we want to go to           view = _.find(viewsArr, function(view) {return view.name === viewName;});           //load view into the main view component           viewComp.removeComponent();           viewComp.loadComponent(               {path: view.path}           );       }        /**         * Handle logging out         */        function onAfterLogout() {            goToView("auth");        }        //on load        //=================================================================================================        function onLoad() {                      //clicking tabs loads the appropriate view//            WAF.addListener(messagesTab, "click", function() {//                goToView("messages");//            });       WAF.addListener(viewsGrid, "onRowClick", function() {//           goToView(sources.viewsArr.name);		displaySelectedRecord();       });            //        Wap.auth.getCurrUserName()//		console.log('getname');		var userName = WAF.directory.currentUser().fullName;		console.log(userName);		sources.web_Access.query('WebLogOn == :1',userName);		console.log(sources.web_Access.length);		var vcompanyID = sources.web_Access.CompanyID;		console.log(vcompanyID);		var vcompanyID = '73718';		//		sources.rMA_OnSite.query('SSP_ID == :1',sources.web_Access.CompanyID);//		sources.rMA_OnSite.query('SSP_ID == :1',vSSPID);		sources.contracts.wak_getContractArr(vcompanyID,{				//consider using WakAPI as standard table		onSuccess: function(event) {		contractArr = JSON.parse(event.result);		sources.contractArr.sync();	}			});                }                   goToView("contract");        //public API        //=================================================================================================        return {            goToView: goToView,            onLoad: onLoad        };    }());    Wap.page.onLoad();};
=======
//Welsh Harris (14:21):
/**
 * @fileOverview Code to init everything for the main app page
 * @author Welsh Harris
 * @created 11/24/2014
 */

/** @namespace */
var Wap = Wap || {};


WAF.onAfterInit = function() {
    "use strict";

    Wap.page = (function() {

//        //module API
        //=================================================================================================
       var viewsGrid = $$("dataGrid1"),
           viewComp = $$("componentDetail"),
           views;

        //setup views
        viewsArr = [
           {name: "contract", path: "/Contracts.waPage/views/view1.waComponent"}
           ];
           
       sources.viewsArr.sync();
//        views = [
//            {name: "auth", description: "@Show Portal", path: "/portal.waPage/views/auth.waComponent"},
//        ];

        /**
         * load a view into the main view component
         * @param {string} viewName - name of the view as setup in the viewsArr
         * @param {object} [userData] - data to send to the component when it loads into the view
         */
         
         function displaySelectedRecord(){
        
        var contractID = sources.contractArr.Contract;
		sources.contracts.query('ContractID == :1',contractID);
//		sources.rMA_OnSite.query('RMA_ID == :1',contractID);
		
		viewComp.displayContractDetail();
	
		
        };
         
         
         
   		function goToView(viewName) {
           var view;

           //get info about the view we want to go to
           view = _.find(viewsArr, function(view) {return view.name === viewName;});

           //load view into the main view component
           viewComp.removeComponent();
           viewComp.loadComponent(
               {path: view.path}
           );
       }

        /**
         * Handle logging out
         */
        function onAfterLogout() {
            goToView("auth");
        }

        //on load
        //=================================================================================================
        function onLoad() {
          
            //clicking tabs loads the appropriate view
//            WAF.addListener(messagesTab, "click", function() {
//                goToView("messages");
//            });

       WAF.addListener(viewsGrid, "onRowClick", function() {
//           goToView(sources.viewsArr.name);
		displaySelectedRecord();
       });
            
var userName = WAF.directory.currentUser().fullName;
console.log(userName);
sources.web_Access.query('WebLogOn == :1',userName, {
	onSuccess: function(event) {
		console.log(sources.web_Access.length);
		var vcompanyID = sources.web_Access.CompanyID;
		console.log(vcompanyID);
		
		sources.contracts.wak_getContractArr(vcompanyID,{				//consider using WakAPI as standard table
	
			onSuccess: function(event) {
				contractArr = JSON.parse(event.result);
				sources.contractArr.sync();
			}
		});
	}
});




//		var userName = WAF.directory.currentUser().fullName;

//		sources.web_Access.query('WebLogOn == :1',userName);
//		console.log(sources.web_Access.length);
//		var vcompanyID = sources.web_Access.CompanyID;
//		console.log(vcompanyID);
//		var vcompanyID = '73718';
		
//		sources.rMA_OnSite.query('SSP_ID == :1',sources.web_Access.CompanyID);
//		sources.rMA_OnSite.query('SSP_ID == :1',vSSPID);

//		sources.contracts.wak_getContractArr(vcompanyID,{				//consider using WakAPI as standard table
//		onSuccess: function(event) {
//		contractArr = JSON.parse(event.result);
//		sources.contractArr.sync();
//	}
//		
//	});
        
        }
        
        
   goToView("contract");

        //public API
        //=================================================================================================
        return {
            goToView: goToView,
            onLoad: onLoad
        };

    }());

    Wap.page.onLoad();
};


>>>>>>> 07e4eac454b688670d4e15302be63e0d15636fa0
