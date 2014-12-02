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
				repairAddressFld = cw.textField7,
				repairByFld = cw.textField6,
				$repairByFld = $("#" + repairByFld.id),
				firstPrinterFld = cw.textField2,
				additionalPrinterFld = cw.textField3,
				finalBidFld = cw.rmaOnsiteTotalBid;

			/**
			 * Load up repair detail based on the selected repair
			 */
			function displayRepairDetail() {
				var vCompanyID;

				//var vCompanyID = '33430';
				cs.rMA_Onsite_Bid1.query("RMA_ID == :1", sources.rMA.RMA_ID, {
					onSuccess: function () {
						console.log(sources.rMA.RMA_ID);
						$repairByFld.timepicker("setTime", cs.rMA_Onsite_Bid1.RepairBy);
						updateFinalBid();
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

			/**
			 * Update value of the final bid
			 */
			function updateFinalBid() {
				var finalBidValue,
					numEncounters;

				numEncounters = sources.equipment_Encounters.length;
				if (numEncounters === 0) {
					finalBidValue = 0;
				} else {
					finalBidValue = cs.rMA_Onsite_Bid1.FirstPrinterRate + ((numEncounters-1) * cs.rMA_Onsite_Bid1.AdditonalPrinterRate);
				}

				finalBidFld.setValue(accounting.formatMoney(finalBidValue));
			}

			//event handlers
			//=================================================================================================

			//changing the repair by value using the jquery timepicker
			$repairByFld.on("change", function() {
				cs.rMA_Onsite_Bid1.RepairBy = $repairByFld.timepicker("getTime");
			});

			//changing the first printer or additional printer updates final bid
			firstPrinterFld.addListener("change", function() {
				updateFinalBid();
			});
			additionalPrinterFld.addListener("change", function() {
				updateFinalBid();
			});

			//on load
			//=================================================================================================

			//setup time picker for the repair by field
			$repairByFld.timepicker({
				step: 15
			});

			//format money fields


			//public API
			//=================================================================================================
			this.displayRepairDetail = displayRepairDetail;

		};
	}
	return constructor;
})();
