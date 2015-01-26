//// [tests/cases/compiler/es6StarExportsInEs5.ts] ////

//// [es6StarExportsInEs5_0.ts]

export var a = 10;

//// [es6StarExportsInEs5_1.ts]
export * from "es6StarExportsInEs5_0";

//// [es6StarExportsInEs5_0.js]
exports.a = 10;
//// [es6StarExportsInEs5_1.js]
