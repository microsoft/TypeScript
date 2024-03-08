//// [tests/cases/conformance/externalModules/multipleExportDefault5.ts] ////

//// [multipleExportDefault5.ts]
export default function bar() { }
export default class C {}

//// [multipleExportDefault5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bar;
function bar() { }
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.default = C;
