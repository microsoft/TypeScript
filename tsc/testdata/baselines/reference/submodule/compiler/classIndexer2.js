//// [tests/cases/compiler/classIndexer2.ts] ////

//// [classIndexer2.ts]
class C123 {
    [s: string]: number;
    x: number;
    y: string;
    constructor() {
    }
}

//// [classIndexer2.js]
class C123 {
    x;
    y;
    constructor() {
    }
}
