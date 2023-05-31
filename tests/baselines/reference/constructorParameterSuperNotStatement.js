//// [constructorParameterSuperNotStatement.ts]
class A extends class {} {
  constructor(public a: number) {
    console.log(super());
  }
}


//// [constructorParameterSuperNotStatement.js]
class A extends class {
} {
    a;
    constructor(a) {
        this.a = a;
        console.log(super());
    }
}
