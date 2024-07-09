//// [tests/cases/conformance/externalModules/asiPreventsParsingAsAmbientExternalModule02.ts] ////

//// [asiPreventsParsingAsAmbientExternalModule02.ts]
var declare: number;
var module: string;

module container {
    declare                // this is the identifier 'declare'
    module                 // this is the identifier 'module'
    "my external module"   // this is just a string
    { }                    // this is a block body
}

//// [asiPreventsParsingAsAmbientExternalModule02.js]
var declare;
var module;
var container;
(function (container) {
    declare; // this is the identifier 'declare'
    module; // this is the identifier 'module'
    "my external module"; // this is just a string
    { } // this is a block body
})(container || (container = {}));
