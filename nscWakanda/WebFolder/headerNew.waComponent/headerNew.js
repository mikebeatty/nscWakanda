
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'headerNew';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	var logoutBtn = $comp.widgets.button1;

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

function logout() {
	Wap.auth.logout(onAfterLogout);
}

function onAfterLogout() {
	window.location = "/";
}

	// eventHandlers// @lock
	
	//attempt to login when user clicks the login button
    WAF.addListener(logoutBtn, "click", function(event) {
    	console.log('click');
        logout();
    });
	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
