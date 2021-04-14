//// [typeOfThisInStaticMembers12.ts]
class C {
    static readonly c: "foo" = "foo"
    static bar =  class Inner {
        static [this.c] = 123;
        [this.c] = 123;
    }
}


//// [typeOfThisInStaticMembers12.js]
var C = /** @class */ (function () {
    function C() {
    }
    var _a, _b, _c;
    C.c = "foo";
    C.bar = (_c = /** @class */ (function () {
            function Inner() {
                this[_b] = 123;
            }
            return Inner;
        }()),
        _a = this.c,
        _b = this.c,
        _c[_a] = 123,
        _c);
    return C;
}());
