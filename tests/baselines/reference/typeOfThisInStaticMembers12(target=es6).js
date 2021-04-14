//// [typeOfThisInStaticMembers12.ts]
class C {
    static readonly c: "foo" = "foo"
    static bar =  class Inner {
        static [this.c] = 123;
        [this.c] = 123;
    }
}


//// [typeOfThisInStaticMembers12.js]
var _a, _b, _c;
class C {
}
C.c = "foo";
C.bar = (_c = class Inner {
        constructor() {
            this[_b] = 123;
        }
    },
    _a = this.c,
    _b = this.c,
    _c[_a] = 123,
    _c);
