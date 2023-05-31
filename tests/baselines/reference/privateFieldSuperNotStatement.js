//// [privateFieldSuperNotStatement.ts]
class B {}
class A extends B {
  #x;
  constructor() {
    console.log(super());
  }
}


//// [privateFieldSuperNotStatement.js]
class B {
}
class A extends B {
    #x;
    constructor() {
        console.log(super());
    }
}
