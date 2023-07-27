//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/privateFieldSuperNotStatement2.ts] ////

//// [privateFieldSuperNotStatement2.ts]
class B {}
class A extends B {
  #x = 1;
  constructor() {
    console.log(super());
  }
}


//// [privateFieldSuperNotStatement2.js]
class B {
}
class A extends B {
    #x = 1;
    constructor() {
        console.log(super());
    }
}
