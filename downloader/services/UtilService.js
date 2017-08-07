/**
 * @UtilService
 * Service containing all utility function
 */

"use strict";
var rename = require("rename");
var utils = {
    getLocalDiskFileLocationFromURL: function(url) {
        if(!url) {
            return;
        }
        let fileName = url.split('/').pop();
        let uniqueFileName = rename(fileName, function() {
            return {suffix: '-' + Date.now()};
        });
        return uniqueFileName;
    },

    getDownloadedFolderLocation: function() {
        return process.env.DOWNLOAD_FOLDER_DIR || "/_downloads/";
    }
}
module.exports = utils;
