//// [parser618973.ts]
export export class Foo {
  public Bar() {
  }
}

//// [parser618973.js]
"use strict";
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.Bar = function () {
    };
    return Foo;
})();
exports.Foo = Foo;
