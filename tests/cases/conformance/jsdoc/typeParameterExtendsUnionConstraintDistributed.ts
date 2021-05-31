type A = 1 | 2;
function f<T extends A>(a: T): A & T { return a; } // Shouldn't error

type B = 2 | 3;
function f2<T extends A, U extends B>(ab: T & U): (A | B) & T & U { return ab; } // Also shouldn't error
