/**
 * @DownloaderFacade
 * Facade to initiate app
 */

"use strict";
const commandLineArgs = require('command-line-args'),
    DownloadManager = require("./DownloadManager"),
    getUsage = require('command-line-usage'),
    utilService = require("./services/UtilService"),
    logger = require("./services/LoggerService"),
    constants = require("./configs/Constants"),
    mkdirp = require('mkdirp'),
    path = require("path"),
    dotENV = require('dotenv'),
    fs = require("fs");

class DownloaderFacade {
    constructor() {
        this.configPath = path.join(__dirname, '.env');
        this.optionDefinitions = [{
            name: 'list',
            alias: 'l',
            multiple: true,
            type: String
        }, {
            name: 'src',
            type: String,
            multiple: true
        },{
            name:'help',
            type: String,
            multiple: true
        }];
    }

    getCommandLineArguments() {
        return commandLineArgs(this.optionDefinitions);
    }

    /**
     * parse all commands passed from command line and return source if passed.
     * @returns {array} all source passed
     */

    parseCommandAndFetchSource() {
        try {
            var options = this.getCommandLineArguments();
        } catch (err) {
            this._showUsage();
            return;
        }
        let listOfUrls;
        if (options.list) {
            listOfUrls = options.list;
        } else if(options.help) {
            this._showUsage();
            return;
        }
        else if (options.src && options.src.length) {
            try {
                listOfUrls = JSON.parse(fs.readFileSync(options.src[0], 'utf8'));
            } catch (err) {
                logger.error(constants.ERROR.SOURCE_FILE_NOT_VALID);
                return;
            }
        }
        if (!listOfUrls || !listOfUrls.length) {
            logger.error(constants.ERROR.NO_SOURCE_FOUND);
        }
        return listOfUrls;
    }

    /**
     * create a new directory
     * @param {string} {dir} dirname to be created
     * @param {function} {cb}  callback to be executed
     * @returns {void}
     */

    createDir(dir, cb) {
        mkdirp(dir, cb);
    }

    /**
     * trigger point to start app
     * @param {function} {cb}  callback to be executed
     * @returns {void}
     */

    start(cb) {
        dotENV.config({
            path: this.configPath
        });
        // Step 1: parse command line and map the arguments
        this.listOfUrls = this.parseCommandAndFetchSource();
        if (!this.listOfUrls) {
            return;
        }
        // step 2 : created downloadable dir
        let self = this;
        this.createDir(utilService.getDownloadedFolderLocation(), function(err) {
            if (err) {
                logger.error(constants.ERROR.CAN_NOT_CREATE_DOWNLOAD_FOLDER);
                return;
            }
            // step 3: init download manager
            let downloadManager = new DownloadManager(self.listOfUrls);
            downloadManager.process(cb);
        });
    }

    /**
     * show usage of how to start app
     * @returns {void} print list of all commands
     */

    _showUsage() {
        return logger.info(getUsage(constants.INFO.USAGE));
    }
}

module.exports = DownloaderFacade;
