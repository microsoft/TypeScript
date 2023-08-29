//// [tests/cases/conformance/externalModules/multipleExportDefault4.ts] ////

//// [multipleExportDefault4.ts]
export default class C { }

export default {
    uhoh: "another default",
};

//// [multipleExportDefault4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.default = C;
exports.default = {
    uhoh: "another default",
};
