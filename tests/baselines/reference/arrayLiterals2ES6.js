//// [tests/cases/conformance/expressions/arrayLiterals/arrayLiterals2ES6.ts] ////

//// [arrayLiterals2ES6.ts]
// ElementList:  ( Modified )
//      Elisionopt   AssignmentExpression
//      Elisionopt   SpreadElement
//      ElementList, Elisionopt   AssignmentExpression
//      ElementList, Elisionopt   SpreadElement

// SpreadElement:
//      ...   AssignmentExpression

var a0 = [, , 2, 3, 4]
var a1 = ["hello", "world"]
var a2 = [, , , ...a0, "hello"];
var a3 = [, , ...a0]
var a4 = [() => 1, ];
var a5 = [...a0, , ]

// Each element expression in a non-empty array literal is processed as follows:
//    - If the array literal contains no spread elements, and if the array literal is contextually typed (section 4.19)
//      by a type T and T has a property with the numeric name N, where N is the index of the element expression in the array literal,
//      the element expression is contextually typed by the type of that property.

// The resulting type an array literal expression is determined as follows:
//     - If the array literal contains no spread elements and is contextually typed by a tuple-like type,
//       the resulting type is a tuple type constructed from the types of the element expressions.

var b0: [any, any, any] = [undefined, null, undefined];
var b1: [number[], string[]] = [[1, 2, 3], ["hello", "string"]];

// The resulting type an array literal expression is determined as follows:
//     - If the array literal contains no spread elements and is an array assignment pattern in a destructuring assignment (section 4.17.1),
//       the resulting type is a tuple type constructed from the types of the element expressions.

var [c0, c1] = [1, 2];        // tuple type [number, number]
var [c2, c3] = [1, 2, true];  // tuple type [number, number, boolean]

// The resulting type an array literal expression is determined as follows:
//      - the resulting type is an array type with an element type that is the union of the types of the
//        non - spread element expressions and the numeric index signature types of the spread element expressions
var temp = ["s", "t", "r"];
var temp1 = [1, 2, 3];
var temp2: [number[], string[]] = [[1, 2, 3], ["hello", "string"]];

interface myArray extends Array<Number> { }
interface myArray2 extends Array<Number|String> { }
var d0 = [1, true, ...temp, ];  // has type (string|number|boolean)[]
var d1 = [...temp];            // has type string[]
var d2: number[] = [...temp1];
var d3: myArray = [...temp1];
var d4: myArray2 = [...temp, ...temp1];
var d5 = [...a2];
var d6 = [...a3];
var d7 = [...a4];
var d8: number[][] = [[...temp1]]
var d9 = [[...temp1], ...["hello"]];

//// [arrayLiterals2ES6.js]
// ElementList:  ( Modified )
//      Elisionopt   AssignmentExpression
//      Elisionopt   SpreadElement
//      ElementList, Elisionopt   AssignmentExpression
//      ElementList, Elisionopt   SpreadElement
// SpreadElement:
//      ...   AssignmentExpression
var a0 = [, , 2, 3, 4];
var a1 = ["hello", "world"];
var a2 = [, , , ...a0, "hello"];
var a3 = [, , ...a0];
var a4 = [() => 1,];
var a5 = [...a0, ,];
// Each element expression in a non-empty array literal is processed as follows:
//    - If the array literal contains no spread elements, and if the array literal is contextually typed (section 4.19)
//      by a type T and T has a property with the numeric name N, where N is the index of the element expression in the array literal,
//      the element expression is contextually typed by the type of that property.
// The resulting type an array literal expression is determined as follows:
//     - If the array literal contains no spread elements and is contextually typed by a tuple-like type,
//       the resulting type is a tuple type constructed from the types of the element expressions.
var b0 = [undefined, null, undefined];
var b1 = [[1, 2, 3], ["hello", "string"]];
// The resulting type an array literal expression is determined as follows:
//     - If the array literal contains no spread elements and is an array assignment pattern in a destructuring assignment (section 4.17.1),
//       the resulting type is a tuple type constructed from the types of the element expressions.
var [c0, c1] = [1, 2]; // tuple type [number, number]
var [c2, c3] = [1, 2, true]; // tuple type [number, number, boolean]
// The resulting type an array literal expression is determined as follows:
//      - the resulting type is an array type with an element type that is the union of the types of the
//        non - spread element expressions and the numeric index signature types of the spread element expressions
var temp = ["s", "t", "r"];
var temp1 = [1, 2, 3];
var temp2 = [[1, 2, 3], ["hello", "string"]];
var d0 = [1, true, ...temp,]; // has type (string|number|boolean)[]
var d1 = [...temp]; // has type string[]
var d2 = [...temp1];
var d3 = [...temp1];
var d4 = [...temp, ...temp1];
var d5 = [...a2];
var d6 = [...a3];
var d7 = [...a4];
var d8 = [[...temp1]];
var d9 = [[...temp1], ...["hello"]];
