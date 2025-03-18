//// [tests/cases/compiler/constructorArgsErrors3.ts] ////

//// [constructorArgsErrors3.ts]
class foo {
    constructor (public public a: number) {
    }
}


//// [constructorArgsErrors3.js]
class foo {
    a;
    constructor(a) {
        this.a = a;
    }
}
