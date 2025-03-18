//// [tests/cases/compiler/checkSuperCallBeforeThisAccessing4.ts] ////

//// [checkSuperCallBeforeThisAccessing4.ts]
class Based { }
class Derived extends Based {
    public x: number;
    constructor() {
        (() => {
            this;  // No error
        });
        () => {
            this;  // No error
        };
        (() => {
            this;  // No error
        })();
        super();
        super();
        this.x = 10;
        var that = this;
    }
}

//// [checkSuperCallBeforeThisAccessing4.js]
class Based {
}
class Derived extends Based {
    x;
    constructor() {
        (() => {
            this;
        });
        () => {
            this;
        };
        (() => {
            this;
        })();
        super();
        super();
        this.x = 10;
        var that = this;
    }
}
