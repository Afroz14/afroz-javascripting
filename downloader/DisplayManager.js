/**
 * @DisplayManager 
 * Module to display progress for individual download client
 */

"use strict";

let progressBar = require('progress');
module.exports = class DisplayManager {
    constructor(len, filename) {
        this.bar = new progressBar('[Downloading] ' + filename + ' [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: len,
            clear: true
        });
    }

    /**
     * update progress
     * @param {integer} {status} number of chunk downloaded yet.
     * @returns {void}
     */

    updateProgress(status) {
        this.bar.tick(status);
    }
}
