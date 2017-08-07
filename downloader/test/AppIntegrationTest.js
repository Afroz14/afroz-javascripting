"use strict";
var assert = require('assert'),
    sinon = require("sinon"),
    chai = require("chai"),
    expect = chai.expect,
    DownloaderFacade = require("../DownloaderFacade"),
    fs = require("fs");

describe('AppIntegrationTest', function() {
    describe('#test if file is correct downloaded over https in configurable downloaded folder', function() {
        it('should be correctly downloaded with original size', function(done) {
            let sut = new DownloaderFacade();
            this.timeout(5000);
            sinon.stub(sut, "getCommandLineArguments", function() {
                return {
                    list: ['https://static.pexels.com/photos/36487/above-adventure-aerial-air.jpg']
                }
            });
            sut.start( (allDownloadedFiles) => {
                if(!allDownloadedFiles || !allDownloadedFiles.length) {
                    return done(new Error("File not correctly downloaded!!"));
                }
                if(fs.statSync(allDownloadedFiles[0]).size === 277424) {
                    done();
                } else {
                    done(new Error("File not correctly downloaded!!"));
                }
            });
        });
    });

    describe('#test if different source file is correctly downloaded', function() {
        it('should be correctly downloaded', function(done) {
            let sut = new DownloaderFacade();
            this.timeout(200000);
            sinon.stub(sut, "getCommandLineArguments", function() {
                return {
                    list: [
                            'https://static.pexels.com/photos/36487/above-adventure-aerial-air.jpg',
                            "ftp://ftp.is.co.za/pub/squid/squid-3.1.23.tar.gz"
                          ]
                }
            });
            sut.start( (allDownloadedFiles) => {
                if(allDownloadedFiles && allDownloadedFiles.length === 2) {
                    done();
                } else {
                   done(new Error("Files not correctly downloaded!!")); 
                }
            });
        });
    });

});
