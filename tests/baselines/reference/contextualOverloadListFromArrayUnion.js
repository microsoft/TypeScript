//// [tests/cases/compiler/contextualOverloadListFromArrayUnion.ts] ////

//// [one.ts]
declare const y: never[] | string[];
export const yThen = y.map(item => item.length);
//// [two.ts]
declare const y: number[][] | string[];
export const yThen = y.map(item => item.length);


//// [one.js]
"use strict";
exports.__esModule = true;
exports.yThen = void 0;
exports.yThen = y.map(function (item) { return item.length; });
//// [two.js]
"use strict";
exports.__esModule = true;
exports.yThen = void 0;
exports.yThen = y.map(function (item) { return item.length; });
