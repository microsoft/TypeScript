//// [YieldExpression10.ts]
var v = { * foo() {
    yield(foo);
  }
}


//// [YieldExpression10.js]
var v = { foo: function () {
    ;
} };
