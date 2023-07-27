//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/privateFieldSuperNotStatement2(target=es2021).ts] ////

//// [privateFieldSuperNotStatement2(target=es2021).ts]
class B {}
class A extends B {
  #x = 1;
  constructor() {
    console.log(super());
  }
}


//// [privateFieldSuperNotStatement2(target=es2021).js]
var _A_x;
class B {
}
class A extends B {
    constructor() {
        _A_x.set(this, 1);
        console.log(super());
    }
}
_A_x = new WeakMap();
