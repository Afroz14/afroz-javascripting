"use strict";
var HTTPDownloadClient = require("../clients/HTTPDownloadClient"),
    HTTPSDownloadClient = require("../clients/HTTPSDownloadClient"),
    FTPDownloadClient = require("../clients/FTPDownloadClient"),
    SFTPDownloadClient = require("../clients/SFTPDownloadClient");

let clientFactory = {
    "HTTP": new HTTPDownloadClient(),
    "HTTPS": new HTTPSDownloadClient(),
    "FTP": new FTPDownloadClient(),
    "SFTP": new SFTPDownloadClient()
};

module.exports.clientFactory = clientFactory;
module.exports.supportedClients = Object.keys(clientFactory);
