//// [typeOfThisInInstanceMember.ts]
class C {
    x = this;
    foo() {
        return this;
    }
    constructor(x: number) {
        var t = this;
        t.x;
        t.y;
        t.z;
        var r = t.foo();
    }

    get y() {
        return this;
    }
}

var c: C;
// all ok
var r = c.x;
var ra = c.x.x.x;
var r2 = c.y;
var r3 = c.foo();
var rs = [r, r2, r3];

rs.forEach(x => {
    x.foo;
    x.x;
    x.y;
});

//// [typeOfThisInInstanceMember.js]
var C = /** @class */ (function () {
    function C(x) {
        this.x = this;
        var t = this;
        t.x;
        t.y;
        t.z;
        var r = t.foo();
    }
    C.prototype.foo = function () {
        return this;
    };
    Object.defineProperty(C.prototype, "y", {
        get: function () {
            return this;
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
var c;
// all ok
var r = c.x;
var ra = c.x.x.x;
var r2 = c.y;
var r3 = c.foo();
var rs = [r, r2, r3];
rs.forEach(function (x) {
    x.foo;
    x.x;
    x.y;
});
