//// [YieldExpression14_es6.ts]
class C {
  foo() {
     yield foo
  }
}

//// [YieldExpression14_es6.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        yield foo;
    };
    return C;
}());
