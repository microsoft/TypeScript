// @target: es2022
// @useDefineForClassFields: true
class A extends class {} {
  a = 1;
  constructor() {
    console.log(super());
  }
}
