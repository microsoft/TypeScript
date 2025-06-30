// @strict: esnext
// @target: esnext
// @useDefineForClassFields: true
// @noEmit: true

class A {
  get x() {
    return 2;
  }
}
class B extends A {}
class C extends B {
  x = 1;
}
