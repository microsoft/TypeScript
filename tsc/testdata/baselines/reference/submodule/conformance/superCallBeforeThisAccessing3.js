//// [tests/cases/conformance/es6/classDeclaration/superCallBeforeThisAccessing3.ts] ////

//// [superCallBeforeThisAccessing3.ts]
class Base {
    constructor(c) { }
}
class D extends Base {
    private _t;
    constructor() {
        let x = () => { this._t };
        x();  // no error; we only check super is called before this when the container is a constructor
        this._t;  // error
        super(undefined);
    }
}


//// [superCallBeforeThisAccessing3.js]
class Base {
    constructor(c) { }
}
class D extends Base {
    _t;
    constructor() {
        let x = () => { this._t; };
        x();
        this._t;
        super(undefined);
    }
}
