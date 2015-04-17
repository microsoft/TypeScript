//// [destructuringArrayBindingPatternAndAssignment1ES5.ts]
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



//// [destructuringArrayBindingPatternAndAssignment1ES5.js]
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
var a0 = undefined[0], a1 = undefined[1];
var _a = undefined[0], a2 = _a === void 0 ? false : _a, _b = undefined[1], a3 = _b === void 0 ? 1 : _b;
// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is a tuple- like type (section 3.3.3) with a property named N of a type that is assignable to the target given in E,
//        where N is the numeric index of E in the array assignment pattern, or
var _c = [2, 3, 4], b0 = _c[0], b1 = _c[1], b2 = _c[2];
var _d = [1, 2, "string"], b3 = _d[0], b4 = _d[1], b5 = _d[2];
function foo() {
    return [1, 2, 3];
}
var _e = foo(), b6 = _e[0], b7 = _e[1];
var _f = foo(), b8 = _f.slice(0);
//      S is not a tuple- like type and the numeric index signature type of S is assignable to the target given in E.
var temp = [1, 2, 3];
var _g = temp, c0 = _g[0], c1 = _g[1];
var c2 = ([])[0];
var _h = [[[]], [[[[]]]]], c3 = _h[0][0][0], c4 = _h[1][0][0][0][0];
var _j = [[1], true], c5 = _j[0][0], c6 = _j[1];
var _k = [1, 2, 3], c7 = _k[1];
var _l = [1, 2, 3, 4], c8 = _l[3];
var _m = [1, 2, 3, 4], c9 = _m[3];
var _o = [1, 2, 3, 4, "hello"], c10 = _o.slice(3);
var _p = [1, 2, "string"], c11 = _p[0], c12 = _p[1], c13 = _p.slice(2);
var _q = [1, 2, "string"], c14 = _q[0], c15 = _q[1], c16 = _q[2];
