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
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    Object.defineProperty(proto_1, "a", {
        get: function () {
            if (A._a) {
                return A._a; // is possibly null or undefined.
            }
            return A._a = 'helloworld';
        },
        enumerable: true,
        configurable: true
    });
    return A;
}());
