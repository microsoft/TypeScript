//// [templateStringWithEmbeddedInstanceOfES6.ts]
var x = `abc${ "hello" instanceof String }def`;

//// [templateStringWithEmbeddedInstanceOfES6.js]
var x = `abc${"hello" instanceof String}def`;
