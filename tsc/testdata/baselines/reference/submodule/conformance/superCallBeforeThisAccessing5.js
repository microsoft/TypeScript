//// [tests/cases/conformance/es6/classDeclaration/superCallBeforeThisAccessing5.ts] ////

//// [superCallBeforeThisAccessing5.ts]
class D extends null {
    private _t;
    constructor() {
        this._t;  // No error
    }
}


//// [superCallBeforeThisAccessing5.js]
class D extends null {
    _t;
    constructor() {
        this._t;
    }
}
