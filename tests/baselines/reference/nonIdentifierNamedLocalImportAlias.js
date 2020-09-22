//// [tests/cases/conformance/types/namedTypes/nonIdentifierNamedLocalImportAlias.ts] ////

//// [export.js]
exports["another one"] = class {
    c;
    d;
};
exports["a thing"] = exports;
//// [usage.ts]
import * as A from "./export";
import Result = A."a thing";

export const another: Result."another one" = new Result["another one"]();
export const again: A."a thing"."a thing"."another one" = null as any as A."another one";
export const type: typeof Result."a thing"."another one" = {} as any;

import Result2 = A.'a thing';

export const another2: Result.'another one' = new Result['another one']();
export const again2: A.'a thing'.'a thing'.'another one' = null as any as A.'another one';
export const type2: typeof Result.'a thing'.'another one' = {} as any;

import Result3 = A.`a thing`;

export const another3: Result.`another one` = new Result[`another one`]();
export const again3: A.`a thing`.`a thing`.`another one` = null as any as A.`another one`;
export const type3: typeof Result.`a thing`.`another one` = {} as any;


//// [export.js]
exports["another one"] = /** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
exports["a thing"] = exports;
//// [usage.js]
"use strict";
exports.__esModule = true;
exports.type3 = exports.again3 = exports.another3 = exports.type2 = exports.again2 = exports.another2 = exports.type = exports.again = exports.another = void 0;
var A = require("./export");
var Result = A["a thing"];
exports.another = new Result["another one"]();
exports.again = null;
exports.type = {};
exports.another2 = new Result['another one']();
exports.again2 = null;
exports.type2 = {};
exports.another3 = new Result["another one"]();
exports.again3 = null;
exports.type3 = {};
