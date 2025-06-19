//// [tests/cases/compiler/commonJsIsolatedModules.ts] ////

//// [index.js]
module.exports = {}
var x = 1


//// [index.js]
export = {};
module.exports = {};
var x = 1;
