//// [YieldExpression12_es6.ts]
class C {
  constructor() {
     yield foo
  }
}

//// [YieldExpression12_es6.js]
var C = (function () {
    function C() {
        yield foo;
    }
    return C;
}());
