//// [multipleExportDefault4.ts]
export default class C { }

export default {
    uhoh: "another default",
};

//// [multipleExportDefault4.js]
"use strict";
exports.__esModule = true;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports["default"] = C;
exports["default"] = {
    uhoh: "another default"
};
