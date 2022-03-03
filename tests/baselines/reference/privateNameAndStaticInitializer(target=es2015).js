//// [privateNameAndStaticInitializer.ts]
class A {
  #foo = 1;
  static inst = new A();
  #prop = 2;
}



//// [privateNameAndStaticInitializer.js]
var _A_foo, _A_prop;
class A {
    constructor() {
        _A_foo.set(this, 1);
        _A_prop.set(this, 2);
    }
}
_A_foo = new WeakMap(), _A_prop = new WeakMap();
A.inst = new A();
