"use strict";
var assert = require('assert'),
    chai = require("chai"),
    sinon = require("sinon"),
    expect = chai.expect,
    SourceValidator = require("../SourceValidator");

describe('SourceValidatorTest', function() {
    describe('#check when valid source is passed', function() {
        it('should return true', function() {
            let sut = new SourceValidator();
            assert.equal(true, sut.checkIfValidSource("http://www.google.com").isValid);
        });
    });

    describe('#check when invalid/unsupported source is passed', function() {
        it('should return false', function() {
            let sut = new SourceValidator();
            assert.equal(false, sut.checkIfValidSource("fftp://www.google.com").isValid);
        });
    });
});
