//// [instantiatedBaseTypeConstraints.ts]
interface Foo<T extends Foo<T, C>, C> {
  foo(bar: C): void;
}

class Bar implements Foo<Bar, string> {
  foo(bar: string): void {
  }
}

 


//// [instantiatedBaseTypeConstraints.js]
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
var Bar = (function () {
    function Bar() {
    }
    Bar.prototype.foo = function (bar) {
    };
    __names(Bar.prototype, ["foo"]);
    return Bar;
}());
