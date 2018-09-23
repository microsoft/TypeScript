//// [moduleCodegenTest4.ts]
export module Baz { export var x = "hello"; }

Baz.x = "goodbye";
void 0;

//// [moduleCodegenTest4.js]
"use strict";
exports.__esModule = true;
var Baz = {};
(function (Baz) {
    Baz.x = "hello";
})(Baz);
Baz.x = "goodbye";
void 0;
