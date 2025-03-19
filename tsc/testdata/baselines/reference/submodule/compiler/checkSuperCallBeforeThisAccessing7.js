//// [tests/cases/compiler/checkSuperCallBeforeThisAccessing7.ts] ////

//// [checkSuperCallBeforeThisAccessing7.ts]
class Base {
    constructor(func: ()=>Base) {
    }
}
class Super extends Base {
    constructor() {
        super((() => this)); // No error
    }
}

//// [checkSuperCallBeforeThisAccessing7.js]
class Base {
    constructor(func) {
    }
}
class Super extends Base {
    constructor() {
        super((() => this)); // No error
    }
}
