//// [tests/cases/compiler/checkSuperCallBeforeThisAccessing8.ts] ////

//// [checkSuperCallBeforeThisAccessing8.ts]
class Base {
    constructor(...arg) {
    }
}
class Super extends Base {
    constructor() {
        var that = this;
        super();
    }
}

//// [checkSuperCallBeforeThisAccessing8.js]
class Base {
    constructor(...arg) {
    }
}
class Super extends Base {
    constructor() {
        var that = this;
        super();
    }
}
