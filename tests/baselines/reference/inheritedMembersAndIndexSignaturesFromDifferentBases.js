//// [tests/cases/compiler/inheritedMembersAndIndexSignaturesFromDifferentBases.ts] ////

//// [inheritedMembersAndIndexSignaturesFromDifferentBases.ts]
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
interface C {
    m: {};
}

interface D extends A, B, C { } // error because m is not a subtype of {a;}

interface E {
    0: {};
}

interface F extends A, B, E { } // error because 0 is not a subtype of {a; b;}

interface G extends A, B, C, E { } // should only report one error

interface H extends A, F { } // Should report no error at all because error is internal to F

//// [inheritedMembersAndIndexSignaturesFromDifferentBases.js]
