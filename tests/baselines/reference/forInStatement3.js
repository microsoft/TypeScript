//// [forInStatement3.ts]
function F<T>() {
  var expr: T;
  for (var a in expr) {
  }
}

//// [forInStatement3.js]
function F() {
    var expr;
    for (var a in expr) {
    }
}
