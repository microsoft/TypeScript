//// [staticIndexSignature2.ts]
class C {
    static readonly [s: string]: number;
    static readonly [s: number]: 42
}

C["foo"] = 1
C.bar = 2;
const foo = C["foo"]
C[42] = 42
C[2] = 2;
const bar = C[42] 

//// [staticIndexSignature2.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
C["foo"] = 1;
C.bar = 2;
var foo = C["foo"];
C[42] = 42;
C[2] = 2;
var bar = C[42];
