//// [templateStringInArrowFunctionES6.ts]
var x = x => `abc${ x }def`;

//// [templateStringInArrowFunctionES6.js]
var x = function (x) { return `abc${x}def`; };
