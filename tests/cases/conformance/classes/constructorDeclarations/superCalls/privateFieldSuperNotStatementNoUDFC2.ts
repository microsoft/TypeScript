// @target: es2022
// @useDefineForClassFields: false
class B {}
class A extends B {
  #x = 1;
  constructor() {
    console.log(super());
  }
}
