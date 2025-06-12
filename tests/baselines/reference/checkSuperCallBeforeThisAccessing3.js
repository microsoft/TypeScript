//// [tests/cases/compiler/checkSuperCallBeforeThisAccessing3.ts] ////

//// [checkSuperCallBeforeThisAccessing3.ts]
class Based { }
class Derived extends Based {
    public x: number;
    constructor() {
        class innver {
            public y: boolean;
            constructor() {
                this.y = true;
            }
        }
        super();
        this.x = 10;
        var that = this;
    }
}

//// [checkSuperCallBeforeThisAccessing3.js]
class Based {
}
class Derived extends Based {
    constructor() {
        class innver {
            constructor() {
                this.y = true;
            }
        }
        super();
        this.x = 10;
        var that = this;
    }
}
