/**
 * @fileOverview Code to init everything for the Contract page
 * @author Welsh Harris
 * @created 1/28/2015
 */

/** @namespace */
var Wap = Wap || {};

WAF.onAfterInit = function() {
    "use strict";

    Wap.page = (function () {

        //==================================== page api ========================================================================
        var viewCompWidget = $$("component1"),
            sorryText = $$("richText1"),
            uriParams,
            contractID,
            clientKey;

        /**
         * Display a contract based on the ulr search params
         */
        function loadContract() {
         
//            sources.contracts.query("GALO_ContractNum == :1 and BillToCompanyID = :2", {
//                params: [GALO_ContractNum, clientKey],
			sources.contracts.query("ContractID == :1 or GALO_ContractNum == :1", {
                params: [contractID],
                onSuccess: function() {
                    if (sources.contracts.length > 0) {
                        viewCompWidget.loadComponent({
                            onSuccess: function() {
                                Wap.viewComp = $$(this.id);
                                Wap.viewComp.displayContractDetail(sources.contracts.ContractID);
                            }
                        });
                    } else {
                        viewCompWidget.hide();
                        sorryText.show();
                    }
                },
                onError: function() {
                    viewCompWidget.hide();
                    sorryText.show();
                }
            });
        }

        //==================================== on load ========================================================================

        //check to see if the user is using a url with a contract id
        contractID = null;
        clientKey = null;
        uriParams = new URI(document.URL).search(true);
        if (typeof uriParams.C !== "undefined") {
            contractID = uriParams.C;
        }
        if (typeof uriParams.ClientKey !== "undefined") {
            clientKey = uriParams.ClientKey;
//            if(clientKey === "0"){
//            	clientKey = "@";
//            }
        }

        //attempt to load the contract
        loadContract();

    }());

};
