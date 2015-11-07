//// [structTypeOfThisInInstanceMember.ts]
// doc 2.1
// Within constructors and instance member functions, the type of this is the instance type of the sturct.

struct C {
    x = this;
    foo() {
        return this;
    }
    constructor(x: number) {
        var t = this;
        t.x;
        t.z; // error, z doesn't exist.
        var r = t.foo();
    }
}

var c: C;
// all ok
var r = c.x;
var ra = c.x.x.x;
var r3 = c.foo();
var rs = [r, r3];

rs.forEach(x => {
    x.foo;
    x.x;
});

//// [structTypeOfThisInInstanceMember.js]
// doc 2.1
// Within constructors and instance member functions, the type of this is the instance type of the sturct.
var C = (function () {
    var _C = new TypedObject.StructType({
        x: TypedObject.Object,
    });
    function _ctor(x) {
        var t = this;
        t.x;
        t.z; // error, z doesn't exist.
        var r = t.foo();
    }
    function C(x) {
        var obj = new _C();
        _ctor.call(obj ,);
        return obj;
    }
    C._TO = _C;
    _C.prototype.foo = function () {
        return this;
    };
    return C;
})();
var c;
// all ok
var r = c.x;
var ra = c.x.x.x;
var r3 = c.foo();
var rs = [r, r3];
rs.forEach(function (x) {
    x.foo;
    x.x;
});
