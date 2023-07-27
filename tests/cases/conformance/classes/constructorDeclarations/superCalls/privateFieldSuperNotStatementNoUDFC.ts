// @target: es2022
// @useDefineForClassFields: false
class B {}
class A extends B {
  #x;
  constructor() {
    console.log(super());
  }
}
