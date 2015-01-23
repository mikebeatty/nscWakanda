
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

var cs = $comp.sources,
	cw = $comp.widgets,
	inventoryGrid = cw.datagrid1,
	saveBtn = cw.button1,
	cancelBtn = cw.button2,
	setInventoryComplete = checkbox1;

	// eventHandlers// @lock

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
		
		function saveInventoryUpdate(sku, name, rto, reserved, target, techonhand) {
		
				//Hey Mike, here is where you would pass the sku and used values to 4D to update
				//the record on the 4D side
				var equipmentID = sources.equipmentArr.EquipmentID,
					rmaID = sources.rMA_OnSite.RMA_ID;
				debugger;
				sources.inventory_WarehouseCount.wak_setInventoryArrUpdate(sku, name, rto, reserved, target, techonhand,{
				
					onSuccess: function(event){
				debugger;
						alertify.success(event.result.result);
					},
					onError: function(event){
						alertify.error(event.result.result);
					}
					
				
				});

			}

	// @region eventManager// @startlock
	// @endregion// @endlock


//		WAF.addListener("inventoryArr", "onTechOnHandAttributeChange", function(event) {
	WAF.addListener("inventoryArr", "onTechOnHandAttributeChange", function(event) {
			
	debugger;
			if (event.eventKind === "onCurrentElementChange") {
				oldinventoryArrTechOnHandVal = sources.inventoryArr.TechOnHand;
			}
			if (event.eventKind === "onAttributeChange") {
	debugger;				
				if (sources.inventoryArr.TechOnHand != oldinventoryArrTechOnHandVal) { //using != because these were bouncing between number and string
				
					saveInventoryUpdate(sources.inventoryArr.SKU, sources.inventoryArr.Name, sources.inventoryArr.RTO,sources.inventoryArr.Reserved,sources.inventoryArr.Target,sources.inventoryArr.TechOnHand);
				}
			}
		}, "WAF", "Used");

		WAF.addListener(inventoryGrid, "onCellClick", function(event) {
			WakUtils.gridEditCell(inventoryGrid, event.data.columnNumber, event.data.row.rowNumber);
		});
		
				//save button click
		saveBtn.addListener("click", function() {
			saveInventory();
		});

			//cancel button click
		cancelBtn.addListener("click", function() {
			alertify.error("Changes cancelled.");
			displayRepairDetail();
		});

	};// @lock
	


}// @startlock
return constructor;
})();// @endlock
