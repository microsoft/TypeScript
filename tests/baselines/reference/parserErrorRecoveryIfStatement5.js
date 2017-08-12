//// [parserErrorRecoveryIfStatement5.ts]
class Foo {
  f1() {
    if (a.b) {
  }
  f2() {
  }
  f3() {
  }
}

//// [parserErrorRecoveryIfStatement5.js]
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
    Foo.prototype.f1 = function () {
        if (a.b) {
        }
        f2();
        {
        }
        f3();
        {
        }
    };
    __names(Foo.prototype, ["f1"]);
    return Foo;
}());
