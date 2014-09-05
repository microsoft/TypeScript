//// [declarationEmit_invalidReference.ts]
/// <reference path="invalid.ts" />
var x = 0;

//// [declarationEmit_invalidReference.js]
/// <reference path="invalid.ts" />
var x = 0;


//// [declarationEmit_invalidReference.d.ts]
declare var x: number;
