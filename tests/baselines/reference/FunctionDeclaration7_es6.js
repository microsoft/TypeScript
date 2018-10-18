//// [FunctionDeclaration7_es6.ts]
function*bar() {
  // 'yield' here is an identifier, and not a yield expression.
  function*foo(a = yield) {
  }
}

//// [FunctionDeclaration7_es6.js]
function* bar() {
    // 'yield' here is an identifier, and not a yield expression.
    function* foo(a = yield) {
    }
}
