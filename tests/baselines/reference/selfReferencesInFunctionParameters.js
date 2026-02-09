//// [tests/cases/compiler/selfReferencesInFunctionParameters.ts] ////

//// [selfReferencesInFunctionParameters.ts]
function foo(x: number = x) {
}

function bar(x0 = "", x: number = x) {
}

class C {
    constructor(x = 1, y = y) {
    }
     
    bar(a = "", b: string = b.toString()) {
    }
}

//// [selfReferencesInFunctionParameters.js]
"use strict";
function foo(x = x) {
}
function bar(x0 = "", x = x) {
}
class C {
    constructor(x = 1, y = y) {
    }
    bar(a = "", b = b.toString()) {
    }
}
