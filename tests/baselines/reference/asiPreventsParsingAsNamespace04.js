//// [tests/cases/conformance/internalModules/moduleDeclarations/asiPreventsParsingAsNamespace04.ts] ////

//// [asiPreventsParsingAsNamespace04.ts]
let module = 10;
module in {}

//// [asiPreventsParsingAsNamespace04.js]
var module = 10;
module in {};
