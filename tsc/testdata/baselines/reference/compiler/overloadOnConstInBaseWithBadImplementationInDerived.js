//// [tests/cases/compiler/overloadOnConstInBaseWithBadImplementationInDerived.ts] ////

//// [overloadOnConstInBaseWithBadImplementationInDerived.ts]
interface I {
    x1(a: number, callback: (x: 'hi') => number);
}

class C implements I {
    x1(a: number, callback: (x: 'hi') => number) { // error
    }
}

//// [overloadOnConstInBaseWithBadImplementationInDerived.js]
"use strict";
class C {
    x1(a, callback) {
    }
}
