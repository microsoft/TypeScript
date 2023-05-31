//// [instanceMemberSuperNotStatement.ts]
class A extends class {} {
  a = 1;
  constructor() {
    console.log(super());
  }
}


//// [instanceMemberSuperNotStatement.js]
class A extends class {
} {
    a = 1;
    constructor() {
        console.log(super());
    }
}
