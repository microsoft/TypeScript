// @target: es2021
// @useDefineForClassFields: true
class B {}
class A extends B {
  #x = 1;
  constructor() {
    console.log(super());
  }
}
