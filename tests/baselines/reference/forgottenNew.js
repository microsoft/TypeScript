//// [tests/cases/conformance/expressions/functionCalls/forgottenNew.ts] ////

//// [forgottenNew.ts]
module Tools {
    export class NullLogger { }
}

var logger = Tools.NullLogger();

//// [forgottenNew.js]
var Tools;
(function (Tools) {
    class NullLogger {
    }
    Tools.NullLogger = NullLogger;
})(Tools || (Tools = {}));
var logger = Tools.NullLogger();
