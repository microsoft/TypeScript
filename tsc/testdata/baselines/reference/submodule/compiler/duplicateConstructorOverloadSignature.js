//// [tests/cases/compiler/duplicateConstructorOverloadSignature.ts] ////

//// [duplicateConstructorOverloadSignature.ts]
class C {
    constructor(x: number);
    constructor(x: number);
    constructor(x: any) { }
}

//// [duplicateConstructorOverloadSignature.js]
class C {
    constructor(x) { }
}
