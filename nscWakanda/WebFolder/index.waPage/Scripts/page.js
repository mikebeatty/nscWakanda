/** 
 * @fileOverview Code for the login page
 * @author Welsh Harris
 * @created 8/11/2014
 */

/** @namespace */

var Wap = Wap || {};

WAF.onAfterInit = function() {
	"use strict";
	
Wap.page = (function() {
	var userNameFld = $$("textField1"),
		passwordFld = $$("textField2"),
		loginBtn = $$("button1"),
		errorText = $$("richText1"),
//		passwordReminder = $$("richText10");
		passwordReminderBtn = $$("button2"),
		passwordReminderComp = $$("component1"),
		ContractID,
		clientKey,
		uriParams,
		goToContractID;
	
	//attempt to login
	
	 
	
	
    function login() {
  
		var userName = userNameFld.getValue(),
			password = passwordFld.getValue();

		Wap.auth.login(userName, password, onAfterLogin);
    }
    
    	//request password reminder
    function passwordReminder() {
		passwordReminderComp.loadComponent();
    }
    
    //route the user to the app, or stay on the login screen depending
	//on whether the call to Wap.auth.login() resulted in the user
	//authenticating
	function onAfterLogin(event) { 

		if (event.result === true) {

			console.log('Login');
			

			if (Wap.auth.isInGroup("Customer")) {

				//check local storage for a contract id
				goToContractID = localStorage.getItem("ContractID");
				if (goToContractID) {
					localStorage.removeItem("ContractID");
					window.location = "/Contracts/?C=" + goToContractID;
				} else {
					window.location = "/Contracts";
				}


			} else if (Wap.auth.isInGroup("Service")) {
				window.location = "/SSP";

			} else { //assume Internal
//				window.location = "/internal";

				Wap.auth.logout();
			}


		} else {

			//errorText.setValue(event.errorMessage); //hmm Wak9 isn't returning the error message, maybe a bug?
			errorText.show();
		}
	}
	
	//attempt to login when user clicks the login button
    WAF.addListener(loginBtn, "click", _.debounce(function() {
        login();
    }, 300, true));
//    
//    //request the password reminder dialog
    WAF.addListener(passwordReminderBtn, "click", _.debounce(function() {
        passwordReminder();
    }, 300, true));


//    
    //if the user clicks the return key we will go ahead and loginac
    $("#"+passwordFld.id).keydown(function (event) {
		if (event.which === 13) {
			login();
		}
	});
	debugger;
	   //check to see if the user is using a url with a contract id
        ContractID = null;
        clientKey = null;
        uriParams = new URI(document.URL).search(true);
        if (typeof uriParams.C !== "undefined") {
           
           ContractID = uriParams.C;
        }
        if (typeof uriParams.ClientKey !== "undefined") {
            clientKey = uriParams.ClientKey;
            if(clientKey === "0"){
            	clientKey = "@";
            }
        }

		if(ContractID != null){
			debugger;
        //attempt to load the contract
        window.location = "/Contract/?C="+ContractID;
    		}
	
}());

};




