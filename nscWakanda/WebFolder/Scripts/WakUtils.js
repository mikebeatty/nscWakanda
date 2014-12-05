/**
 * @fileOverview Client side general wakanda utilitites
 * @author Welsh Harris
 * @created 12/05/2014
 */

/** @namespace */
var WakUtils = WakUtils || {};

WakUtils = (function() {
    "use strict";

    /**
     * Convert a javascript date to a 4D time
     * @param date
     * @returns {number} - the date converted to milliseconds
     */
    function dateTo4DTime(date) {
        var dateMilli,
            dateJustTime;

        if (date) {
            dateJustTime = moment(date);
            dateMilli = (dateJustTime.hour() * (1000*60*60)) + (dateJustTime.minute() * (1000*60)) + (dateJustTime.second() * (1000)) + dateJustTime.millisecond();
        } else {
            dateMilli = 0;
        }

        return dateMilli;
    }

    //public API
    //=================================================================================================
    return {
        dateTo4DTime: dateTo4DTime
    };

}());