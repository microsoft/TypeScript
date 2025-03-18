//// [tests/cases/compiler/checkSuperCallBeforeThisAccessing2.ts] ////

//// [checkSuperCallBeforeThisAccessing2.ts]
class Based { }
class Derived extends Based {
    public x: number;
    constructor() {
        this.x = 100;
        super();
        this.x = 10;
        var that = this;
    }
}

//// [checkSuperCallBeforeThisAccessing2.js]
class Based {
}
class Derived extends Based {
    x;
    constructor() {
        this.x = 100;
        super();
        this.x = 10;
        var that = this;
    }
}
