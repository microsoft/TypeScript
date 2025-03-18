//// [tests/cases/compiler/checkSuperCallBeforeThisAccessing1.ts] ////

//// [checkSuperCallBeforeThisAccessing1.ts]
class Based { }
class Derived extends Based {
    public x: number;
    constructor() {
        super();
        this;
        this.x = 10;
        var that = this;
    }
}

//// [checkSuperCallBeforeThisAccessing1.js]
class Based {
}
class Derived extends Based {
    x;
    constructor() {
        super();
        this;
        this.x = 10;
        var that = this;
    }
}
