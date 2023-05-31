//// [instanceMemberSuperNotStatementNoUDFC.ts]
class A extends class {} {
  a = 1;
  constructor() {
    console.log(super());
  }
}


//// [instanceMemberSuperNotStatementNoUDFC.js]
class A extends class {
} {
    constructor() {
        this.a = 1;
        console.log(super());
    }
}
