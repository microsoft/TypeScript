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

//// [getterControlFlowStrictNull.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.a = function () {
        if (Math.random() > 0.5) {
            return '';
        }
        // it does error here as expected
    };
    return A;
}());
var B = (function () {
    function B() {
    }
    var proto_2 = B.prototype;
    Object.defineProperty(proto_2, "a", {
        get: function () {
            if (Math.random() > 0.5) {
                return '';
            }
            // it should error here because it returns undefined
        },
        enumerable: true,
        configurable: true
    });
    return B;
}());
