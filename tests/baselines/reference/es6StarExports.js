//// [tests/cases/compiler/es6StarExports.ts] ////

//// [es6StarExports_0.ts]

export var a = 10;

//// [es6StarExports_1.ts]
export * from "es6StarExports_0";

//// [es6StarExports_0.js]
exports.a = 10;
//// [es6StarExports_1.js]
