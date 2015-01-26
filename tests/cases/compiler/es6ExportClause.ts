// @target: es6
// @module: commonjs

// @filename: es6ExportClause_0.ts
export var a = 10;
export var x = a;
export var m = a;

// @filename: es6ExportClause_1.ts
var a1 = 10;
var x1 = a1;
var m1 = a1;
export { };
export { a1 };
export { a1 as b1 };
export { x1, a1 as y1 };
export { x1 as z1,  };
export { m1,  };
export { } from "es6ExportClause_0";
export { a } from "es6ExportClause_0";
export { a as b } from "es6ExportClause_0";
export { x, a as y } from "es6ExportClause_0";
export { x as z,  } from "es6ExportClause_0";
export { m,  } from "es6ExportClause_0";