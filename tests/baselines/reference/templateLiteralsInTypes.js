//// [tests/cases/compiler/templateLiteralsInTypes.ts] ////

//// [templateLiteralsInTypes.ts]
const f = (hdr: string, val: number) => `${hdr}:\t${val}\r\n` as `${string}:\t${number}\r\n`;

f("x").foo;


//// [templateLiteralsInTypes.js]
"use strict";
var f = function (hdr, val) { return "".concat(hdr, ":\t").concat(val, "\r\n"); };
f("x").foo;


//// [templateLiteralsInTypes.d.ts]
declare const f: (hdr: string, val: number) => `${string}:\t${number}\r\n`;
