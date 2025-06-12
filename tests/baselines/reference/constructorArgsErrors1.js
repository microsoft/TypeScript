//// [tests/cases/compiler/constructorArgsErrors1.ts] ////

//// [constructorArgsErrors1.ts]
class foo {
    constructor (static a: number) {
    }
}

//// [constructorArgsErrors1.js]
class foo {
    constructor(a) {
    }
}
