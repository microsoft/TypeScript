//// [tests/cases/conformance/types/namedTypes/nonIdentifierNamedDirectExportsReferencable.ts] ////

//// [export.js]
exports["a thing"] = class {
    a;
    b;
}
//// [usage.ts]
import * as ns from "./export";

export const instance: ns."a thing" = new ns["a thing"]();

//// [export.js]
exports["a thing"] = /** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
//// [usage.js]
"use strict";
exports.__esModule = true;
exports.instance = void 0;
var ns = require("./export");
exports.instance = new ns["a thing"]();
