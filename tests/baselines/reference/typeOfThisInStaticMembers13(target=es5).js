//// [typeOfThisInStaticMembers13.ts]
class C {
    static readonly c: "foo" = "foo"
    static bar =  class Inner {
        static [this.c] = 123;
        [this.c] = 123;
    }
}


//// [typeOfThisInStaticMembers13.js]
var C = /** @class */ (function () {
    function C() {
    }
    var _a, _b, _c;
    Object.defineProperty(C, "c", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "foo"
    });
    Object.defineProperty(C, "bar", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: (_c = /** @class */ (function () {
                function Inner() {
                    Object.defineProperty(this, _b, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 123
                    });
                }
                return Inner;
            }()),
            _a = this.c,
            _b = this.c,
            Object.defineProperty(_c, _a, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 123
            }),
            _c)
    });
    return C;
}());
