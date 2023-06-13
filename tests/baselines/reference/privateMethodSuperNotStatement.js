//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/privateMethodSuperNotStatement.ts] ////

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
