//// [tests/cases/compiler/staticVisibility2.ts] ////

//// [staticVisibility2.ts]
class Square {
    static sideLength;
    constructor(sideLength: number) {
        this.sideLength = sideLength;
    }
}

//// [staticVisibility2.js]
class Square {
    constructor(sideLength) {
        this.sideLength = sideLength;
    }
}
