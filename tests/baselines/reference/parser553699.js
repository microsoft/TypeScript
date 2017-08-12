//// [parser553699.ts]
class Foo {
  constructor() { }
  public banana (x: public) { }
}

class Bar {
  constructor(c: Bar) { }
}

//// [parser553699.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.banana = function (x) { };
    __names(Foo.prototype, ["banana"]);
    return Foo;
}());
var Bar = (function () {
    function Bar(c) {
    }
    return Bar;
}());
