//// [tests/cases/conformance/es6/classDeclaration/superCallBeforeThisAccessing8.ts] ////

//// [superCallBeforeThisAccessing8.ts]
class Base {
    constructor(c) { }
}
class D extends Base {
    private _t;
    constructor() {
        let x = {
            k: super(undefined), 
            j: this._t,  // no error
        }
    }
}


//// [superCallBeforeThisAccessing8.js]
class Base {
    constructor(c) { }
}
class D extends Base {
    _t;
    constructor() {
        let x = {
            k: super(undefined),
            j: this._t,
        };
    }
}
