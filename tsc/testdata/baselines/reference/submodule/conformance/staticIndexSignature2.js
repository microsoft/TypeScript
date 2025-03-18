//// [tests/cases/conformance/classes/staticIndexSignature/staticIndexSignature2.ts] ////

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
class C {
}
C["foo"] = 1;
C.bar = 2;
const foo = C["foo"];
C[42] = 42;
C[2] = 2;
const bar = C[42];
