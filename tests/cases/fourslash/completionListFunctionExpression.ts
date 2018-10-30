/// <reference path="fourslash.ts"/>

////class DataHandler {
////    dataArray: Uint8Array;
////    loadData(filename) {
////        var xmlReq = new XMLHttpRequest();
////        xmlReq.open("GET", "/" + filename, true);
////        xmlReq.responseType = "arraybuffer";
////        xmlReq.onload = function(xmlEvent) {
////            /*local*/
////            this./*this*/;
////        }
////    }
////}

goTo.marker("local");
edit.insertLine("");
verify.completions(
    { includes: "xmlEvent" },
    { marker: "this", exact: undefined },
);
