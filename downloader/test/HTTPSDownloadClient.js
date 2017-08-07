"use strict";
var chai = require("chai"),
    expect = chai.expect,
    assert = chai.assert,
    HTTPSDownloadClient = require("../clients/HTTPSDownloadClient"),
    nock = require("nock"),
    fs = require("fs");

describe('HTTPSDownloadClientTest', function() {
    describe('#test if file is downloaded in download directory', function() {
        it('should get downloaded', function(done) {
            let sut = new HTTPSDownloadClient();
            var scope = nock('https://www.google.com')
                .defaultReplyHeaders({
                    'Content-Length': function(req, res, body) {
                        return 490;
                    }
                })
                .get('/test.txt')
                .reply(200, function(uri, requestBody) {
                    return fs.createReadStream(__dirname + '/mocks/cat-poems.txt');
                });
            sut.download("https://www.google.com/test.txt",function(err,filename){
                if(fs.existsSync(filename)) {
                    done();
                } else {
                    done(new Error("file is not downloaded.."))
                }
            });
        });
    });
});
