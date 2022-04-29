//// [compoundVarDecl1.ts]
module Foo { var a = 1, b = 1; a = b + 2; }

var foo = 4, bar = 5;

//// [compoundVarDecl1.js]
var Foo;
(function (Foo) {
    var a = 1, b = 1;
    a = b + 2;
})(Foo || (Foo = {}));
var foo = 4, bar = 5;
