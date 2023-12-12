// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56738

abstract class A {
  abstract a(): number;
}

abstract class A2 {
  abstract a(): number;
}

abstract class B {
  abstract b(): number;
}

declare const Base: abstract new () => A & B;

class Foo1 extends Base {} // error
class Foo2 extends Base { // error
  a() {
    return 10;
  }
}
class Foo3 extends Base { // ok
  a() {
    return 10;
  }
  b() {
    return 42;
  }
}

declare const Base2: abstract new () => A & A2;

class Bar1 extends Base2 {} // error
class Bar2 extends Base2 { // ok
  a() {
    return 100;
  }
}
