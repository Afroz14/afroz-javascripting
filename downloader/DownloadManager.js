/**
 * @DownloadManager
 * Module to trigger download for different source.
 */

"use strict";
const logger = require("./services/LoggerService"),
    constants = require("./configs/Constants");

var DownloadClientFactory = require("./DownloadClientFactory"),
    SourceValidator = require("./SourceValidator");

module.exports = class DownloadManager {

    constructor(listOFUrls) {
        this.jobs = listOFUrls;
        this.validSource = this._getValidSources();
    }

    /**
     * initiate downloads for all individual valid clients 
     * @param {integer} any callback to be executed post all downloads
     * @returns {void}
     */

    process(cb) {
        if (!this.validSource.length) {
            logger.error(constants.ERROR.NO_VALID_SOURCE);
            return;
        }
        let downloadClientFactory = new DownloadClientFactory();
        let allProcessed = 0;
        let allDownloadedFiles = [];
        let self = this;
        for (let i in this.validSource) {
            let job = this.validSource[i];
            downloadClientFactory.getClient(job.type).download(job.source, (err, filename) => {
                allProcessed++;
                if (!err) {
                    allDownloadedFiles.push(filename);
                    logger.info("[Downloaded] " + filename);
                }
                if (allProcessed === self.validSource.length) {
                    cb(allDownloadedFiles);
                }
            });
        }
    }

    /**
     * extract out all valid sources from source being passed
     * @returns {array} all valid sources
     */


    _getValidSources() {
        let validSource = [],
            job = this.jobs,
            sourceValidator = new SourceValidator();
        for (let i in job) {
            let _validClientObj = sourceValidator.checkIfValidSource(job[i]);
            if (_validClientObj.isValid) {
                validSource.push({
                    source: job[i],
                    type: _validClientObj.type
                });
            }
        }
        return validSource;
    }
}
