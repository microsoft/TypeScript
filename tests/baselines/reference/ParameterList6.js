//// [tests/cases/compiler/ParameterList6.ts] ////

//// [ParameterList6.ts]
class C {
  constructor(C: (public A) => any) {
  }
}

//// [ParameterList6.js]
var C = /** @class */ (function () {
    function C(C) {
    }
    return C;
}());
