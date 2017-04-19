//// [asiPreventsParsingAsNamespace01.ts]
var namespace: number;
var n: string;

namespace    // this is the identifier 'namespace'
n            // this is the identifier 'n'
{ }          // this is a block body

//// [asiPreventsParsingAsNamespace01.js]
var namespace;
var n;
namespace; // this is the identifier 'namespace'
n; // this is the identifier 'n'
{ } // this is a block body
