//// [interfaceExtendingClass.ts]
class Foo {
    x: string;
    y() { }
    get Z() {
        return 1;
    }
    [x: string]: Object;
}

interface I extends Foo {
}

var i: I;
var r1 = i.x;
var r2 = i.y();
var r3 = i.Z;

var f: Foo = i;
i = f;

//// [interfaceExtendingClass.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    var Foo_prototype = Foo.prototype;
    Foo_prototype.y = function () { };
    Object.defineProperty(Foo_prototype, "Z", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    return Foo;
}());
var i;
var r1 = i.x;
var r2 = i.y();
var r3 = i.Z;
var f = i;
i = f;
