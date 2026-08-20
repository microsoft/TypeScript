//// [tests/cases/compiler/ParameterList6.ts] ////

//// [ParameterList6.ts]
class C {
  constructor(C: (public A) => any) {
  }
}

//// [ParameterList6.js]
"use strict";
class C {
    constructor(C) {
    }
}
