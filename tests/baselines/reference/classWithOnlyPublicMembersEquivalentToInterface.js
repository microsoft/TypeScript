//// [classWithOnlyPublicMembersEquivalentToInterface.ts]
// no errors expected

class C {
    public x: string;
    public y(a: number): number { return null; }
    public get z() { return 1; }
    public set z(v) { }
    [x: string]: Object;
    [x: number]: Object;
    0: number;
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

//// [classWithOnlyPublicMembersEquivalentToInterface.js]
// no errors expected
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.y = function (a) { return null; };
    Object.defineProperty(C.prototype, "z", {
        get: function () { return 1; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
var c;
var i;
c = i;
i = c;
