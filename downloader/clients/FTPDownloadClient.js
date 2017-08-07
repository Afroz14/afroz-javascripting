/**
 * @FTPDownloadClient
 * Class for instantiating fp client
 */

"use strict";
let DownloadClient = require("../clients/DownloadClient"),
    utilService = require("../services/UtilService"),
    logger = require("../services/LoggerService"),
    ftp = require('ftp'),
    fileManager = require("../fileManager"),
    urlparse = require('parse-url'),
    DisplayManager = require("../DisplayManager");

module.exports = class FTPDownloadClient extends DownloadClient {
    constructor() {
        super("FTP");
    }

    handleError(source) {
        super.handleError(source);
    }

    /**
     * actual download process using node ftp module
     * @param {string} {filenam} unique filename derived from source
     * @param {string} {source} url to download
     * @returns {void}
     */

    _ftpDownloader(filename, source, cb) {
        let ftpClient = new ftp(),
            that = this,
            parsedUrl = urlparse(source),
            ftpConfig = {
                host: parsedUrl.resource,
                file: parsedUrl.pathname
            };

        ftpClient.on('ready', function(err) {
            ftpClient.size(ftpConfig.file, function(err, size) {
                if (err) {
                    cb(err);
                    that.handleError(source);
                    ftpClient.end();
                    return;
                }
                let fileSize = size;
                ftpClient.get(ftpConfig.file, function(err, stream) {
                    if (err) {
                        cb(err);
                        that.handleError(source);
                        ftpClient.end();
                        return;
                    }
                    let downloadfile = fileManager.writeToTemp(filename, {
                        'flags': 'a'
                    });
                    
                    stream.once('close', function() {
                        ftpClient.end();
                    });
                    let displayManager = new DisplayManager(fileSize, filename);
                    stream.on('data', function(chunk) {
                        displayManager.updateProgress(chunk.length);
                        downloadfile.write(chunk);
                    });
                    stream.on('end', function() {
                        fileManager.end(downloadfile, function(err) {
                            if (err) {
                                cb(err);
                                that.handleError(source);
                                return;
                            }
                            cb(null, fileManager.getFinalDownloadableFilePath(filename));
                        });
                    });
                });
            });

        }).on('error', function(e) {
            cb(e);
            ftpClient.end();
            that.handleError(source);
        });
        ftpClient.connect({
            host: ftpConfig.host
        });
    }

    /**
     * start ftp download for given source
     * @param {string} {source} url to download
     * @param {cb} {function} callback any
     * @returns {void}
     */

    download(source, cb) {
        let filename = utilService.getLocalDiskFileLocationFromURL(source);
        logger.info("[Downloading]", source, " to ", filename);
        let ftpDownloader = this._ftpDownloader.bind(this, filename, source, cb);
        ftpDownloader();
    }
}
