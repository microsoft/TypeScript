//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/privateFieldSuperNotStatementNoUDFC2.ts] ////

//// [privateFieldSuperNotStatementNoUDFC2.ts]
class B {}
class A extends B {
  #x = 1;
  constructor() {
    console.log(super());
  }
}


//// [privateFieldSuperNotStatementNoUDFC2.js]
class B {
}
class A extends B {
    #x = 1;
    constructor() {
        console.log(super());
    }
}
