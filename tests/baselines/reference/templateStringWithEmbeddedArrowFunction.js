//// [templateStringWithEmbeddedArrowFunction.ts]
var x = `abc${ x => x }def`;

//// [templateStringWithEmbeddedArrowFunction.js]
var x = "abc" + function (x) { return x; } + "def";
