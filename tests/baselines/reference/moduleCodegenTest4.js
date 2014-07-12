//// [moduleCodegenTest4.ts]
export module Baz { export var x = "hello"; }

Baz.x = "goodbye";
void 0;

//// [moduleCodegenTest4.js]
(function (Baz) {
    Baz.x = "hello";
})(exports.Baz || (exports.Baz = {}));
var Baz = exports.Baz;

Baz.x = "goodbye";
void 0;
