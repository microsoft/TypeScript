//// [privateMethodSuperNotStatement.ts]
class A extends class {} {
  constructor() {
    console.log(super());
  }
  #foo() {}
}


//// [privateMethodSuperNotStatement.js]
class A extends class {
} {
    constructor() {
        console.log(super());
    }
    #foo() { }
}
