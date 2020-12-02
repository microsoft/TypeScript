//// [interfaceExtendingClass2.ts]
class Foo {
    x: string;
    y() { }
    get Z() {
        return 1;
    }
    [x: string]: Object;
}

interface I2 extends Foo { // error
    a: {
        toString: () => {
            return 1;
        };
    }

//// [interfaceExtendingClass2.js]
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
return 1;
;
