//// [tests/cases/conformance/statements/labeledStatements/labeledStatementDeclarationListInLoopNoCrash1.ts] ////

//// [labeledStatementDeclarationListInLoopNoCrash1.ts]
for (let x of []) {
  var v0 = x;
  foo: var;
  (function() { return x + v0});
}


//// [labeledStatementDeclarationListInLoopNoCrash1.js]
for (let x of []) {
    var v0 = x;
    foo: var ;
    (function () { return x + v0; });
}
