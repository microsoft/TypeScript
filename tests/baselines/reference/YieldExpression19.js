//// [YieldExpression19.ts]
function*foo() {
  function bar() {
    function* quux() {
      yield(foo);
    }
  }
}

//// [YieldExpression19.js]
function foo() {
    function bar() {
        function quux() {
            ;
        }
    }
}
