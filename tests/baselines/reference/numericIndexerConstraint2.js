//// [numericIndexerConstraint2.ts]
class Foo { foo() { } }
var x: { [index: string]: Foo; };
var a: { one: number; };
x = a;

//// [numericIndexerConstraint2.js]
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
    Foo.prototype.foo = function () { };
    __names(Foo.prototype, ["foo"]);
    return Foo;
}());
var x;
var a;
x = a;
