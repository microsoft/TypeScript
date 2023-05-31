//// [privateMethodSuperNotStatement(target=es2021).ts]
class A extends class {} {
  constructor() {
    console.log(super());
  }
  #foo() {}
}


//// [privateMethodSuperNotStatement(target=es2021).js]
var _A_instances, _A_foo;
class A extends class {
} {
    constructor() {
        _A_instances.add(this);
        console.log(super());
    }
}
_A_instances = new WeakSet(), _A_foo = function _A_foo() { };
