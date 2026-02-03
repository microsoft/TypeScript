//// [tests/cases/conformance/es6/destructuring/destructuringArrayBindingPatternAndAssignment2.ts] ////

//// [destructuringArrayBindingPatternAndAssignment2.ts]
// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is the type Any, or
var [[a0], [[a1]]] = []         // Error
var [[a2], [[a3]]] = undefined  // Error

// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is a tuple- like type (section 3.3.3) with a property named N of a type that is assignable to the target given in E,
//        where N is the numeric index of E in the array assignment pattern, or
var [b0, b1, b2]: [number, boolean, string] = [1, 2, "string"];  // Error
interface J extends Array<Number> {
    2: number;
}

function bar(): J {
    return <[number, number, number]>[1, 2, 3];
}
var [b3 = "string", b4, b5] = bar();  // Error

// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is not a tuple- like type and the numeric index signature type of S is assignable to the target given in E.
var temp = [1, 2, 3]
var [c0, c1]: [number, number] = [...temp];  // Error
var [c2, c3]: [string, string] = [...temp];  // Error

interface F {
    [idx: number]: boolean
}

function foo(idx: number): F {
    return {
        2: true
    }
}
var [c4, c5, c6] = foo(1);  // Error

//// [destructuringArrayBindingPatternAndAssignment2.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is the type Any, or
var _a = [], a0 = _a[0][0], a1 = _a[1][0][0]; // Error
var a2 = undefined[0][0], a3 = undefined[1][0][0]; // Error
// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is a tuple- like type (section 3.3.3) with a property named N of a type that is assignable to the target given in E,
//        where N is the numeric index of E in the array assignment pattern, or
var _b = [1, 2, "string"], b0 = _b[0], b1 = _b[1], b2 = _b[2]; // Error
function bar() {
    return [1, 2, 3];
}
var _c = bar(), _d = _c[0], b3 = _d === void 0 ? "string" : _d, b4 = _c[1], b5 = _c[2]; // Error
// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is not a tuple- like type and the numeric index signature type of S is assignable to the target given in E.
var temp = [1, 2, 3];
var _e = __spreadArray([], temp, true), c0 = _e[0], c1 = _e[1]; // Error
var _f = __spreadArray([], temp, true), c2 = _f[0], c3 = _f[1]; // Error
function foo(idx) {
    return {
        2: true
    };
}
var _g = foo(1), c4 = _g[0], c5 = _g[1], c6 = _g[2]; // Error
