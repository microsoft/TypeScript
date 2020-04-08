//// [YieldExpression10_es6.ts]
var v = { * foo() {
    yield(foo);
  }
}


//// [YieldExpression10_es6.js]
var v = { *foo() {
        yield (foo);
    }
};
