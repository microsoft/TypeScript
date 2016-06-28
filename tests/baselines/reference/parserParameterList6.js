//// [parserParameterList6.ts]
class C {
  constructor(C: (public A) => any) {
  }
}

//// [parserParameterList6.js]
var C = (function () {
    function C(C) {
    }
    return C;
}());
