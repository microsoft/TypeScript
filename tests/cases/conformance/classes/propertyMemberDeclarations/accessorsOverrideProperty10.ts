// @strict: esnext
// @target: esnext
// @useDefineForClassFields: true
// @noEmit: true

class A {
  x = 1;
}
class B extends A {}
class C extends B {
  get x() {
    return 2;
  }
}
