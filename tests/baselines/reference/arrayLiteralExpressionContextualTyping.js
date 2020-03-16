//// [arrayLiteralExpressionContextualTyping.ts]
// In a contextually typed array literal expression containing no spread elements, an element expression at index N is contextually typed by
//      the type of the property with the numeric name N in the contextual type, if any, or otherwise
//      the numeric index type of the contextual type, if any.
var array = [1, 2, 3];
var array1 = [true, 2, 3];  // Contextual type by the numeric index type of the contextual type
var tup: [number, number, number] = [1, 2, 3, 4];
var tup1: [number|string, number|string, number|string] = [1, 2, 3, "string"];
var tup2: [number, number, number] = [1, 2, 3, "string"];  // Error

// In a contextually typed array literal expression containing one or more spread elements,
// an element expression at index N is contextually typed by the numeric index type of the contextual type, if any.
var spr = [1, 2, 3, ...array];
var spr1 = [1, 2, 3, ...tup];
var spr2:[number, number, number] = [1, 2, 3, ...tup];  // Error


//// [arrayLiteralExpressionContextualTyping.js]
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// In a contextually typed array literal expression containing no spread elements, an element expression at index N is contextually typed by
//      the type of the property with the numeric name N in the contextual type, if any, or otherwise
//      the numeric index type of the contextual type, if any.
var array = [1, 2, 3];
var array1 = [true, 2, 3]; // Contextual type by the numeric index type of the contextual type
var tup = [1, 2, 3, 4];
var tup1 = [1, 2, 3, "string"];
var tup2 = [1, 2, 3, "string"]; // Error
// In a contextually typed array literal expression containing one or more spread elements,
// an element expression at index N is contextually typed by the numeric index type of the contextual type, if any.
var spr = __spreadArrays([1, 2, 3], array);
var spr1 = __spreadArrays([1, 2, 3], tup);
var spr2 = __spreadArrays([1, 2, 3], tup); // Error
