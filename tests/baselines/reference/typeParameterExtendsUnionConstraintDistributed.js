//// [typeParameterExtendsUnionConstraintDistributed.ts]
type A = 1 | 2;
function f<T extends A>(a: T): A & T { return a; } // Error: Type '1' is not assignable to type '2'.

type B = 2 | 3;
function f2<T extends A, U extends B>(ab: T & U): (A | B) & T & U { return ab; }


//// [typeParameterExtendsUnionConstraintDistributed.js]
function f(a) { return a; } // Error: Type '1' is not assignable to type '2'.
function f2(ab) { return ab; }
