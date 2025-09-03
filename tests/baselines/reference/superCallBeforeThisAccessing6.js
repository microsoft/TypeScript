//// [tests/cases/conformance/es6/classDeclaration/superCallBeforeThisAccessing6.ts] ////

//// [superCallBeforeThisAccessing6.ts]
class Base {
    constructor(c) { }
}
class D extends Base {
    private _t;
    constructor() {
        super(this); 
    }
}


//// [superCallBeforeThisAccessing6.js]
class Base {
    constructor(c) { }
}
class D extends Base {
    _t;
    constructor() {
        super(this);
    }
}
