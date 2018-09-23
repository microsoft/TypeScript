//// [moduleCodeGenTest3.ts]
module Baz { export var x = "hello"; }

Baz.x = "goodbye";

//// [moduleCodeGenTest3.js]
var Baz = Baz || (Baz = {});
(function (Baz) {
    Baz.x = "hello";
})(Baz);
Baz.x = "goodbye";
