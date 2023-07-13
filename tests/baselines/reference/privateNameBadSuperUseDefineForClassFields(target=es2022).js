//// [tests/cases/conformance/classes/members/privateNames/privateNameBadSuperUseDefineForClassFields.ts] ////

//// [privateNameBadSuperUseDefineForClassFields.ts]
class B {};
class A extends B {
  #x;
  constructor() {
    this;
    super();
  }
}


//// [privateNameBadSuperUseDefineForClassFields.js]
class B {
}
;
class A extends B {
    #x;
    constructor() {
        this;
        super();
    }
}
