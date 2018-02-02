//// [tests/cases/compiler/esModuleInteropTslibHelpers.ts] ////

//// [refs.d.ts]
declare module "path";
//// [file.ts]
import path from "path";
path.resolve("", "../");
export class Foo { }

//// [file.js]
"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
path_1["default"].resolve("", "../");
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports.Foo = Foo;
