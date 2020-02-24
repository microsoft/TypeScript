//// [privateNameBadSuper.ts]
class B {};
class A extends B {
    #x;
    constructor() {
        void 0; // Error: 'super' call must  come first
        super();
    }
}

//// [privateNameBadSuper.js]
var _x;
class B {
}
;
class A extends B {
    constructor() {
        void 0; // Error: 'super' call must  come first
        super();
        _x.set(this, void 0);
    }
}
_x = new WeakMap();
