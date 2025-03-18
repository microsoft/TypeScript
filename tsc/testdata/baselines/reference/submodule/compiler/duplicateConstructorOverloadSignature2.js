//// [tests/cases/compiler/duplicateConstructorOverloadSignature2.ts] ////

//// [duplicateConstructorOverloadSignature2.ts]
class C<T> {
    constructor(x: T);
    constructor(x: T);
    constructor(x: any) { }
}

//// [duplicateConstructorOverloadSignature2.js]
class C {
    constructor(x) { }
}
