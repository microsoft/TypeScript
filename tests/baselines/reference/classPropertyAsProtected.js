//// [classPropertyAsProtected.ts]
class C {
    protected x: string;
    protected get y() { return null; }
    protected set y(x) { }
    protected foo() { }

    protected static a: string;
    protected static get b() { return null; }
    protected static set b(x) { }
    protected static foo() { }
}

var c: C;
// all errors
c.x;
c.y;
c.y = 1;
c.foo();

C.a;
C.b();
C.b = 1;
C.foo();

//// [classPropertyAsProtected.js]
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
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "y", {
        get: function () { return null; },
        set: function (x) { },
        enumerable: true,
        configurable: true
    });
    C.prototype.foo = function () { };
    Object.defineProperty(C, "b", {
        get: function () { return null; },
        set: function (x) { },
        enumerable: true,
        configurable: true
    });
    C.foo = function () { };
    __names(C.prototype, ["foo"]);
    return C;
}());
var c;
// all errors
c.x;
c.y;
c.y = 1;
c.foo();
C.a;
C.b();
C.b = 1;
C.foo();
