//// [tests/cases/conformance/statements/labeledStatements/labeledStatementDeclarationListInLoopNoCrash2.ts] ////

//// [labeledStatementDeclarationListInLoopNoCrash2.ts]
for (let x of []) {
  var v0 = x;
  foo: var y;
  (function() { return x + v0});
}


//// [labeledStatementDeclarationListInLoopNoCrash2.js]
for (let x of []) {
    var v0 = x;
    foo: var y;
    (function () { return x + v0; });
}
