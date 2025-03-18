//// [tests/cases/compiler/constructorArgsErrors2.ts] ////

//// [constructorArgsErrors2.ts]
class foo {
    constructor (public static a: number) {
    }
}


//// [constructorArgsErrors2.js]
class foo {
    a;
    constructor(a) {
        this.a = a;
    }
}
