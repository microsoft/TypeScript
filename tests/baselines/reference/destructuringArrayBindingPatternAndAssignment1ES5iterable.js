//// [destructuringArrayBindingPatternAndAssignment1ES5iterable.ts]
/* AssignmentPattern:
 *      ObjectAssignmentPattern
 *      ArrayAssignmentPattern
 * ArrayAssignmentPattern:
 *      [Elision<opt>   AssignmentRestElementopt   ]
 *      [AssignmentElementList]
 *      [AssignmentElementList, Elision<opt>   AssignmentRestElementopt   ]
 * AssignmentElementList:
 *      Elision<opt>   AssignmentElement
 *      AssignmentElementList, Elisionopt   AssignmentElement
 * AssignmentElement:
 *      LeftHandSideExpression   Initialiseropt
 *      AssignmentPattern   Initialiseropt
 * AssignmentRestElement:
 *      ...   LeftHandSideExpression
 */

// In a destructuring assignment expression, the type of the expression on the right must be assignable to the assignment target on the left.
// An expression of type S is considered assignable to an assignment target V if one of the following is true

// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is the type Any, or

var [a0, a1]: any = undefined;
var [a2 = false, a3 = 1]: any = undefined;

// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is a tuple- like type (section 3.3.3) with a property named N of a type that is assignable to the target given in E,
//        where N is the numeric index of E in the array assignment pattern, or
var [b0, b1, b2] = [2, 3, 4];
var [b3, b4, b5]: [number, number, string] = [1, 2, "string"];

function foo() {
    return [1, 2, 3];
}

var [b6, b7] = foo();
var [...b8] = foo();

//      S is not a tuple- like type and the numeric index signature type of S is assignable to the target given in E.
var temp = [1,2,3]
var [c0, c1] = [...temp];
var [c2] = [];
var [[[c3]], [[[[c4]]]]] = [[[]], [[[[]]]]]
var [[c5], c6]: [[string|number], boolean] = [[1], true];
var [, c7] = [1, 2, 3];
var [,,, c8] = [1, 2, 3, 4];
var [,,, c9] = [1, 2, 3, 4];
var [,,,...c10] = [1, 2, 3, 4, "hello"];
var [c11, c12, ...c13] = [1, 2, "string"];
var [c14, c15, c16] = [1, 2, "string"];



//// [destructuringArrayBindingPatternAndAssignment1ES5iterable.js]
/* AssignmentPattern:
 *      ObjectAssignmentPattern
 *      ArrayAssignmentPattern
 * ArrayAssignmentPattern:
 *      [Elision<opt>   AssignmentRestElementopt   ]
 *      [AssignmentElementList]
 *      [AssignmentElementList, Elision<opt>   AssignmentRestElementopt   ]
 * AssignmentElementList:
 *      Elision<opt>   AssignmentElement
 *      AssignmentElementList, Elisionopt   AssignmentElement
 * AssignmentElement:
 *      LeftHandSideExpression   Initialiseropt
 *      AssignmentPattern   Initialiseropt
 * AssignmentRestElement:
 *      ...   LeftHandSideExpression
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// In a destructuring assignment expression, the type of the expression on the right must be assignable to the assignment target on the left.
// An expression of type S is considered assignable to an assignment target V if one of the following is true
// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is the type Any, or
var _a = __read(undefined, 2), a0 = _a[0], a1 = _a[1];
var _b = __read(undefined, 2), _c = _b[0], a2 = _c === void 0 ? false : _c, _d = _b[1], a3 = _d === void 0 ? 1 : _d;
// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is a tuple- like type (section 3.3.3) with a property named N of a type that is assignable to the target given in E,
//        where N is the numeric index of E in the array assignment pattern, or
var _e = __read([2, 3, 4], 3), b0 = _e[0], b1 = _e[1], b2 = _e[2];
var _f = __read([1, 2, "string"], 3), b3 = _f[0], b4 = _f[1], b5 = _f[2];
function foo() {
    return [1, 2, 3];
}
var _g = __read(foo(), 2), b6 = _g[0], b7 = _g[1];
var _h = __read(foo()), b8 = _h.slice(0);
//      S is not a tuple- like type and the numeric index signature type of S is assignable to the target given in E.
var temp = [1, 2, 3];
var _j = __read(__spreadArray([], __read(temp), false), 2), c0 = _j[0], c1 = _j[1];
var _k = __read([], 1), c2 = _k[0];
var _l = __read([[[]], [[[[]]]]], 2), _m = __read(_l[0], 1), _o = __read(_m[0], 1), c3 = _o[0], _p = __read(_l[1], 1), _q = __read(_p[0], 1), _r = __read(_q[0], 1), _s = __read(_r[0], 1), c4 = _s[0];
var _t = __read([[1], true], 2), _u = __read(_t[0], 1), c5 = _u[0], c6 = _t[1];
var _v = __read([1, 2, 3], 2), c7 = _v[1];
var _w = __read([1, 2, 3, 4], 4), c8 = _w[3];
var _x = __read([1, 2, 3, 4], 4), c9 = _x[3];
var _y = __read([1, 2, 3, 4, "hello"]), c10 = _y.slice(3);
var _z = __read([1, 2, "string"]), c11 = _z[0], c12 = _z[1], c13 = _z.slice(2);
var _0 = __read([1, 2, "string"], 3), c14 = _0[0], c15 = _0[1], c16 = _0[2];
