//// [tests/cases/compiler/checkSuperCallBeforeThisAccessing5.ts] ////

//// [checkSuperCallBeforeThisAccessing5.ts]
class Based { constructor(...arg) { } }
class Derived extends Based {
    public x: number;
    constructor() {
        super(this.x);
    }
}

//// [checkSuperCallBeforeThisAccessing5.js]
class Based {
    constructor(...arg) { }
}
class Derived extends Based {
    x;
    constructor() {
        super(this.x);
    }
}
