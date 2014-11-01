//// [templateStringWithEmbeddedConditional.ts]
var x = `abc${ true ? false : " " }def`;

//// [templateStringWithEmbeddedConditional.js]
var x = "abc" + (true ? false : " ") + "def";
