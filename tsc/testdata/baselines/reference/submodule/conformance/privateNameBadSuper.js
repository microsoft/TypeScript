//// [tests/cases/conformance/classes/members/privateNames/privateNameBadSuper.ts] ////

//// [privateNameBadSuper.ts]
class B {};
class A extends B {
  #x;
  constructor() {
    this;
    super();
  }
}

//// [privateNameBadSuper.js]
"use strict";
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
