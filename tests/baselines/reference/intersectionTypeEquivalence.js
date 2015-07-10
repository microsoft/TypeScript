//// [intersectionTypeEquivalence.ts]
interface A { a: string }
interface B { b: string }
interface C { c: string }

// A & B is equivalent to B & A.
var y: A & B;
var y : B & A;

// AB & C is equivalent to A & BC, where AB is A & B and BC is B & C.
var z : A & B & C;
var z : (A & B) & C;
var z : A & (B & C);
var ab : A & B;
var bc : B & C;
var z1: typeof ab & C;
var z1: A & typeof bc;


//// [intersectionTypeEquivalence.js]
// A & B is equivalent to B & A.
var y;
var y;
// AB & C is equivalent to A & BC, where AB is A & B and BC is B & C.
var z;
var z;
var z;
var ab;
var bc;
var z1;
var z1;
