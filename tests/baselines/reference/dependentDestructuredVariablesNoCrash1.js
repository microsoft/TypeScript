//// [tests/cases/conformance/controlFlow/dependentDestructuredVariablesNoCrash1.ts] ////

//// [dependentDestructuredVariablesNoCrash1.ts]
// https://github.com/microsoft/TypeScript/issues/63044

function f() 

function f([first, undefined]?: () => any = undefined) {}


//// [dependentDestructuredVariablesNoCrash1.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/63044
function f(_a) {
    var _b = _a === void 0 ? undefined : _a, first = _b[0], undefined = _b[1];
}


//// [dependentDestructuredVariablesNoCrash1.d.ts]
declare function f(): any;
