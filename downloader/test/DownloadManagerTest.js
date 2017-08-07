"use strict";
var assert = require('assert'),
    chai = require("chai"),
    sinon = require("sinon"),
    expect = chai.expect,
    DownloadManager = require("../DownloadManager"),
    DownloadClientFactory = require("../DownloadClientFactory");

describe('DownloadManagerTest', function() {
    describe('#Constructor', function() {
        it('should be created with two properties: jobs, validSource', function() {
            let sut = new DownloadManager(["a", "b"]);
            expect(sut).to.have.property('jobs');
            expect(sut).to.have.property('validSource');
        });
    });

    describe('#check if "getClient" factory method is called when atleast one correct source is passed', function() {
        it('should get called once', function() {
            let sut = new DownloadManager(["http://www.google.com", "b"]);
            sinon.stub(DownloadClientFactory.prototype, 'getClient', () => {
                return {
                    download: function() {

                    }
                }
            });
            sut.process();
            sinon.assert.calledOnce(DownloadClientFactory.prototype.getClient);
        });
    });
});
