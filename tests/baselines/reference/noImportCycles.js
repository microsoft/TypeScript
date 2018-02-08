//// [tests/cases/compiler/noImportCycles.ts] ////

//// [noImportCyclesError2.ts]
import Dummy1 = require("./noImportCyclesError1");
export default class Dummy2 {}

//// [noImportCyclesError1.ts]
import Dummy2 = require("./noImportCyclesError2");
export default class Dummy1 {}



//// [noImportCyclesError2.js]
"use strict";
exports.__esModule = true;
var Dummy2 = /** @class */ (function () {
    function Dummy2() {
    }
    return Dummy2;
}());
exports["default"] = Dummy2;
//// [noImportCyclesError1.js]
"use strict";
exports.__esModule = true;
var Dummy1 = /** @class */ (function () {
    function Dummy1() {
    }
    return Dummy1;
}());
exports["default"] = Dummy1;
