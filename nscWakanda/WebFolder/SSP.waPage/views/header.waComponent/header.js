
(function Component (id) {// @lock

// Add the code that needs to be shared between components here
var logoutBtn = $$("button1");

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'header';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock
	cw = $comp.widgets,
	loggedInAs = cw.textField1;
	/**
	 * Handle what to do after the user logs out
	 */
	function onAfterLogout() {
		window.location = "/";
	}

	// eventHandlers// @lock

//clicking the logout button
	logoutBtn.addListener("click", function() {
		Wap.auth.logout(onAfterLogout);
	});

	// @region eventManager// @startlock
	// @endregion// @endlock


	sources.web_Access.query('WebLogOn == :1',Wap.auth.getCurrUserName(),{
			onSuccess: function(event) {
	debugger;
			var vCompanyID = sources.web_Access.CompanyID,
			loggedInAs = sources.web_Access.EmailAddress;
			}
		});	
	};// @lock


}// @startlock
return constructor;
})();// @endlock
