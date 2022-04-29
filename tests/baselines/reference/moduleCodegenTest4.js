//// [moduleCodegenTest4.ts]
export module Baz { export var x = "hello"; }

Baz.x = "goodbye";
void 0;

//// [moduleCodegenTest4.js]
"use strict";
exports.__esModule = true;
exports.Baz = void 0;
var Baz;
(function (Baz) {
    Baz.x = "hello";
})(Baz = exports.Baz || (exports.Baz = {}));
Baz.x = "goodbye";
void 0;
