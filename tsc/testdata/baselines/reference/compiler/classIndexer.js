//// [tests/cases/compiler/classIndexer.ts] ////

//// [classIndexer.ts]
class C123 {
    [s: string]: number;
    constructor() {
    }
}

//// [classIndexer.js]
"use strict";
class C123 {
    constructor() {
    }
}
