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
				cv = $comp.sourcesVar,
				repairAddressFld = cw.textField7,
				repairByFld = cw.textField8,
				$repairByFld = $("#" + repairByFld.id),
				firstPrinterFld = cw.textField2,
				additionalPrinterFld = cw.textField3,
				finalBidFld = cw.rmaOnsiteTotalBid,
				repairArriveDateField = cw.textField7,
				repairArriveTimeField = cw.textField8,
				$repairArriveTimeField = $("#" + repairArriveTimeField.id),
				saveBtn = cw.button1,
				cancelBtn = cw.button2;

			/**
			 * Load up repair detail based on the selected repair
			 */
			function displayRepairDetail(rmaid) {
				var vCompanyID;

				//var vCompanyID = '33430';
				if(rmaid != null){
				cs.rMA_Onsite_Bid.query("RMA_ID == :1", rmaid, {
					onSuccess: function () {
						$repairByFld.timepicker("setTime", WakUtils.convert4DTimeToJSDate(cs.rMA_Onsite_Bid.RepairBy));
						updateFinalBid();
					}
				});
				
				cs.rMA.query("RMA_ID == :1", rmaid, {
					onSuccess: function () {
//						want to display the RMA.GaloRMANumber
					}
				});

				sources.rMA.query('RMA_ID == :1',rmaid,{
					onSuccess: function(){
						$repairArriveTimeField.timepicker("setTime", WakUtils.convert4DTimeToJSDate(cs.rMA_Onsite_Bid.RepairBy));
						
						vCompanyID = sources.rMA.CompanyID;
						cs.addresses.query("CompanyID == :1", vCompanyID, {
							onSuccess: function(){
							
								var vRepairAddress;
//								vRepairAddress = Wap.page.formatAddress(cs.address.getCurrentElement());
//								var vRepairAddress;

//								vRepairAddress = cs.addresses.CompanyName+String.fromCharCode(13);
//								vRepairAddress += cs.addresses.Address1+String.fromCharCode(13);
//								vRepairAddress += cs.addresses.Address2+String.fromCharCode(13);
//								vRepairAddress += cs.addresses.City+String.fromCharCode(32)+cs.addresses.State+String.fromCharCode(32)+cs.addresses.Zip+String.fromCharCode(13);
//								vRepairAddress += cs.addresses.Phone+String.fromCharCode(13);
								vRepairAddress = cs.addresses.wak_getAddressRepair({
//									arguments: [vCompanyID],
									arguments: [rmaid],
									onSuccess: function(event) {
									repairAddressFld.setValue(event.result);
									}
								});
//								repairAddressFld.setValue(vRepairAddress);
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
				} else{
					rmaid = 0;
				cs.rMA_Onsite_Bid.query("RMA_ID == :1", rmaid, {
					onSuccess: function () {
						
					}
				});
				}
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
					finalBidValue = cs.rMA_Onsite_Bid.FirstPrinterRate + ((numEncounters-1) * cs.rMA_Onsite_Bid.AdditonalPrinterRate);
				}

				finalBidFld.setValue(accounting.formatMoney(finalBidValue));
			}

			/**
			 * Save the current onsite bid entity
			 */
			function saveBid() {

				//convert time to milliseconds before sending to 4D
				cs.rMA_Onsite_Bid.RepairBy = WakUtils.convertTimeStringTo4DTime(repairByFld.getValue());
				
				cs.rMA_Onsite_Bid.save({
					onSuccess: function() {
						alertify.success("Record has been saved.");
					},
					onError: function(event) {
						alert("error"); //todo swh: install client side error handler
					}
				});

//				cs.rMA_Onsite_Bid.save({
//					onError: function(event) {
//						alert("error"); //todo swh: install client side error handler
//					}
//				});
				
			}

			//event handlers
			//=================================================================================================

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
				alertify.error("Changes cancelled.");
				displayRepairDetail();
			});
			
			$repairArriveTimeField.on("change", function() {
				sources.rMA_OnSite_Bid.RepairBy = $repairArriveTimeField.timepicker("getTime");
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
