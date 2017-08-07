"use strict";
var assert = require('assert'),
    sinon = require("sinon"),
    chai = require("chai"),
    expect = chai.expect,
    DownloaderFacade = require("../DownloaderFacade"),
    DownloadManager = require("../DownloadManager");

describe('DownloaderFacadeTest', function() {
    describe('#Constructor', function() {
        it('should be created with two properties: configPath, optionDefinitions', function() {
            let sut = new DownloaderFacade();
            expect(sut).to.have.property('configPath');
            expect(sut).to.have.property('optionDefinitions');
        });
    });

    describe('#check if parseCommandAndFetchSource is called once during boot', function() {
        it('should get called once', function() {
            let downloader = new DownloaderFacade();
            let spy = sinon.spy(downloader, 'parseCommandAndFetchSource');
            downloader.start();
            assert.equal(spy.calledOnce, true, "process method was called..");
            spy.restore();
        });
    });

    describe('#check if createDir is called once during boot', function() {
        it('should get called once', function() {
            let downloader = new DownloaderFacade();
            let spy = sinon.spy(downloader, 'createDir');
            sinon.stub(downloader, "parseCommandAndFetchSource", function() {
                return []
            })
            downloader.start();
            assert.equal(spy.calledOnce, true, "process method was called..");
            spy.restore();
        });
    });

    describe('#check if downlodmanager method "process" was called once during boot', function() {
        it('should get called once', function() {
            let downloader = new DownloaderFacade();
            sinon.stub(downloader, "parseCommandAndFetchSource", function() {
                return [];
            })
            sinon.stub(downloader, "createDir", function() {
                let downloadManager = new DownloadManager(["a"]);
                downloadManager.process();
            })
            sinon.stub(DownloadManager.prototype, 'process', () => "");
            downloader.start();
            sinon.assert.calledOnce(DownloadManager.prototype.process);
        });
    });
});
