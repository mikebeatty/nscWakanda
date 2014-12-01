/**
 * @fileOverview Web Component: view2
 * @author Welsh Harris
 * @created 12/01/2014
 */

/*global Wap:false sources:true */

//noinspection JSUnusedLocalSymbols
(function Component (id) {
	"use strict";
	//noinspection JSUnusedLocalSymbols
	function constructor (id) {
		var $comp = this;
		this.name = 'view2';
		//noinspection JSUnusedLocalSymbols
		this.load = function (data) {

			//component API
			//=================================================================================================
			var cs = $comp.sources,
				cw = $comp.widgets,
				repairAddressFld = cw.textField7;

			function displayRepairDetail() {
				var vCompanyID;

				//var vCompanyID = '33430';
				cs.rMA_Onsite_Bid1.query("RMA_ID == :1", sources.rMA.RMA_ID, {
					onSuccess: function () {
						console.log(sources.rMA.RMA_ID);
					}
				});

				vCompanyID = sources.rMA.CompanyID;
				//console.log(vCompanyID);
				cs.addresses.query("CompanyID == :1", vCompanyID, {
					onSuccess: function(){
						var vRepairAddress;
						
						console.log(vCompanyID);
						console.log($comp.sources.addresses.CompanyID);
						console.log($comp.sources.addresses.CompanyName);
						vRepairAddress = 'test2';
						repairAddressFld.setValue(vRepairAddress);
					}
				});
			}

			//event handlers
			//=================================================================================================


			//on load
			//=================================================================================================


			//public API
			//=================================================================================================
			this.displayRepairDetail = displayRepairDetail;

		};
	}
	return constructor;
})();
