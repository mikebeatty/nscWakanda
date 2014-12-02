/**
 * @fileOverview Web Component: view2
 * @author Welsh Harris
 * @created 12/01/2014
 */

/*global Wap:false sources:true, equipmentArr:true */

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
				finalBidFld = cw.rmaOnsiteTotalBid,
				saveBtn = cw.button1,
				cancelBtn = cw.button2;

			/**
			 * Load up repair detail based on the selected repair
			 */
			function displayRepairDetail(rmaid) {
				var vCompanyID;

				//var vCompanyID = '33430';
				cs.rMA_Onsite_Bid1.query("RMA_ID == :1", rmaid, {
					onSuccess: function () {
		
						$repairByFld.timepicker("setTime", cs.rMA_Onsite_Bid1.RepairBy);
						updateFinalBid();
					}
				});

				sources.rMA.query('RMA_ID == :1',rmaid,{
					onSuccess: function(){
						vCompanyID = sources.rMA.CompanyID;
						cs.addresses.query("CompanyID == :1", vCompanyID, {
							onSuccess: function(){
								var vRepairAddress;
//								vRepairAddress = Wap.page.formatAddress(cs.address.getCurrentElement());
//								var vRepairAddress;

								vRepairAddress = cs.addresses.CompanyName+String.fromCharCode(13);
								vRepairAddress += cs.addresses.Address1+String.fromCharCode(13);
								vRepairAddress += cs.addresses.Address2+String.fromCharCode(13);
								vRepairAddress += cs.addresses.City+String.fromCharCode(32)+cs.addresses.State+String.fromCharCode(32)+cs.addresses.Zip+String.fromCharCode(13);
								vRepairAddress += cs.addresses.Phone+String.fromCharCode(13);
								repairAddressFld.setValue(vRepairAddress);
							}
						});
					}
				});

				
				sources.equipment_Encounters.wak_getEquipmentArr({
					arguments: [rmaid],
					onSuccess: function(event) {
						equipmentArr = JSON.parse(event.result);
						sources.equipmentArr.sync();
					}
				});

				//sources.rMA_OnSite.query('RMA_ID == :1',rmaid,{
				//	onSuccess: function(){
				//		sources.rMA.query('RMA_ID == :1',rmaid,{
				//			onSuccess: function(){
				//				Wap.viewComp.displayRepairDetail();
				//			}
				//		});
				//	}
				//});
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

			/**
			 * Save the current onsite bid entity
			 */
			function saveBid() {
				cs.rMA_Onsite_Bid1.save({
					onError: function(event) {
						alert("error"); //todo swh: install client side error handler
					}
				});
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

			//save button click
			saveBtn.addListener("click", function() {
				saveBid();
			});

			//cancel button click
			cancelBtn.addListener("click", function() {
				displayRepairDetail();
			});

			//on load
			//=================================================================================================

			//setup time picker for the repair by field
			$repairByFld.timepicker({
				step: 15
			});

			//load the detail
			displayRepairDetail(data.userData.rmaid);


			//public API
			//=================================================================================================
			this.displayRepairDetail = displayRepairDetail;

		};
	}
	return constructor;
})();
