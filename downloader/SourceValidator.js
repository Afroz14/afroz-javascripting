"use strict";

const supportedClients = require("./configs/supportedClient").supportedClients,
      parseurl = require('parse-url');

class SourceValidator {
    constructor() {
    }

    checkIfValidSource(url) {
        let parsedUrlObject = parseurl(url, true),
            isValid = false;
        if (!parsedUrlObject || !parsedUrlObject.protocol) {
            return {
                isValid
            };
        }
        let _protocol = parsedUrlObject.protocol.toUpperCase();
        isValid = supportedClients.indexOf(_protocol) > -1;
        return {
            isValid,
            type: _protocol
        }
    }
}

module.exports = SourceValidator;
