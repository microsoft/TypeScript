//// [tests/cases/compiler/es6ExportClauseInEs5.ts] ////

//// [es6ExportClauseInEs5_0.ts]

export var a = 10;
export var x = a;
export var m = a;

//// [es6ExportClauseInEs5_1.ts]
var a1 = 10;
var x1 = a1;
var m1 = a1;
export { };
export { a1 };
export { a1 as b1 };
export { x1, a1 as y1 };
export { x1 as z1,  };
export { m1,  };
export { } from "es6ExportClauseInEs5_0";
export { a } from "es6ExportClauseInEs5_0";
export { a as b } from "es6ExportClauseInEs5_0";
export { x, a as y } from "es6ExportClauseInEs5_0";
export { x as z,  } from "es6ExportClauseInEs5_0";
export { m,  } from "es6ExportClauseInEs5_0";

//// [es6ExportClauseInEs5_0.js]
exports.a = 10;
exports.x = exports.a;
exports.m = exports.a;
//// [es6ExportClauseInEs5_1.js]
var a1 = 10;
var x1 = a1;
var m1 = a1;
