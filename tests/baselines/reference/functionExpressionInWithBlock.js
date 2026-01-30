//// [tests/cases/compiler/functionExpressionInWithBlock.ts] ////

//// [functionExpressionInWithBlock.ts]
function x() {
 with({}) {
  function f() {
   () => this;
  }
 }
}

//// [functionExpressionInWithBlock.js]
"use strict";
function x() {
    with ({}) {
        function f() {
            var _this = this;
            (function () { return _this; });
        }
    }
}
