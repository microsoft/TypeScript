//// [typeOfThisInStaticMembers13.ts]
class C {
    static readonly c: "foo" = "foo"
    static bar =  class Inner {
        static [this.c] = 123;
        [this.c] = 123;
    }
}


//// [typeOfThisInStaticMembers13.js]
var _a, _b, _c, _d;
class C {
}
_a = C;
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
    value: (_b = class Inner {
            constructor() {
                Object.defineProperty(this, _d, {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 123
                });
            }
        },
        _c = _a.c,
        _d = _a.c,
        Object.defineProperty(_b, _c, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 123
        }),
        _b)
});
