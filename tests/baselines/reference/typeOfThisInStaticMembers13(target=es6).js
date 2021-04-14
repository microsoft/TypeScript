//// [typeOfThisInStaticMembers13.ts]
class C {
    static readonly c: "foo" = "foo"
    static bar =  class Inner {
        static [this.c] = 123;
        [this.c] = 123;
    }
}


//// [typeOfThisInStaticMembers13.js]
var _a, _b, _c;
class C {
}
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
    value: (_c = class Inner {
            constructor() {
                Object.defineProperty(this, _b, {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 123
                });
            }
        },
        _a = C.c,
        _b = C.c,
        Object.defineProperty(_c, _a, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 123
        }),
        _c)
});
