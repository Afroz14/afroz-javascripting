/**
 * @HTTPSDownloadClient
 * Class for instantiating https client
 */


"use strict";

let DownloadClient = require("../clients/DownloadClient"),
    utilService = require("../services/UtilService"),
    logger = require("../services/LoggerService"),
    https = require('https'),
    DisplayManager = require("../DisplayManager"),
    fileManager = require("../fileManager");

module.exports = class HTTPSDownloadClient extends DownloadClient {
    constructor() {
        super("HTTPS");
    }
    handleError(source) {
        super.handleError(source);
    }

    /**
     * actual download process using node https module
     * @param {string} {filenam} unique filename derived from source
     * @param {string} {source} url to download
     * @returns {void}
     */

    _httpsDownloader(filename, source, cb) {
        let that = this;
        https.get(source, function(response) {
            let downloadfile = fileManager.writeToTemp(filename, {
                'flags': 'a'
            });
            let len = parseInt(response.headers['content-length'], 10);
            let displayManager = (len) ? new DisplayManager(len, filename) : undefined;
            response.on('data', function(chunk) {
                displayManager && displayManager.updateProgress(chunk.length);
                downloadfile.write(chunk);
            });
            response.on('end', function() {
                fileManager.end(downloadfile, function(err) {
                    if (err) {
                        cb(err);
                        that.handleError(source);
                        return;
                    }
                    cb(null, fileManager.getFinalDownloadableFilePath(filename));
                });
            });
        }).on('error', function(e) {
            cb(e);
            that.handleError(source);
        });
    }

    /**
     * start https download for given source
     * @param {string} {source} url to download
     * @param {cb} {function} callback any
     * @returns {void}
     */

    download(source, cb) {
        let filename = utilService.getLocalDiskFileLocationFromURL(source);
        logger.info("[Downloading]", source, " to ", filename);
        let httpDownloader = this._httpsDownloader.bind(this, filename, source, cb);
        httpDownloader();
    }
}
