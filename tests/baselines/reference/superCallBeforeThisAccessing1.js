//// [tests/cases/conformance/es6/classDeclaration/superCallBeforeThisAccessing1.ts] ////

//// [superCallBeforeThisAccessing1.ts]
declare var Factory: any

class Base {
    constructor(c) { }
}
class D extends Base {
    private _t;
    constructor() {
        super(i);
        var s = {
            t: this._t
        }
        var i = Factory.create(s);
    }
}


//// [superCallBeforeThisAccessing1.js]
class Base {
    constructor(c) { }
}
class D extends Base {
    _t;
    constructor() {
        super(i);
        var s = {
            t: this._t
        };
        var i = Factory.create(s);
    }
}
