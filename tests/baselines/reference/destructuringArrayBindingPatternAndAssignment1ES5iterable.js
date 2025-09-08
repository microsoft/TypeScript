//// [tests/cases/conformance/es6/destructuring/destructuringArrayBindingPatternAndAssignment1ES5iterable.ts] ////

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
// In a destructuring assignment expression, the type of the expression on the right must be assignable to the assignment target on the left.
// An expression of type S is considered assignable to an assignment target V if one of the following is true
// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is the type Any, or
var [a0, a1] = undefined;
var [a2 = false, a3 = 1] = undefined;
// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is a tuple- like type (section 3.3.3) with a property named N of a type that is assignable to the target given in E,
//        where N is the numeric index of E in the array assignment pattern, or
var [b0, b1, b2] = [2, 3, 4];
var [b3, b4, b5] = [1, 2, "string"];
function foo() {
    return [1, 2, 3];
}
var [b6, b7] = foo();
var [...b8] = foo();
//      S is not a tuple- like type and the numeric index signature type of S is assignable to the target given in E.
var temp = [1, 2, 3];
var [c0, c1] = [...temp];
var [c2] = [];
var [[[c3]], [[[[c4]]]]] = [[[]], [[[[]]]]];
var [[c5], c6] = [[1], true];
var [, c7] = [1, 2, 3];
var [, , , c8] = [1, 2, 3, 4];
var [, , , c9] = [1, 2, 3, 4];
var [, , , ...c10] = [1, 2, 3, 4, "hello"];
var [c11, c12, ...c13] = [1, 2, "string"];
var [c14, c15, c16] = [1, 2, "string"];
