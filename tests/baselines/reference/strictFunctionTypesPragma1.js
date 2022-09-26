//// [tests/cases/conformance/pragma/strictFunctionTypes/strictFunctionTypesPragma1.ts] ////

//// [file1.ts]
// @ts-strictFunctionTypes
export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;

//// [file2.ts]
// @ts-strictFunctionTypes true
export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;

//// [file3.ts]
// @ts-strictFunctionTypes false
export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;

//// [file4.ts]
export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;


//// [file1.js]
"use strict";
exports.__esModule = true;
exports.b = exports.a = void 0;
// @ts-strictFunctionTypes
var a = function (arg) { return 0; };
exports.a = a;
var b = function (arg) { return 0; };
exports.b = b;
exports.a = exports.b;
exports.b = exports.a;
//// [file2.js]
"use strict";
exports.__esModule = true;
exports.b = exports.a = void 0;
// @ts-strictFunctionTypes true
var a = function (arg) { return 0; };
exports.a = a;
var b = function (arg) { return 0; };
exports.b = b;
exports.a = exports.b;
exports.b = exports.a;
//// [file3.js]
"use strict";
exports.__esModule = true;
exports.b = exports.a = void 0;
// @ts-strictFunctionTypes false
var a = function (arg) { return 0; };
exports.a = a;
var b = function (arg) { return 0; };
exports.b = b;
exports.a = exports.b;
exports.b = exports.a;
//// [file4.js]
"use strict";
exports.__esModule = true;
exports.b = exports.a = void 0;
var a = function (arg) { return 0; };
exports.a = a;
var b = function (arg) { return 0; };
exports.b = b;
exports.a = exports.b;
exports.b = exports.a;
