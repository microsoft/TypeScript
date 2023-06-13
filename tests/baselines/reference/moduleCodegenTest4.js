//// [tests/cases/compiler/moduleCodegenTest4.ts] ////

//// [moduleCodegenTest4.ts]
export module Baz { export var x = "hello"; }

Baz.x = "goodbye";
void 0;

//// [moduleCodegenTest4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Baz = void 0;
var Baz;
(function (Baz) {
    Baz.x = "hello";
})(Baz || (exports.Baz = Baz = {}));
Baz.x = "goodbye";
void 0;
