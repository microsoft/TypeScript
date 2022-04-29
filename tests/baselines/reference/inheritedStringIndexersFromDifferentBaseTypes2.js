//// [inheritedStringIndexersFromDifferentBaseTypes2.ts]
// indexer in B is a subtype of indexer in A
interface A {
    [s: string]: {
        a;
    };
}
interface B {
    [s: number]: {
        a;
        b;
    };
}
interface C extends A, B { } // ok

interface D {
    [s: number]: {};
}
interface E extends A, D { } // error

interface F extends A, D {
    [s: number]: {
        a;
    };
} // ok because we overrode D's number index signature

//// [inheritedStringIndexersFromDifferentBaseTypes2.js]
