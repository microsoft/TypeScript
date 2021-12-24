//// [typeOfThisInStaticMembers12.ts]
class C {
    static readonly c: "foo" = "foo"
    static bar =  class Inner {
        static [this.c] = 123;
        [this.c] = 123;
    }
}


//// [typeOfThisInStaticMembers12.js]
var _a, _b, _c, _d;
class C {
}
_a = C;
C.c = "foo";
C.bar = (_b = class Inner {
        constructor() {
            this[_d] = 123;
        }
    },
    _c = _a.c,
    _d = _a.c,
    _b[_c] = 123,
    _b);
