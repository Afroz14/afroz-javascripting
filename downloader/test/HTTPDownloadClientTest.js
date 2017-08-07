"use strict";
var chai = require("chai"),
    expect = chai.expect,
    assert = chai.assert,
    HTTPDownloadClient = require("../clients/HTTPDownloadClient"),
    nock = require("nock"),
    fs = require("fs");

describe('HTTPDownloadClientTest', function() {
    describe('#test if file is downloaded in download directory', function() {
        it('should get downloaded', function(done) {
            let sut = new HTTPDownloadClient();
            var scope = nock('http://www.google.com')
                .defaultReplyHeaders({
                    'Content-Length': function(req, res, body) {
                        return 490;
                    }
                })
                .get('/test.txt')
                .reply(200, function(uri, requestBody) {
                    return fs.createReadStream(__dirname + '/mocks/cat-poems.txt');
                });
            sut.download("http://www.google.com/test.txt",function(err,filename){
                if(fs.existsSync(filename)) {
                    done();
                } else {
                    done(new Error("file is not downloaded.."))
                }
            });
        });
    });

     describe('#test if file is downloaded when request is failed', function() {
        it('should not get downloaded', function(done) {
            let sut = new HTTPDownloadClient();
            var scope = nock('http://www.google.com')
                .get('/test.txt')
                .replyWithError('something awful happened');
            sut.download("http://www.google.com/test.txt",function(err,filename){
                if(fs.existsSync(filename)) {
                    done(new Error("file is present even when request get failed"));
                } else {
                    done()
                }
            });
        });
    });

});
