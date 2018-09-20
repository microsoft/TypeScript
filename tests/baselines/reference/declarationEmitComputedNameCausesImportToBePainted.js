//// [tests/cases/compiler/declarationEmitComputedNameCausesImportToBePainted.ts] ////

//// [context.ts]
export const Key = Symbol();
export interface Context {
  [Key]: string;
}
//// [index.ts]
import { Key, Context } from "./context";

export const context: Context = {
  [Key]: 'bar',
}

export const withContext = ({ [Key]: value }: Context) => value;

//// [context.js]
"use strict";
exports.__esModule = true;
exports.Key = Symbol();
//// [index.js]
"use strict";
exports.__esModule = true;
var _a;
var context_1 = require("./context");
exports.context = (_a = {},
    _a[context_1.Key] = 'bar',
    _a);
exports.withContext = function (_a) {
    var _b = context_1.Key, value = _a[_b];
    return value;
};


//// [context.d.ts]
export declare const Key: unique symbol;
export interface Context {
    [Key]: string;
}
//// [index.d.ts]
import { Key, Context } from "./context";
export declare const context: Context;
export declare const withContext: ({ [Key]: value }: Context) => string;
