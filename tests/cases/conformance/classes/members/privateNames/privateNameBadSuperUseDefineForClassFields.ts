// @target: esnext, es2022
// @useDefineForClassFields: true
class B {};
class A extends B {
  #x;
  constructor() {
    this;
    super();
  }
}
