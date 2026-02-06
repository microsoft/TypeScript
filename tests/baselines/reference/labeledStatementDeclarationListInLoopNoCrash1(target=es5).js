//// [tests/cases/conformance/statements/labeledStatements/labeledStatementDeclarationListInLoopNoCrash1.ts] ////

//// [labeledStatementDeclarationListInLoopNoCrash1.ts]
for (let x of []) {
  var v0 = x;
  foo: var;
  (function() { return x + v0});
}


//// [labeledStatementDeclarationListInLoopNoCrash1.js]
"use strict";
var _loop_1 = function (x) {
    v0 = x;
    foo: ;
    (function () { return x + v0; });
};
var v0;
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var x = _a[_i];
    _loop_1(x);
}
