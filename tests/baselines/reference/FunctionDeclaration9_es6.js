//// [FunctionDeclaration9_es6.ts]
function * foo() {
  var v = { [yield]: foo }
}

//// [FunctionDeclaration9_es6.js]
function* foo() {
    var v = (_a = {}, _a[yield] = foo, _a);
    var _a;
}
