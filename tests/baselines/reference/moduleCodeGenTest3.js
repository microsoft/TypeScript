//// [tests/cases/compiler/moduleCodeGenTest3.ts] ////

//// [moduleCodeGenTest3.ts]
module Baz { export var x = "hello"; }

Baz.x = "goodbye";

//// [moduleCodeGenTest3.js]
var Baz;
(function (Baz) {
    Baz.x = "hello";
})(Baz || (Baz = {}));
Baz.x = "goodbye";
