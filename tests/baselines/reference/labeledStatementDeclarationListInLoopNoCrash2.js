//// [tests/cases/conformance/statements/labeledStatements/labeledStatementDeclarationListInLoopNoCrash2.ts] ////

//// [labeledStatementDeclarationListInLoopNoCrash2.ts]
for (let x of []) {
  var v0 = x;
  foo: var y;
  (function() { return x + v0});
}


//// [labeledStatementDeclarationListInLoopNoCrash2.js]
"use strict";
var _loop_1 = function (x) {
    v0 = x;
    foo: ;
    (function () { return x + v0; });
};
var v0, y;
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var x = _a[_i];
    _loop_1(x);
}
