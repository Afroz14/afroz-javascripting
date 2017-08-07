/**
 * @Filemanager
 * Custom wrapper around default node filesystem
 */



"use strict";
var fs = require("fs"),
    mv = require('mv'),
    utilService = require("./services/UtilService");

var customFs = Object.create(fs);

/**
 * write file to temp location
 * @param {string} filename
 * @returns {stream} writeable stream
 */


customFs.writeToTemp = function(fileName) {
    let tempFileName = "/tmp/" + fileName;
    arguments['0'] = tempFileName;
    return fs.createWriteStream.apply(this, arguments);
}

/**
 * end write stream and move temp to actual download location
 */

customFs.end = function() {
    let source = arguments['0'];
    let cb = arguments['1'];
    if (typeof cb !== "function") {
        cb = function() {}
    }
    let sourceFile = source.path;
    let destinationFile = utilService.getDownloadedFolderLocation() + sourceFile.split("/").pop();
    source.end();
    mv(sourceFile, destinationFile, cb);
}


/**
 * get final filelocation of downloaded file
 * @param {string} fileName
 */

customFs.getFinalDownloadableFilePath = function(fileName) {
    return utilService.getDownloadedFolderLocation() + fileName;
}

module.exports = customFs;
