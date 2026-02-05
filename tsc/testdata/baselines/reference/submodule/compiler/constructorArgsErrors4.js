//// [tests/cases/compiler/constructorArgsErrors4.ts] ////

//// [constructorArgsErrors4.ts]
class foo {
    constructor (private public a: number) {
    }
}


//// [constructorArgsErrors4.js]
"use strict";
class foo {
    a;
    constructor(a) {
        this.a = a;
    }
}
