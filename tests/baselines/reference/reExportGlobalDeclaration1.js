//// [tests/cases/compiler/reExportGlobalDeclaration1.ts] ////

//// [file1.d.ts]
declare var x: number;
declare var x1: number;
declare let {a, b}: {a: number, b: number};

//// [file2.ts]
export {x, x as y};
export {x1, x1 as y1};

export {a, a as a1};
export {b, b as b1};


export {x as z};
export {x1 as z1};
export {a as a2};
export {b as b2};


//// [file2.js]
"use strict";
exports.__esModule = true;
exports.b2 = exports.a2 = exports.z1 = exports.z = exports.b1 = exports.b = exports.a1 = exports.a = exports.y1 = exports.x1 = exports.y = exports.x = void 0;
