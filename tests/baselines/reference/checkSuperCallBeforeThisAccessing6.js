//// [tests/cases/compiler/checkSuperCallBeforeThisAccessing6.ts] ////

//// [checkSuperCallBeforeThisAccessing6.ts]
class Base {
    constructor(...arg) {
    }
}
class Super extends Base {
    constructor() {
        (() => this);  // No Error
        super();
    }
}

//// [checkSuperCallBeforeThisAccessing6.js]
class Base {
    constructor(...arg) {
    }
}
class Super extends Base {
    constructor() {
        (() => this); // No Error
        super();
    }
}
