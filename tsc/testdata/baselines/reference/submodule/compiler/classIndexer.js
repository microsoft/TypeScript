//// [tests/cases/compiler/classIndexer.ts] ////

//// [classIndexer.ts]
class C123 {
    [s: string]: number;
    constructor() {
    }
}

//// [classIndexer.js]
class C123 {
    constructor() {
    }
}
