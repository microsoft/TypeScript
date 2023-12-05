//// [tests/cases/conformance/types/specifyingTypes/typeLiterals/arrayTypeOfTypeOf.ts] ////

//// [arrayTypeOfTypeOf.ts]
// array type cannot use typeof.

var x = 1;
var xs: typeof x[];  // Not an error.  This is equivalent to Array<typeof x>
var xs2: typeof Array;
var xs3: typeof Array<number>;
var xs4: typeof Array<typeof x>;

//// [arrayTypeOfTypeOf.js]
// array type cannot use typeof.
var x = 1;
var xs; // Not an error.  This is equivalent to Array<typeof x>
var xs2;
var xs3;
var xs4;
