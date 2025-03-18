//// [tests/cases/compiler/systemJsForInNoException.ts] ////

//// [systemJsForInNoException.ts]
export const obj = { a: 1 };
for (var key in obj)
    console.log(obj[key]);

//// [systemJsForInNoException.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj = void 0;
exports.obj = { a: 1 };
for (var key in exports.obj)
    console.log(exports.obj[key]);
