/**
 * @DownloadClientFactory
 * Factory to retrieve clients instance depending on type
 */

"use strict";

var clientFactory = require("./configs/supportedClient").clientFactory;

module.exports = class DownloadClientFactory {
    constructor() {
    }

    getClient(type) {
        return clientFactory[type];
    }
}
