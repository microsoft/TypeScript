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
