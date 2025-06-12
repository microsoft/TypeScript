//// [tests/cases/compiler/classIndexer4.ts] ////

//// [classIndexer4.ts]
class C123 {
    [s: string]: number;
    constructor() {
    }
}

interface D123 extends C123 {
    x: number;
    y: string;
}

//// [classIndexer4.js]
class C123 {
    constructor() {
    }
}
