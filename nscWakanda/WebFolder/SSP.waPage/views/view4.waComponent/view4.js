
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'view4';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock
	
		var vVendorID = sources.web_Access.CompanyID;
		vVendorID = '38789';
		sources.warehouses.query('VendorID == :1',vVendorID);
		var vWareHouseID = '467';
		$comp.sources.inventory_WarehouseCount.query('WareHouseID == :1',vWareHouseID);

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
