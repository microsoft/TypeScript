//// [asOperatorAmbiguity.ts]
interface A<T> { x: T; }
interface B { m: string; }

// Make sure this is a type assertion to an array type, and not nested comparison operators.
var x: any;
var y = x as A<B>[];
var z = y[0].m; // z should be string



//// [asOperatorAmbiguity.js]
// Make sure this is a type assertion to an array type, and not nested comparison operators.
var x;
var y = x;
var z = y[0].m; // z should be string
