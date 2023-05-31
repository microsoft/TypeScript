// @target: es2021
// @useDefineForClassFields: false
class A extends class {} {
  constructor() {
    console.log(super());
  }
  #foo() {}
}
