//// [classWithOnlyPublicMembersEquivalentToInterface2.ts]
// no errors expected

class C {
    public x: string;
    public y(a: number): number { return null; }
    public get z() { return 1; }
    public set z(v) { }
    [x: string]: Object;
    [x: number]: Object;
    0: number;

    public static foo: string; // doesn't effect equivalence
}

interface I {
    x: string;
    y(b: number): number;
    z: number;
    [x: string]: Object;
    [x: number]: Object;
    0: number;
}

var c: C;
var i: I;
c = i;
i = c;

//// [classWithOnlyPublicMembersEquivalentToInterface2.js]
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
    function C() {
    }
    C.prototype.y = function (a) { return null; };
    Object.defineProperty(C.prototype, "z", {
        get: function () { return 1; },
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    __names(C.prototype, ["y"]);
    return C;
}());
var c;
var i;
c = i;
i = c;
