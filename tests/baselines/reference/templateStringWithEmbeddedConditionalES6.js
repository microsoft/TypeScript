//// [templateStringWithEmbeddedConditionalES6.ts]
var x = `abc${ true ? false : " " }def`;

//// [templateStringWithEmbeddedConditionalES6.js]
var x = `abc${true ? false : " "}def`;
