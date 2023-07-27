//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/instanceMemberSuperNotStatement(target=es2021).ts] ////

//// [instanceMemberSuperNotStatement(target=es2021).ts]
class A extends class {} {
  a = 1;
  constructor() {
    console.log(super());
  }
}


//// [instanceMemberSuperNotStatement(target=es2021).js]
class A extends class {
} {
    constructor() {
        Object.defineProperty(this, "a", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        console.log(super());
    }
}
