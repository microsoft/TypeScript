//// [tests/cases/conformance/es6/templates/templateStringControlCharacterEscapes03.ts] ////

//// [templateStringControlCharacterEscapes03.ts]
var x = `\x1F\u001f 1F 1f`;

//// [templateStringControlCharacterEscapes03.js]
var x = "\u001F\u001F 1F 1f";
