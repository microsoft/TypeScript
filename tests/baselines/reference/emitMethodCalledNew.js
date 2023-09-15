//// [tests/cases/compiler/emitMethodCalledNew.ts] ////

//// [emitMethodCalledNew.ts]
// https://github.com/microsoft/TypeScript/issues/55075

export const a = {
  new(x: number) { return x + 1 }
}
export const b = {
  "new"(x: number) { return x + 1 }
}
export const c = {
  ["new"](x: number) { return x + 1 }
}


//// [emitMethodCalledNew.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/55075
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = exports.b = exports.a = void 0;
exports.a = {
    new: function (x) { return x + 1; }
};
exports.b = {
    "new": function (x) { return x + 1; }
};
exports.c = (_a = {},
    _a["new"] = function (x) { return x + 1; },
    _a);


//// [emitMethodCalledNew.d.ts]
export declare const a: {
    "new"(x: number): number;
};
export declare const b: {
    "new"(x: number): number;
};
export declare const c: {
    "new"(x: number): number;
};
