//// [tests/cases/compiler/classIndexer3.ts] ////

//// [classIndexer3.ts]
class C123 {
    [s: string]: number;
    constructor() {
    }
}

class D123 extends C123 {
    x: number;
    y: string;
}

//// [classIndexer3.js]
class C123 {
    constructor() {
    }
}
class D123 extends C123 {
    x;
    y;
}
