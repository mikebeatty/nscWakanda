﻿  /** 
 * @fileOverview Client side authentication / authorization module
 * adapted from the Wakalorie auth module found here: https://github.com/swelshh/Wakalorie
 * @author Welsh Harris
 * @created 12/03/2013
 */

/** @namespace */
var Wap = Wap || {}; //jslint_ignore

Wap.auth = (function () {
	"use strict";

	//attempt to login the user
	function login(email, password, callback) {
//		WAF.directory.login(email, password , {
		if(email != null){
			ds.PARTS.wak_Auth(email, password , {
				
				onSuccess: callback,
				onError: callback
			});
		}
	}
	
	//logout the current user
	function logout(callback) {
		WAF.directory.logout({
			onSuccess: callback,
			onError: callback
		});
	}
	
	//check to see if the current user is logged in
	function isLoggedIn() {
		var loggedIn;
		loggedIn = WAF.directory.currentUser() !== null;
		return loggedIn;
	}
	
	//check to see if the current user is in the given group
	function isInGroup(groupName) {
		return WAF.directory.currentUserBelongsTo(groupName);
	}
	
	//get the logged in user's name
	function getCurrUserName() {
		return WAF.directory.currentUser().fullName;
	}


    //--------------------
    //public API
    //--------------------
    return {
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        isInGroup: isInGroup,
        getCurrUserName: getCurrUserName
    };

}());


