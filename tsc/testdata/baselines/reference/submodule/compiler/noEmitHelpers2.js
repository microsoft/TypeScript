//// [tests/cases/compiler/noEmitHelpers2.ts] ////

//// [noEmitHelpers2.ts]
declare var decorator: any;

@decorator
class A {
    constructor(a: number, @decorator b: string) {
    }
}

//// [noEmitHelpers2.js]
@decorator
class A {
    constructor(a, b) {
    }
}
