
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

	};// @lock


}// @startlock
return constructor;
})();// @endlock
