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
        _x.set(this, void 0);
        void 0; // Error: 'super' call must  come first
        super();
    }
}
_x = new WeakMap();
