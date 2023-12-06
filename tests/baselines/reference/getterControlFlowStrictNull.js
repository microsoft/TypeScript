//// [tests/cases/compiler/getterControlFlowStrictNull.ts] ////

//// [getterControlFlowStrictNull.ts]
class A {
   a(): string | null {
        if (Math.random() > 0.5) {
            return '';
        }

        // it does error here as expected
    }
}
class B {
    get a(): string | null {
        if (Math.random() > 0.5) {
            return '';
        }

        // it should error here because it returns undefined
    }
}
class C {
    get a() {
        if (Math.random() > 0.5) {
            return 0;
        }

        // it should error here because it returns undefined
    }

    set a(value: number) {
    }
}

//// [getterControlFlowStrictNull.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.a = function () {
        if (Math.random() > 0.5) {
            return '';
        }
        // it does error here as expected
    };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    Object.defineProperty(B.prototype, "a", {
        get: function () {
            if (Math.random() > 0.5) {
                return '';
            }
            // it should error here because it returns undefined
        },
        enumerable: false,
        configurable: true
    });
    return B;
}());
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "a", {
        get: function () {
            if (Math.random() > 0.5) {
                return 0;
            }
            // it should error here because it returns undefined
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
