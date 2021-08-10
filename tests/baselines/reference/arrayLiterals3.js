//// [arrayLiterals3.ts]
// Each element expression in a non-empty array literal is processed as follows:
//    - If the array literal contains no spread elements, and if the array literal is contextually typed (section 4.19)
//      by a type T and T has a property with the numeric name N, where N is the index of the element expression in the array literal,
//      the element expression is contextually typed by the type of that property.

// The resulting type an array literal expression is determined as follows:
//     - If the array literal contains no spread elements and is contextually typed by a tuple-like type,
//       the resulting type is a tuple type constructed from the types of the element expressions.

var a0: [any, any, any] = [];                             // Error
var a1: [boolean, string, number] = ["string", 1, true];  // Error

// The resulting type an array literal expression is determined as follows:
//     - If the array literal contains no spread elements and is an array assignment pattern in a destructuring assignment (section 4.17.1),
//       the resulting type is a tuple type constructed from the types of the element expressions.

var [b1, b2]: [number, number] = [1, 2, "string", true];

// The resulting type an array literal expression is determined as follows:
//      - the resulting type is an array type with an element type that is the union of the types of the
//        non - spread element expressions and the numeric index signature types of the spread element expressions
var temp = ["s", "t", "r"];
var temp1 = [1, 2, 3];
var temp2: [number[], string[]] = [[1, 2, 3], ["hello", "string"]];

interface tup {
    0: number[]|string[];
    1: number[]|string[];
}
interface myArray extends Array<Number> { }
interface myArray2 extends Array<Number|String> { }
var c0: tup = [...temp2];                         // Error
var c1: [number, number, number] = [...temp1];    // Error cannot assign number[] to [number, number, number]
var c2: myArray = [...temp1, ...temp];            // Error cannot assign (number|string)[] to number[]


//// [arrayLiterals3.js]
// Each element expression in a non-empty array literal is processed as follows:
//    - If the array literal contains no spread elements, and if the array literal is contextually typed (section 4.19)
//      by a type T and T has a property with the numeric name N, where N is the index of the element expression in the array literal,
//      the element expression is contextually typed by the type of that property.
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// The resulting type an array literal expression is determined as follows:
//     - If the array literal contains no spread elements and is contextually typed by a tuple-like type,
//       the resulting type is a tuple type constructed from the types of the element expressions.
var a0 = []; // Error
var a1 = ["string", 1, true]; // Error
// The resulting type an array literal expression is determined as follows:
//     - If the array literal contains no spread elements and is an array assignment pattern in a destructuring assignment (section 4.17.1),
//       the resulting type is a tuple type constructed from the types of the element expressions.
var _a = [1, 2, "string", true], b1 = _a[0], b2 = _a[1];
// The resulting type an array literal expression is determined as follows:
//      - the resulting type is an array type with an element type that is the union of the types of the
//        non - spread element expressions and the numeric index signature types of the spread element expressions
var temp = ["s", "t", "r"];
var temp1 = [1, 2, 3];
var temp2 = [[1, 2, 3], ["hello", "string"]];
var c0 = __spreadArray([], temp2, true); // Error
var c1 = __spreadArray([], temp1, true); // Error cannot assign number[] to [number, number, number]
var c2 = __spreadArray(__spreadArray([], temp1, true), temp, true); // Error cannot assign (number|string)[] to number[]
