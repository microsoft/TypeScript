//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithConstructSignatures.ts] ////

//// [subtypingWithConstructSignatures.ts]
module ConstructSignature {
    declare function foo1(cb: new (x: number) => void): typeof cb;
    declare function foo1(cb: any): any;
    var rarg1: new (x: number) => number;
    var r = foo1(rarg1); // ok because base returns void
    var rarg2: new <T>(x: T) => string;
    var r2 = foo1(rarg2); // ok because base returns void

    declare function foo2(cb: new (x: number, y: number) => void): typeof cb;
    declare function foo2(cb: any): any;
    var r3arg1: new (x: number, y: number) => number;
    var r3 = foo2(r3arg1); // ok because base returns void
    var r4arg1: new <T>(x: T) => string;
    var r4 = foo2(r4arg1); // ok because base returns void
}

//// [subtypingWithConstructSignatures.js]
var ConstructSignature;
(function (ConstructSignature) {
    var rarg1;
    var r = foo1(rarg1); // ok because base returns void
    var rarg2;
    var r2 = foo1(rarg2); // ok because base returns void
    var r3arg1;
    var r3 = foo2(r3arg1); // ok because base returns void
    var r4arg1;
    var r4 = foo2(r4arg1); // ok because base returns void
})(ConstructSignature || (ConstructSignature = {}));
