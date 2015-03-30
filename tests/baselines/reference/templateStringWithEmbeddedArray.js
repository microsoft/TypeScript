//// [templateStringWithEmbeddedArray.ts]
var x = `abc${ [1,2,3] }def`;

//// [templateStringWithEmbeddedArray.js]
var x = "abc" + [1, 2, 3] + "def";
