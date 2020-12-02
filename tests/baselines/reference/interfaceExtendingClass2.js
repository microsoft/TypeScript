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
    var proto_1 = Foo.prototype;
    proto_1.y = function () { };
    Object.defineProperty(proto_1, "Z", {
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
