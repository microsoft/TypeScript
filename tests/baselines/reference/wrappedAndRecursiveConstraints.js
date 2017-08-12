//// [wrappedAndRecursiveConstraints.ts]
// no errors expected

class C<T extends Date> {
    constructor(public data: T) { }
    foo<U extends T>(x: U) {
        return x;
    }
}

interface Foo extends Date {
    foo: string;
}

var y: Foo = null;
var c = new C(y);
var r = c.foo(y);

//// [wrappedAndRecursiveConstraints.js]
// no errors expected
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
var C = (function () {
    function C(data) {
        this.data = data;
    }
    C.prototype.foo = function (x) {
        return x;
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
var y = null;
var c = new C(y);
var r = c.foo(y);
