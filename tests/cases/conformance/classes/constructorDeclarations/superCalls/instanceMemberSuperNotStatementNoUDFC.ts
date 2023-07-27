// @target: es2022
// @useDefineForClassFields: false
class A extends class {} {
  a = 1;
  constructor() {
    console.log(super());
  }
}
