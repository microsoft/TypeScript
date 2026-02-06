//// [tests/cases/compiler/defaultParameterTrailingComments.ts] ////

//// [defaultParameterTrailingComments.ts]
class C {
    constructor(defaultParam: boolean = false /* Emit only once*/) {}
}

function foo(defaultParam = 10 /*emit only once*/) {}

//// [defaultParameterTrailingComments.js]
"use strict";
class C {
    constructor(defaultParam = false /* Emit only once*/) { }
}
function foo(defaultParam = 10 /*emit only once*/) { }
