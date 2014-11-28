
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
	
//	var vCompanyID = '33430';

	$comp.sources.rMA_Onsite_Bid1.query('RMA_ID == :1',sources.rMA.RMA_ID,{
	
	onSuccess: function(event){	
		console.log(sources.rMA.RMA_ID);	
	}
	
	});
	
	var vCompanyID = sources.rMA.CompanyID;
//		console.log(vCompanyID);
		$comp.sources.addresses.query('CompanyID == :1',vCompanyID,{
		
			onSuccess: function(event){
			debugger;
			console.log(vCompanyID);
			console.log($comp.sources.addresses.CompanyID);
			console.log($comp.sources.addresses.CompanyName);
			$comp.widgets.textField7.setValue("Test");
			}
		
		});

		
//		

//		$$(getHtmlId('repairAddress')) = sources.addresses.companyName;
		
//		$comp.sources.addresses.CompanyName;
	};

	this.displayRepairDetail = displayRepairDetail;

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
