//// [tests/cases/conformance/es6/classDeclaration/superCallFromClassThatHasNoBaseTypeButWithSameSymbolInterface.ts] ////

//// [superCallFromClassThatHasNoBaseTypeButWithSameSymbolInterface.ts]
interface Foo extends Array<number> {}

class Foo {
    constructor() {
        super(); // error
    }
}


//// [superCallFromClassThatHasNoBaseTypeButWithSameSymbolInterface.js]
"use strict";
class Foo {
    constructor() {
        super(); // error
    }
}
