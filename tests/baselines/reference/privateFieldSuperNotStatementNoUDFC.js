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
