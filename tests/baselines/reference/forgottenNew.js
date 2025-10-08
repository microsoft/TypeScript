//// [tests/cases/conformance/expressions/functionCalls/forgottenNew.ts] ////

//// [forgottenNew.ts]
namespace Tools {
    export class NullLogger { }
}

var logger = Tools.NullLogger();

//// [forgottenNew.js]
var Tools;
(function (Tools) {
    var NullLogger = /** @class */ (function () {
        function NullLogger() {
        }
        return NullLogger;
    }());
    Tools.NullLogger = NullLogger;
})(Tools || (Tools = {}));
var logger = Tools.NullLogger();
