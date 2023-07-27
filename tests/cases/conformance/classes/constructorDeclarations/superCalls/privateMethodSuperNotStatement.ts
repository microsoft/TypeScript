// @target: es2022
// @useDefineForClassFields: false
class A extends class {} {
  constructor() {
    console.log(super());
  }
  #foo() {}
}
