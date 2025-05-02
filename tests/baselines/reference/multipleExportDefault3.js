//// [tests/cases/conformance/externalModules/multipleExportDefault3.ts] ////

//// [multipleExportDefault3.ts]
export default {
    uhoh: "another default",
};

export default class C { }



//// [multipleExportDefault3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    uhoh: "another default",
};
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.default = C;
