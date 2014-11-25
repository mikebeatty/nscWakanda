﻿/**  * @fileOverview Code for the login page * @author Welsh Harris * @created 8/11/2014 *//** @namespace */var Wap = Wap || {};WAF.onAfterInit = function() {	"use strict";	Wap.page = (function() {	var userNameFld = $$("textField1"),		passwordFld = $$("textField2"),		loginBtn = $$("button1"),		errorText = $$("richText1"),//		passwordReminder = $$("richText10");		passwordReminderBtn = $$("button2");		//attempt to login    function login() {  		var userName = userNameFld.getValue(),			password = passwordFld.getValue();		Wap.auth.login(userName, password, onAfterLogin);    }        	//request password reminder    function passwordReminder() {    	console.log('password');		window.location = "/passwordReminder";    }        //route the user to the app, or stay on the login screen depending	//on whether the call to Wap.auth.login() resulted in the user	//authenticating	function onAfterLogin(event) { 		if (event.result === true) {			console.log('Login');			//			if (Wap.auth.isInGroup("Service")) {//				window.location = "/SSP";//Welsh had used service, defaults to index.html within the folder//				sources.web_Access.query('webLogOn == :1',userName);//				var vSSPID = sources.web_Access.companyID;//			} else if (Wap.auth.isInGroup("Customer")) {//				window.location = "/Contracts";//			} else { //assume Internal//				window.location = "/internal";//			}			if (Wap.auth.isInGroup("Customer")) {				window.location = "/Contracts";//Welsh had used service, defaults to index.html within the folder				sources.web_Access.query('webLogOn == :1',userName);				var vCompanyID = sources.web_Access.CompanyID;			} else if (Wap.auth.isInGroup("Service")) {				window.location = "/SSP";				sources.web_Access.query('webLogOn == :1',userName);				var vSSPID = sources.web_Access.CompanyID;			} else { //assume Internal				window.location = "/internal";			}		} else {			//errorText.setValue(event.errorMessage); //hmm Wak9 isn't returning the error message, maybe a bug?			errorText.show();		}	}		//attempt to login when user clicks the login button    WAF.addListener(loginBtn, "click", function(event) {        login();    });        //request the password reminder dialog    WAF.addListener(passwordReminderBtn, "click", function(event) {    	console.log('passowrd2');        passwordReminder();    });        //if the user clicks the return key we will go ahead and login    $("#"+passwordFld.id).keydown(function (event) {		if (event.which === 13) {			login();		}	});	}());};