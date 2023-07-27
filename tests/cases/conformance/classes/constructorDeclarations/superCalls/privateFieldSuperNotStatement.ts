// @target: es2022
// @useDefineForClassFields: true
class B {}
class A extends B {
  #x;
  constructor() {
    console.log(super());
  }
}
