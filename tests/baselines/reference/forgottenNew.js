//// [tests/cases/conformance/expressions/functionCalls/forgottenNew.ts] ////

//// [forgottenNew.ts]
namespace Tools {
    export class NullLogger { }
}

var logger = Tools.NullLogger();

//// [forgottenNew.js]
"use strict";
var Tools;
(function (Tools) {
    class NullLogger {
    }
    Tools.NullLogger = NullLogger;
})(Tools || (Tools = {}));
var logger = Tools.NullLogger();
