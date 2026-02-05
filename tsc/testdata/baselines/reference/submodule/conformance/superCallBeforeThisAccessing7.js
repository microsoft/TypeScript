//// [tests/cases/conformance/es6/classDeclaration/superCallBeforeThisAccessing7.ts] ////

//// [superCallBeforeThisAccessing7.ts]
class Base {
    constructor(c) { }
}
class D extends Base {
    private _t;
    constructor() {
        let x = {
            j: this._t,
        }
        super(undefined);
    }
}


//// [superCallBeforeThisAccessing7.js]
"use strict";
class Base {
    constructor(c) { }
}
class D extends Base {
    _t;
    constructor() {
        let x = {
            j: this._t,
        };
        super(undefined);
    }
}
