//// [multipleExportDefault4.ts]
export default class C { }

export default {
    uhoh: "another default",
};

//// [multipleExportDefault4.js]
"use strict";
var C = (function () {
    function C() {
    }
    return C;
}());
exports.__esModule = true;
exports["default"] = C;
exports.__esModule = true;
exports["default"] = {
    uhoh: "another default"
};
