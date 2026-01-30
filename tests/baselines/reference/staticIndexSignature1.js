//// [tests/cases/conformance/classes/staticIndexSignature/staticIndexSignature1.ts] ////

//// [staticIndexSignature1.ts]
class C {
    static [s: string]: number;
    static [s: number]: 42
}

C["foo"] = 1
C.bar = 2;
const foo = C["foo"]
C[42] = 42
C[2] = 2;
const bar = C[42] 

//// [staticIndexSignature1.js]
class C {
}
C["foo"] = 1;
C.bar = 2;
const foo = C["foo"];
C[42] = 42;
C[2] = 2;
const bar = C[42];
