//// [tests/cases/conformance/classes/staticIndexSignature/staticIndexSignature7.ts] ////

//// [staticIndexSignature7.ts]
class X {
    static [index: string]: string;
    static x = 12; // Should error, incompatible with index signature
}
class Y {
    static [index: string]: string;
    static foo() {} // should error, incompatible with index signature
}


//// [staticIndexSignature7.js]
class X {
    static x = 12; // Should error, incompatible with index signature
}
class Y {
    static foo() { } // should error, incompatible with index signature
}
