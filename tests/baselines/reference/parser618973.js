//// [tests/cases/conformance/parser/ecmascript5/RegressionTests/parser618973.ts] ////

//// [parser618973.ts]
export export class Foo {
  public Bar() {
  }
}

//// [parser618973.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.Bar = function () {
    };
    return Foo;
}());
exports.Foo = Foo;
