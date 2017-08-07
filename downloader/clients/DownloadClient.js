/**
 * @DownloadClient
 * Base class for various client
 */
 

"use strict";
var fs = require("fs"),
    logger = require("../services/LoggerService");


module.exports = class DownloadClient {
    constructor(type) {
        this.type = type;
    }

    download() {
        //stub
    }
   
   /*
   * Do any stuff in case of error
   **/

    handleError(source) {
        logger.error("[Error] while downloading from ", source);
    }
}
