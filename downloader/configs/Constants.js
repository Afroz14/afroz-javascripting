"use strict";

const constants = {
    ERROR: {
        NO_VALID_SOURCE: "no valid source found to process!",
        NO_SOURCE_FOUND: "no source found to process!",
        SOURCE_FILE_NOT_VALID: "source file passed is not valid or doesn't exist!",
        CAN_NOT_CREATE_DOWNLOAD_FOLDER: "error while creating download folder!"
    },
    INFO: {
        USAGE: [{
            header: 'node downloader 1.0.0',
            content: 'Download container for different source and protocol to local disk'
        }, {
            header: 'Options',
            optionList: [{
                name: 'src',
                typeLabel: '[underline]{file}',
                description: 'file containing list of sources'
            }, {
                name: 'list',
                alias: 'l',
                description: '[underline]{source1},[underline]{source2}'
            }]
        }],
    }
}
module.exports = constants;
