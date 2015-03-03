
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
//	addItemBtn = cw.addButton,s
//	addItemComp = $$("component1"),
	addItemDialog = cw.container1,
	addItemSave = cw.imageButton2,
	addItemCancel = cw.imageButton3,
	addItemSKU = cw.textField1,
	addItemDescription = cw.textField2,
	addItemQuantity = cw.textField3,
	setInventoryComplete = checkbox1;

	// eventHandlers// @lock
	
		var vVendorID = sources.web_Access.CompanyID;
		cs.warehouses.query('VendorID == :1',vVendorID,{
			onSuccess: function () {
//		var WareHouseID = '467';
debugger;
				var wareHouseID = cs.warehouses.WareHouseID;


			sources.inventory_WarehouseCount.wak_getInventory({
					arguments: [wareHouseID],
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
		
		 function addItem() {
	
//		addItemComp.loadComponent();
			addItemDialog.setValue("");
			addItemDialog.show();
			addItemDescription.setValue("");
			addItemSave.disable();
			addItemQuantity.setValue("");
			addItemQuantity.disable();
			
    	}
    	
    	function addItemSKULookup(addItemSKU){
    	
    		sources.inventory.query("SKU == :1",addItemSKU.getValue(), {
    			onSuccess: function(event){
 
    				if(sources.inventory.Name != null){
    					addItemDescription.setValue(sources.inventory.Name);
    						addItemSave.enable();
							addItemQuantity.enable();
    			
    				}else{
    					addItemDescription.setValue("Item not found");
    						addItemSave.disable();
							addItemQuantity.disable();
    		
    				}
    			
				}
    	
    		});
    	
    	}
    	
    	function addItemSaveRecord(){

			var	selectedRow = sources.inventoryArr.length,
				selectedRow = selectedRow+1;
			saveInventoryUpdate(addItemSKU.getValue(), addItemDescription.getValue(),addItemQuantity.getValue(),"",selectedRow);


    	}
    	
		
		function saveInventoryUpdate(sku, name, techcount, iwuuid, selectedRow) {
			
			var vVendorID = sources.web_Access.CompanyID;
				cs.warehouses.query('VendorID == :1',vVendorID,{
					onSuccess: function () {
				
						var wareHouseID = cs.warehouses.WareHouseID;
						
						sources.inventory_WarehouseCount.wak_setInventoryPhysicalCount(sku, wareHouseID, techcount, iwuuid,{
				
						onSuccess: function(event){
						
							sources.inventory_WarehouseCount.wak_getInventory({
							arguments: [wareHouseID],
								onSuccess: function(event) {
								
								inventoryArr = JSON.parse(event.result);
								sources.inventoryArr.sync();
								alertify.success("Record updated.");
								}
							});
						
						}
						
				
					});

    			}
    		});
		
				//Hey Mike, here is where you would pass the sku and used values to 4D to update
				//the record on the 4D side
//				var equipmentID = sources.equipmentArr.EquipmentID,
//		
//					rmaID = sources.rMA_OnSite.RMA_ID;
			
//				sources.inventory_WarehouseCount.wak_setInventoryPhysicalCount(sku, name, techcount, iwuuid,{
//				
//					onSuccess: function(event){

//						inventoryArr[selectedRow].LastUpdate = 'Updated';
//						sources.inventoryArr.sync();
//						alertify.success(event.result);
//					},
//					onError: function(event){
//						alertify.error(event.result);
//					}
//					
//				
//				});

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
		
	
		addItemSKU.addListener("change", function(){
			
			addItemSKULookup(addItemSKU);
			
		});
	
		addItemSave.addListener("click", function(){
		
			addItemSaveRecord();
		addItemDialog.hide();
		
		
		});
		
		addItemCancel.addListener("click", function(){
		
		addItemDialog.hide();
		
		
		});
		
		

	//public API
	//=================================================================================================
	this.displayInventoryPhysicalCount = displayInventoryPhysicalCount;
	this.displayInventoryFull = displayInventoryFull;
	this.addItem = addItem;


	};// @lock
	

}// @startlock
return constructor;
})();// @endlock
