//// [tests/cases/conformance/es6/classDeclaration/superCallBeforeThisAccessing2.ts] ////

//// [superCallBeforeThisAccessing2.ts]
class Base {
    constructor(c) { }
}
class D extends Base {
    private _t;
    constructor() {
        super(() => { this._t }); // no error. only check when this is directly accessing in constructor
    }
}


//// [superCallBeforeThisAccessing2.js]
class Base {
    constructor(c) { }
}
class D extends Base {
    _t;
    constructor() {
        super(() => { this._t; }); // no error. only check when this is directly accessing in constructor
    }
}
