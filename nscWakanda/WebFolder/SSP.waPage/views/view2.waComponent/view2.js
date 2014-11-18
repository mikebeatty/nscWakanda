
(function Component (id) {// @lock

// Add the code that needs to be shared between components here


function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'view2';
	// @endregion// @endlock

	this.load = function (data) {// @lock

var repairAddress = $comp.widgets.repairAddress;

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock
	function displayRepairDetail(){
	
	var vCompanyID = '33430';
//	sources.rMA.companyID
		$comp.sources.addresses.query('CompanyID == :1',vCompanyID);
		console.log($comp.sources.addresses.CompanyID);
		console.log($comp.sources.addresses.CompanyName);
//		
debugger;
//		$$(getHtmlId('repairAddress')) = sources.addresses.companyName;
		repairAddress.setValue("Test");
//		$comp.sources.addresses.CompanyName;
	};

	$comp.displayRepairDetail = displayRepairDetail;

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
