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
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is the type Any, or
var _a = [], _b = __read(_a[0], 1), a0 = _b[0], _c = __read(_a[1], 1), _d = __read(_c[0], 1), a1 = _d[0]; // Error
var _e = __read(undefined, 2), _f = __read(_e[0], 1), a2 = _f[0], _g = __read(_e[1], 1), _h = __read(_g[0], 1), a3 = _h[0]; // Error
// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is a tuple- like type (section 3.3.3) with a property named N of a type that is assignable to the target given in E,
//        where N is the numeric index of E in the array assignment pattern, or
var _j = [1, 2, "string"], b0 = _j[0], b1 = _j[1], b2 = _j[2]; // Error
function bar() {
    return [1, 2, 3];
}
var _k = __read(bar(), 3), _l = _k[0], b3 = _l === void 0 ? "string" : _l, b4 = _k[1], b5 = _k[2]; // Error
// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is not a tuple- like type and the numeric index signature type of S is assignable to the target given in E.
var temp = [1, 2, 3];
var _m = __read(__spread(temp), 2), c0 = _m[0], c1 = _m[1]; // Error
var _o = __read(__spread(temp), 2), c2 = _o[0], c3 = _o[1]; // Error
function foo(idx) {
    return {
        2: true
    };
}
var _p = __read(foo(1), 3), c4 = _p[0], c5 = _p[1], c6 = _p[2]; // Error
