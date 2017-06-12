//// [parser618973.ts]
export export class Foo {
  public Bar() {
  }
}

//// [parser618973.js]
"use strict";
exports.__esModule = true;
var Foo = (function () {
    function Foo() {
    }
    var proto_1 = Foo.prototype;
    proto_1.Bar = function () {
    };
    return Foo;
}());
exports.Foo = Foo;
