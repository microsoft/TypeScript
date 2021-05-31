//// [classStaticPropertyTypeGuard.ts]
// Repro from #8923

class A {
    private static _a: string | undefined;

    public get a(): string {
        if (A._a) {
            return A._a; // is possibly null or undefined.
        }
        return A._a = 'helloworld';
    }
}

//// [classStaticPropertyTypeGuard.js]
// Repro from #8923
var A = /** @class */ (function () {
    function A() {
    }
    Object.defineProperty(A.prototype, "a", {
        get: function () {
            if (A._a) {
                return A._a; // is possibly null or undefined.
            }
            return A._a = 'helloworld';
        },
        enumerable: false,
        configurable: true
    });
    return A;
}());
