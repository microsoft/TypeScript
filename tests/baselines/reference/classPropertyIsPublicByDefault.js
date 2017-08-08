//// [classPropertyIsPublicByDefault.ts]
class C {
    x: string;
    get y() { return null; }
    set y(x) { }
    foo() { }

    static a: string;
    static get b() { return null; }
    static set b(x) { }
    static foo() { }
}

var c: C;
c.x;
c.y;
c.y = 1;
c.foo();

C.a;
C.b();
C.b = 1;
C.foo();

//// [classPropertyIsPublicByDefault.js]
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
c.x;
c.y;
c.y = 1;
c.foo();
C.a;
C.b();
C.b = 1;
C.foo();
