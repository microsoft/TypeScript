//// [tests/cases/compiler/constructorArgsErrors5.ts] ////

//// [constructorArgsErrors5.ts]
class foo {
    constructor (export a: number) {
    }
}


//// [constructorArgsErrors5.js]
"use strict";
class foo {
    constructor(a) {
    }
}
