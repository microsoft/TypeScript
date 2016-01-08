//// [tests/cases/compiler/reExportGlobalDeclaration1.ts] ////

//// [file1.d.ts]

declare var x: number;
declare var x1: number;

//// [file2.ts]
export {x, x as y};
export {x1, x1 as y1};

export {x as z};
export {x1 as z1};

//// [file2.js]
"use strict";
exports.x = x;
exports.y = x;
exports.z = x;
exports.x1 = x1;
exports.y1 = x1;
exports.z1 = x1;
