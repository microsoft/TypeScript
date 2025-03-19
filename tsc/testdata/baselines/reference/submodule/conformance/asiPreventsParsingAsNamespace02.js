//// [tests/cases/conformance/internalModules/moduleDeclarations/asiPreventsParsingAsNamespace02.ts] ////

//// [asiPreventsParsingAsNamespace02.ts]
var module: number;
var m: string;

module       // this is the identifier 'namespace'
m            // this is the identifier 'm'
{ }          // this is a block body

//// [asiPreventsParsingAsNamespace02.js]
var module;
var m;
module; // this is the identifier 'namespace'
m; // this is the identifier 'm'
{ } // this is a block body
