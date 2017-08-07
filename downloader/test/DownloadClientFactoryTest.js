"use strict";
var chai = require("chai"),
    expect = chai.expect,
    DownloadClientFactory = require("../DownloadClientFactory"),
    HTTPDownloadClient = require("../clients/HTTPDownloadClient"),
    HTTPSDownloadClient = require("../clients/HTTPSDownloadClient"),
    FTPDownloadClient = require("../clients/FTPDownloadClient"),
    SFTPDownloadClient = require("../clients/SFTPDownloadClient");

describe('DownloadClientFactoryTest', function() {
    describe('#test return type of client instance when valid type is passed', function() {
        it('should return of same instance', function() {
            let sut = new DownloadClientFactory();
            expect(sut.getClient("HTTP")).to.be.an.instanceof(HTTPDownloadClient);
            expect(sut.getClient("HTTPS")).to.be.an.instanceof(HTTPSDownloadClient);
            expect(sut.getClient("FTP")).to.be.an.instanceof(FTPDownloadClient);
            expect(sut.getClient("SFTP")).to.be.an.instanceof(SFTPDownloadClient);
        });
    });
});
