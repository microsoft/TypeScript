//// [tests/cases/conformance/classes/members/privateNames/privateNameBadSuper.ts] ////

//// [privateNameBadSuper.ts]
class B {};
class A extends B {
  #x;
  constructor() {
    this;
    super();
  }
}

//// [privateNameBadSuper.js]
var _A_x;
class B {
}
;
class A extends B {
    constructor() {
        this;
        super();
        _A_x.set(this, void 0);
    }
}
_A_x = new WeakMap();
