//// [tests/cases/compiler/constructorArgsErrors1.ts] ////

//// [constructorArgsErrors1.ts]
class foo {
    constructor (static a: number) {
    }
}

//// [constructorArgsErrors1.js]
"use strict";
class foo {
    constructor(a) {
    }
}
