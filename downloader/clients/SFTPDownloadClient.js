/**
 * @SFTPDownloadClient
 * Class for instantiating sftp client
 */

"use strict";

let DownloadClient = require("../clients/DownloadClient"),
    utilService = require("../services/UtilService"),
    logger = require("../services/LoggerService"),
    fileManager = require("../fileManager");
    
module.exports = class SFTPDownloadClient extends DownloadClient {
    constructor() {
        super("SFTP");
    }

    handleError(source) {
        super.handleError(source);
    }

    /**
     * actual download process using node sftp module
     * @param {string} {filenam} unique filename from source
     * @param {string} {source} url to download
     * @returns {void}
     */

    _sftpDownloader(filename, source, cb) {
        cb(null, fileManager.getFinalDownloadableFilePath(filename));
    }

    /**
     * start sftp download for given source
     * @param {string} {source} url to download
     * @param {cb} {function} callback any
     * @returns {void}
     */

    download(source, cb) {
        let filename = utilService.getLocalDiskFileLocationFromURL(source);
        logger.info("[Downloading]", source, " to ", filename);
        let sftpDownloader = this._sftpDownloader.bind(this, filename, source, cb);
        ftpDownloader();
    }
}
