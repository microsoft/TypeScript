//// [tests/cases/conformance/classes/members/privateNames/privateNameLateSuper.ts] ////

//// [privateNameLateSuper.ts]
class B {}
class A extends B {
    #x;
    constructor() {
        void 0;
        super();
    }
}


//// [privateNameLateSuper.js]
var _A_x;
class B {
}
class A extends B {
    constructor() {
        void 0;
        super();
        _A_x.set(this, void 0);
    }
}
_A_x = new WeakMap();
