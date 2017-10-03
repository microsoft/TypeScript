//// [tests/cases/compiler/taggedTemplateWithoutDeclaredHelper.ts] ////

//// [foo.ts]
function id<T>(x: T) {
  return x;
}

export const result = id `hello world`;

//// [index.d.ts]
export { };


//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function id(x) {
    return x;
}
exports.result = id(_a || (_a = tslib_1.__makeTemplateObject(["hello world"], ["hello world"])));
var _a;
