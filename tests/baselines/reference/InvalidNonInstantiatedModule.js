//// [tests/cases/conformance/internalModules/moduleDeclarations/InvalidNonInstantiatedModule.ts] ////

//// [InvalidNonInstantiatedModule.ts]
namespace M {
    export interface Point { x: number; y: number }
}

var m = M; // Error, not instantiated can not be used as var

var x: typeof M; // Error only a namespace


//// [InvalidNonInstantiatedModule.js]
"use strict";
var m = M; // Error, not instantiated can not be used as var
var x; // Error only a namespace
