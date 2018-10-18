//// [parserParameterList6.ts]
class C {
  constructor(C: (public A) => any) {
  }
}

//// [parserParameterList6.js]
var C = /** @class */ (function () {
    function C(C) {
    }
    return C;
}());
