/**
 * @fileOverview HTTP Request handler to allow a user to open a pdf in the browser
 * @author Welsh Harris
 * @created 01/07/2015
 */

/**
 * @param {HTTPRequest} request
 * @param {HTTPResponse} response
 */
function docProxy(request, response) {
    "use strict";

    //make sure the request is coming from someone with a valid session
    if (!currentSession().belongsTo("User")) {
        response.statusCode = '403';
        return "";
    }

    try {

        var rmaID = request.urlQuery,
            fullPath,
            file,
            pathElems,
            fileName;
            
 
		if(rmaID.substr(0,9) === "Inventory"){
			var warehouseID = rmaID.substr(9);
		  fullPath = ds.Inventory_WarehouseCount.wak_getInventoryList(warehouseID);
	}else{
        //get the path to the document from 4D
        fullPath = ds.RMA_OnSite.wak_getFieldSheet(rmaID);
    }
    
//        fullPath = "/Users/welsh/Desktop/test.pdf";
//		fullPath = "/Users/mikebeatty/4D Write-Untitled.pdf";

        //parse out the file name
        pathElems = fullPath.split("/");
        fileName = pathElems[pathElems.length - 1];

        //return the file to the
        file = new File(fullPath);
        if (file.exists) {
            response.contentType = 'application/pdf';
            response.headers["content-disposition"] = "inline; filename=" + fileName; // header to force download
            response.sendChunkedData(file);
        }

        //handler error if file not found
        if (!file.exists) {
            response.statusCode = '404';
            return "sorry, but this file cannot be found";
        }

    } catch(e) {
        response.statusCode = "500";
        return "sorry, but there was a problem getting the file to download";
    }

}