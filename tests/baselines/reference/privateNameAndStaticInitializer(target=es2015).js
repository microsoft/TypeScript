//// [privateNameAndStaticInitializer.ts]
class A {
  #foo = 1;
  static inst = new A();
  #prop = 2;
}



//// [privateNameAndStaticInitializer.js]
var _foo, _prop;
class A {
    constructor() {
        _foo.set(this, 1);
        _prop.set(this, 2);
    }
}
_foo = new WeakMap(), _prop = new WeakMap();
A.inst = new A();
