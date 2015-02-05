
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
	inventoryGrid = cw.dataGrid3,
	inventoryCountGrid = cw.dataGrid4,
	oldinventoryArrTechCountVal = 0,
//	addItem = $$("addButton"),
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
		
		function displayInventoryPhysicalCount(){
		
		inventoryGrid.hide();
		inventoryCountGrid.show();
//		addItem.show();

		
		}
		
		function displayInventoryFull(){
		
		inventoryGrid.show();
		inventoryCountGrid.hide();
		
		}
		
		function saveInventoryUpdate(sku, name, techcount, iwuuid, selectedRow) {
		
				//Hey Mike, here is where you would pass the sku and used values to 4D to update
				//the record on the 4D side
				var equipmentID = sources.equipmentArr.EquipmentID,
		
					rmaID = sources.rMA_OnSite.RMA_ID;
			
				sources.inventory_WarehouseCount.wak_setInventoryPhysicalCount(sku, name, techcount, iwuuid,{
				
					onSuccess: function(event){
						
			
						
						inventoryArr[selectedRow].LastUpdate = 'Updated';
						sources.inventoryArr.sync();
						alertify.success(event.result);
					},
					onError: function(event){
						alertify.error(event.result);
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
				
					var selectedRow = sources.inventoryArr.getPosition();
					saveInventoryUpdate(sources.inventoryArr.SKU, sources.inventoryArr.Name,sources.inventoryArr.TechCount,sources.inventoryArr.IWUUID,selectedRow);
					
				}
			}
		}, "WAF", "TechCount");

		WAF.addListener(inventoryCountGrid, "onCellClick", function(event) {
			WakUtils.gridEditCell(inventoryCountGrid, event.data.columnNumber, event.data.row.rowNumber);
		});
		
	
		
		
		

	//public API
	//=================================================================================================
	this.displayInventoryPhysicalCount = displayInventoryPhysicalCount;
	this.displayInventoryFull = displayInventoryFull;


	};// @lock
	

}// @startlock
return constructor;
})();// @endlock
