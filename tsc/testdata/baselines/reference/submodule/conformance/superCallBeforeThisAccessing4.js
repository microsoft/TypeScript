//// [tests/cases/conformance/es6/classDeclaration/superCallBeforeThisAccessing4.ts] ////

//// [superCallBeforeThisAccessing4.ts]
class D extends null {
    private _t;
    constructor() {
        this._t;
        super();
    }
}

class E extends null {
    private _t;
    constructor() {
        super();
        this._t;
    }
}

//// [superCallBeforeThisAccessing4.js]
class D extends null {
    _t;
    constructor() {
        this._t;
        super();
    }
}
class E extends null {
    _t;
    constructor() {
        super();
        this._t;
    }
}
