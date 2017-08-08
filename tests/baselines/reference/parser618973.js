//// [parser618973.ts]
export export class Foo {
  public Bar() {
  }
}

//// [parser618973.js]
"use strict";
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
exports.__esModule = true;
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.Bar = function () {
    };
    __names(Foo.prototype, ["Bar"]);
    return Foo;
}());
exports.Foo = Foo;
