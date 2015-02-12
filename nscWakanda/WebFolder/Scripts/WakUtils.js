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
     * Convert a 4D mobile time value (which is milliseconds since midnight) into a javascript date with the
     * same time
     * @param milliseconds
     * @returns {object} the date
     */
    function convert4DTimeToJSDate(milliseconds) {
        if (milliseconds) {
            return moment(0).add(milliseconds, "ms").add(moment().zone(), "minutes").toDate();
        }
        return null;
    }

    /**
     * Convert a time string to a 4D mobile time (milliseoncs since midnight)
     * @param {string} timeString - time string formatted like 1:23pm
     * @returns {number} the time in milliseconds
     */
    function convertTimeStringTo4DTime(timeString) {
        var date;
        date = moment("1/1/1970 " + timeString, "M/D/YYY h:ma");
        return (date.hour()*3600 + date.minute()*60 + date.second())*1000;
    }


    /**
     * Put user in the cell of a grid
     * @param {object} grid - the grid widget
     * @param {number} colNo
     * @param {number} rowNo
     */
    function gridEditCell(grid, colNo, rowNo) {
        grid.gridController.gridView._private.functions.startEditCell({
            
            gridView: grid.gridController.gridView,
            row: grid.gridController.gridView._private.globals.rows[rowNo],
       
            cell: grid.gridController.gridView._private.globals.rows[rowNo].cells[colNo],
            columnNumber: colNo
        });
    }

    //public API
    //=================================================================================================
    return {
        convert4DTimeToJSDate: convert4DTimeToJSDate,
        convertTimeStringTo4DTime: convertTimeStringTo4DTime,
        gridEditCell: gridEditCell
    };

}());