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
            GALO_ContractNum,
            clientKey;

        /**
         * Display a contract based on the ulr search params
         */
        function loadContract() {
            sources.contracts.query("GALO_ContractNum == :1 and BillToCompanyID = :2", {
                params: [GALO_ContractNum, clientKey],
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
        GALO_ContractNum = null;
        clientKey = null;
        uriParams = new URI(document.URL).search(true);
        if (typeof uriParams.C !== "undefined") {
            GALO_ContractNum = uriParams.C;
        }
        if (typeof uriParams.ClientKey !== "undefined") {
            clientKey = uriParams.ClientKey;
        }

        //attempt to load the contract
        loadContract();

    }());

};
