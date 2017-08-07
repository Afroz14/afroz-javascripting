"use strict";
let DownloaderFacade = require("./DownloaderFacade");

let downloader = new DownloaderFacade();
downloader.start((allDowloadedFilesList) => {
    console.log("================================================");
    console.log("               Completed");
    console.log("================================================");

    console.log("      All Downloaded file locations");
    console.log("================================================");

    for (let i in allDowloadedFilesList) {
        console.log("[" + (parseInt(i) + 1) + "]", allDowloadedFilesList[i]);
    }
});
