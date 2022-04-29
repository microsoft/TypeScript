//// [functionExpressionInWithBlock.ts]
function x() {
 with({}) {
  function f() {
   () => this;
  }
 }
}

//// [functionExpressionInWithBlock.js]
function x() {
    with ({}) {
        function f() {
            var _this = this;
            (function () { return _this; });
        }
    }
}
