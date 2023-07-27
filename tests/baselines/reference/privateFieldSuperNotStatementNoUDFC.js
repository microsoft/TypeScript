//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/privateFieldSuperNotStatementNoUDFC.ts] ////

//// [privateFieldSuperNotStatementNoUDFC.ts]
class B {}
class A extends B {
  #x;
  constructor() {
    console.log(super());
  }
}


//// [privateFieldSuperNotStatementNoUDFC.js]
class B {
}
class A extends B {
    #x;
    constructor() {
        console.log(super());
    }
}
