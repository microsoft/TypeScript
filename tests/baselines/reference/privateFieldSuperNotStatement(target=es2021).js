//// [privateFieldSuperNotStatement(target=es2021).ts]
class B {}
class A extends B {
  #x;
  constructor() {
    console.log(super());
  }
}


//// [privateFieldSuperNotStatement(target=es2021).js]
var _A_x;
class B {
}
class A extends B {
    constructor() {
        _A_x.set(this, void 0);
        console.log(super());
    }
}
_A_x = new WeakMap();
