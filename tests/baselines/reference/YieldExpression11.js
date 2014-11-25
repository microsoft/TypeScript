//// [YieldExpression11.ts]
class C {
  *foo() {
    yield(foo);
  }
}

//// [YieldExpression11.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        ;
    };
    return C;
})();
