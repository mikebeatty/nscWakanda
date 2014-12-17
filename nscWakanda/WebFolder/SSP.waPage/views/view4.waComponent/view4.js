
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

var cs = $comp.sources;

	// eventHandlers// @lock
//	debugger;
		var vVendorID = sources.web_Access.CompanyID;
//		`vVendorID = 5161;
		cs.warehouses.query('VendorID == :1',vVendorID,{
			onSuccess: function () {
//		var vWareHouseID = '467';

				var vWareHouseID = cs.warehouses.WareHouseID;
//				cs.inventory_WarehouseCount.query('WareHouseID == :1',vWareHouseID,{
//					onSuccess: function () {
//						
//					}
//				});

			sources.inventory_WarehouseCount.wak_getInventory({
					arguments: [vWareHouseID],
						onSuccess: function(event) {
						inventoryArr = JSON.parse(event.result);
						sources.inventoryArr.sync();
					}
				});
		
	
			}
		});

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock
	


}// @startlock
return constructor;
})();// @endlock
