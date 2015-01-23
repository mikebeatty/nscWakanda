
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
	inventoryGrid = cw.dataGrid1,
	oldinventoryArrTechCountVal = 0,
	setInventoryComplete = checkbox1;

	// eventHandlers// @lock
debugger;
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
		
		function displayInventoryPhysicalCount(){
		
		inventoryGrid.hide();
		
		
		}
		
		function displayInventoryFull(){
		
		inventoryGrid.show();
		
		
		}
		
		function saveInventoryUpdate(sku, name, onhand, target, techcount) {
		
				//Hey Mike, here is where you would pass the sku and used values to 4D to update
				//the record on the 4D side
				var equipmentID = sources.equipmentArr.EquipmentID,
					rmaID = sources.rMA_OnSite.RMA_ID;
			
				sources.inventory_WarehouseCount.wak_setInventoryArrUpdate(sku, name, onhand, target, techcount,{
				
					onSuccess: function(event){
		
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
	WAF.addListener("inventoryArr", "onTechCountAttributeChange", function(event) {
			

			if (event.eventKind === "onCurrentElementChange") {
				oldinventoryArrTechCountVal = sources.inventoryArr.TechCount;
			}
			if (event.eventKind === "onAttributeChange") {
			
				if (sources.inventoryArr.TechCount != oldinventoryArrTechCountVal) { //using != because these were bouncing between number and string
				
					saveInventoryUpdate(sources.inventoryArr.SKU, sources.inventoryArr.Name, sources.inventoryArr.OnHand,sources.inventoryArr.Target,sources.inventoryArr.TechCount);
				}
			}
		}, "WAF", "TechCount");

		WAF.addListener(inventoryGrid, "onCellClick", function(event) {
			WakUtils.gridEditCell(inventoryGrid, event.data.columnNumber, event.data.row.rowNumber);
		});
		


	//public API
	//=================================================================================================
	this.displayInventoryPhysicalCount = displayInventoryPhysicalCount;
	this.displayInventoryFull = displayInventoryFull;


	};// @lock
	

}// @startlock
return constructor;
})();// @endlock
