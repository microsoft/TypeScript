//// [tests/cases/conformance/controlFlow/dependentDestructuredVariablesNoCrash1.ts] ////

//// [dependentDestructuredVariablesNoCrash1.ts]
// https://github.com/microsoft/TypeScript/issues/63044

function f() 

function f([first, undefined]?: () => any = undefined) {}


//// [dependentDestructuredVariablesNoCrash1.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/63044
function f([first, undefined] = undefined) { }


//// [dependentDestructuredVariablesNoCrash1.d.ts]
declare function f(): any;
