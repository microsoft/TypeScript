//// [asiPreventsParsingAsAmbientExternalModule01.ts]
var declare: number;
var module: string;

declare                // this is the identifier 'declare'
module                 // this is the identifier 'module'
"my external module"   // this is just a string
{ }                    // this is a block body

//// [asiPreventsParsingAsAmbientExternalModule01.js]
var declare;
var module;
declare; // this is the identifier 'declare'
module; // this is the identifier 'module'
"my external module"; // this is just a string
{ } // this is a block body
