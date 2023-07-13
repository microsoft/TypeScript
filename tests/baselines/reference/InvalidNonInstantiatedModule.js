//// [tests/cases/conformance/internalModules/moduleDeclarations/InvalidNonInstantiatedModule.ts] ////

//// [InvalidNonInstantiatedModule.ts]
module M {
    export interface Point { x: number; y: number }
}

var m = M; // Error, not instantiated can not be used as var

var x: typeof M; // Error only a namespace


//// [InvalidNonInstantiatedModule.js]
var m = M; // Error, not instantiated can not be used as var
var x; // Error only a namespace
