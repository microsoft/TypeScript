//// [tests/cases/conformance/interfaces/interfacesExtendingClasses/interfaceExtendingClass2.ts] ////

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
    Foo.prototype.y = function () { };
    Object.defineProperty(Foo.prototype, "Z", {
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
